import {send, setApiKey, MailDataRequired} from '@sendgrid/mail';
const APP_KEY = process.env.SENDGRID_API_KEY || ''
import fs from 'fs';


export class Email {
  public message: MailDataRequired;

  constructor() {
    this.message = {
      to: [],
      from: 'viniteixerap@hotmail.com',
      subject: '',
      html: '',
    }

    setApiKey(APP_KEY);
  }
  
  async sendEmail(
    list_items: { titulo: string, preco: string }[],
    user_name: string,
    to: string | string[]
  ) {

    let listItem = '<ul>'

    list_items.forEach((item) => {
      listItem += `<li> ${item.titulo} - ${item.preco}</li>`
    })
  
    listItem += '</ul>'

    console.log('html')
    const html = `
    <html>
    <head>
        <title>Email de compra</title>
    </head>
    <body>
      <h1>Obrigado por comprar na ABatCaverna!</h1>
      Olá ${user_name},
      <br /><br/>
      Você realizou uma compra dos seguintes produtos:
      <br /><br/>
      ${listItem}
      <br /><br/>
      Para receber seu produto, entre em contato com algum morador da República!
    </body>
    </html>
    `
  
    this.message.html = html
    this.message.subject = 'Compra efetuada em ABatCaverna'
    this.message.to = to
    this.message.text = `Obrigado por comprar na ABatCaverna!
    Olá ${user_name},
    Você realizou uma compra dos seguintes produtos
    ${listItem}
    Para receber seu produto, entre em contato com algum morador da República!`

    console.log('[SERVER]: trying to send email', this.message.html);
    try {
      await send(this.message);

      console.log('[SERVER]: Email sent to', to);

    } catch (error) {
      console.error('[SERVER]: Error when trying to send email', error);

    }
  }

  getPDFFILE() {
    fs.readFile(('Document.pdf'), (err, data) => {
      if (err) {
        // do something with the error
      }
      if (data) {
        const msg = {
          to: 'recipient@test.org',
          from: 'sender@test.org',
          subject: 'Attachment',
          html: '<p>Here’s an attachment for you!</p>',
          attachments: [
            {
              content: data.toString('base64'),
              filename: 'some-attachment.pdf',
              type: 'application/pdf',
              disposition: 'attachment',
              content_id: 'mytext',
            },
          ],
        };
      }
    });
  }

}
