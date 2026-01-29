import { Email, Password } from '@/shared/domain/value-objects';
import { RegisterInputDto } from '../dto/register-input.dto';
import { PasswordHasher } from '../ports/password-hasher';
import { UserRepository } from '../ports/user-repository';
import { User } from '@/modules/user/domain/entity';
import { CreateUniqueId } from '../ports/create-id';

export class UserRegisterUseCase {
  private constructor(
    private userRepo: UserRepository,
    private passwordHasher: PasswordHasher,
    private createUniqueId: CreateUniqueId,
  ) {}

  async execute(input: RegisterInputDto) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const id = await this.createUniqueId.create();

    const user = User.create({
      id,
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      password: hashedPassword,
      dob: new Date(input.dob),
      gender: input.gender,
    });

    await this.userRepo.save(user);
  }
}
