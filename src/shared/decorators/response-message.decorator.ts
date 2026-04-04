import { SetMetadata } from '@nestjs/common';

// We define a key to store and retrieve our metadata
export const RESPONSE_MESSAGE = 'response_message';

// The decorator takes a single parameter: the success message
export const ResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE, message);
