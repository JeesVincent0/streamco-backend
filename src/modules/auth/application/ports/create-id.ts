export abstract class CreateUniqueId {
  abstract create(): Promise<string>;
}
