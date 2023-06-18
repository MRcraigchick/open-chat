import brevo from 'sib-api-v3-sdk';

/**
 *
 * @returns - Instance of client
 */

export function instantiateClient() {
  try {
    const clientInstance = brevo.ApiClient.instance;
    const apiKeysettings = clientInstance.authentications['api-key'];
    apiKeysettings.apiKey = process.env.BREVO_SMTP_API_KEY;
    return clientInstance;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * @param { Object } config - Email configuration object, for more options go to https://developers.brevo.com/reference/sendtransacemail
 * @param { Array.<{email, name}> } config.to - REQUIRED: List of recipients
 * @param { Array.<{email, name}> } config.cc - List of carbon copy recipients
 * @param { Array.<{email, name}> } config.bcc - List of blind carbon copy recipients
 * @param {{ email, name }} config.replyTo - Email address to redirect the reply
 * @param {{ header: value }} config.headers - Email headers
 * @param {{ param: value }} config.params - Variubles for template injection
 * @param { HTML_template_string } config.htmlContent - HTML template to render email, inject param variubles with {{param}} syntax
 * @param { String } config.textContent - For unstructured text email, ignored if HTMLContent us passed
 * @returns - Success response from the sendinblue SMTP api throws error on fail
 */

export async function sendSmtpEmail(config) {
  try {
    instantiateClient();
    const apiInstance = new brevo.TransactionalEmailsApi();

    const res = await apiInstance.sendTransacEmail({
      sender: {
        name: process.env.BREVO_ACCOUNT_NAME,
        email: process.env.BREVO_ACCOUNT_EMAIL,
      },
      ...config,
    });

    console.log(
      'Email sent successfully over the Simple Mail Transfer Protocol (SMTP) via Brevo'
    );
    return res;
  } catch (err) {
    throw new Error(err);
  }
}
