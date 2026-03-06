import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_REDIRECTION_URL');

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth env variables missing');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    let intent: OAuthState['intent'];
    let role: OAuthState['role'];

    if (typeof req.query.state === 'string') {
      try {
        const decodedState = parseOAuthState(
          Buffer.from(req.query.state, 'base64').toString(),
        );

        intent = decodedState.intent;
        role = decodedState.role;
      } catch {
        throw new Error('Invalid OAuth state');
      }
    }

    const email =
      profile.emails && profile.emails.length > 0
        ? profile.emails[0].value
        : undefined;

    if (!email) {
      throw new Error('Google email missing');
    }

    return {
      email,
      avatarUrl: profile.photos?.[0]?.value,
      googleId: profile.id,
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
      displayName: profile.displayName,
      intent,
      role,
    };
  }
}

interface OAuthState {
  intent?: 'signup' | 'login';
  role?: 'USER' | 'ADVERTISER';
}

function parseOAuthState(state: string): OAuthState {
  const raw: unknown = JSON.parse(state);

  if (typeof raw !== 'object' || raw === null) {
    throw new Error('Invalid OAuth state structure');
  }

  const parsed = raw as Record<string, unknown>;

  const intent =
    parsed.intent === 'signup' || parsed.intent === 'login'
      ? parsed.intent
      : undefined;

  const role =
    parsed.role === 'USER' || parsed.role === 'ADVERTISER'
      ? parsed.role
      : undefined;

  return { intent, role };
}
