import sendGrid from '@sendgrid/mail';
const APP_KEY = process.env.SENDGRID_API_KEY || ''
import fs from 'fs';
import path from 'path';


export class Email {
  public message: sendGrid.MailDataRequired;

  constructor() {
    this.message = {
      to: [],
      from: 'viniciustprates@gmail.com',
      subject: '',
      html: '',
    }

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

    console.log('[SERVER]: trying to send email');
    try {

      sendGrid.setApiKey(APP_KEY);
      await sendGrid.send(this.message);

      console.log('[SERVER]: Email sent to', to);

    } catch (error) {
      const err = error as any
      console.error('[SERVER]: Error when trying to send email', err.response.body);

    }
  }

  async sendEmailWithAttachment(
    list_items: { titulo: string, preco: string }[],
    user_name: string,
    to: string | string[],
    fileName: string
  ) {
    const dir = path.resolve(__dirname, fileName);
    console.log('[SERVER]: reading file from', dir)

    let attach: string;

    try {
      attach = fs.readFileSync(dir).toString("base64");
      
    } catch (error) {
      throw new Error("Error when trying to open file")
    }
    
    let listItem = '<ul>'

    list_items.forEach((item) => {
      listItem += `<li> ${item.titulo} - ${item.preco}</li>`
    })

    listItem += '</ul>'

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
      Faça download do seu ingresso em anexo!
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
    Para receber seu produto, entre em contato com algum morador da República!
    Faça download do seu ingresso em anexo!
    `

    this.message.attachments = [
      {
        content: attach,
        filename: 'ingresso.pdf',
        type: 'application/pdf',
        disposition: 'attachment',

      },
    ]

    console.log('[SERVER]: trying to send email');
    try {

      sendGrid.setApiKey(APP_KEY);
      await sendGrid.send(this.message);

      console.log('[SERVER]: Email sent to', to);
      
    } catch (error) {
      const err = error as any
      console.error('[SERVER]: Error when trying to send email', err.response.body);

    } finally {
      fs.unlinkSync(dir);
      console.log('[SERVER]: unlink file');
    }
  }

}
