export interface IStorageService {
  uploadBase64(
    base64String: string,
    folder: string,
    filename: string,
  ): Promise<string>;
}
