import { Logger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLogger extends Logger {
  private readonly logFile = path.join(process.cwd(), 'logs', 'app.log');

  private writeToFile(data: any) {
    fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
    fs.appendFileSync(this.logFile, data + '\n');
  }

  log(data: any) {
    super.log(data);
    this.writeToFile(`[LOG] ${new Date().toISOString()} - ${data}`);
  }

  warn(data: any) {
    super.warn(data);
    this.writeToFile(`[WARN] ${new Date().toISOString()} - ${data}`);
  }

  error(data: any) {
    super.error(data);
    this.writeToFile(`[ERROR] ${new Date().toISOString()} - ${data}`);
  }

  debug(data: string) {
    super.debug(data);
    this.writeToFile(`[DEBUG] ${new Date().toISOString()} - ${data}`);
  }
}
