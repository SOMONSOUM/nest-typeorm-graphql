import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

class EmailServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailServiceError';
  }
}

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  private readonly maxRetries = 3;
  private readonly retryDelay = 3000;
  private readonly logger = new Logger(MailService.name);

  private createTransporter(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.getOrThrow<string>('EMAIL_USER'),
        pass: this.configService.getOrThrow<string>('EMAIL_PASSWORD'),
      },
    });
  }

  private async sendEmailWithRetryLogic(
    transporter: nodemailer.Transporter,
    email: string,
    content: string,
  ): Promise<void> {
    let attempt = 0;
    while (attempt < this.maxRetries) {
      attempt++;
      try {
        await transporter.sendMail({
          to: email,
          subject: 'Notification',
          text: content,
        });
        return;
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(
            `Attempt ${attempt} failed: ${error?.message || error}`,
          );
          if (attempt >= this.maxRetries) {
            throw new EmailServiceError(
              `Failed to send email after ${this.maxRetries} attempts: ${error.message}`,
            );
          }
        }
        await this.delay(this.retryDelay);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async sendEmailWithRetry(email: string, content: string): Promise<void> {
    const transporter = this.createTransporter();

    try {
      await this.sendEmailWithRetryLogic(transporter, email, content);
      this.logger.log(`Email sent successfully to ${email}`);
    } catch (error) {
      if (error instanceof EmailServiceError) {
        this.logger.error(`Failed to send email to ${email}: ${error.message}`);
      } else {
        this.logger.error(
          `An unknown error occurred while sending email to ${email}`,
        );
      }
      throw error;
    }
  }
}
