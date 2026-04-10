import { Logger, Injectable, Global } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ILogger } from './logger.interface';

@Global()
@Injectable()
export class FileLogger extends Logger implements ILogger {
  private readonly logFile = path.join(process.cwd(), 'logs', 'app.log');

  constructor() {
    super();
    const logDir = path.dirname(this.logFile);

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private writeToFile(level: string, data: unknown) {
    const logEntry = {
      level,
      timestamp: new Date().toISOString(),
      data,
    };

    // Async write (non-blocking)
    fs.appendFile(this.logFile, JSON.stringify(logEntry) + '\n', (err) => {
      if (err) {
        super.error('Failed to write log file', err.stack);
      }
    });
  }

  log(message: unknown) {
    super.log(message);
    this.writeToFile('INFO', message);
  }

  warn(message: unknown) {
    super.warn(message);
    this.writeToFile('WARN', message);
  }

  error(message: unknown, trace?: string) {
    super.error(message, trace);
    this.writeToFile('ERROR', { message, trace });
  }

  debug(message: unknown) {
    super.debug(message);
    this.writeToFile('DEBUG', message);
  }
}
