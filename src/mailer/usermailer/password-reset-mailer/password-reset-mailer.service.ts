import { Injectable } from '@nestjs/common';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import { SendgridService } from 'src/mailer/sendgrid.service';
import { PasswordReset } from 'src/password-reset/entities/password-reset.entity';
import MailerParams from 'src/mailer/mailer-params.helper';

@Injectable()
export class PasswordResetMailerService {
  constructor(
    private readonly sendgridService: SendgridService,
    private mailerParams: MailerParams,
  ) {}

  public async sendResetLink(pwdReset: PasswordReset) {
    const emailTemplate = fs
      .readFileSync(
        './dist/src/mailer/usermailer/password-reset-mailer/password-reset-mailer.hbs',
      )
      .toString();

    const template = hbs.compile(emailTemplate);
    const email = pwdReset.email;
    const token = pwdReset.id;

    const messageBody = template({
      email: pwdReset.email,
      url: `${this.mailerParams.mainUrl}/#/reset-password/${token}`,
    });

    const mail = {
      to: email,
      subject: 'Réinitialisation du mot de passe.',
      from: this.mailerParams.sender,
      html: messageBody,
    };

    return await this.sendgridService.send(mail);
  }
}
