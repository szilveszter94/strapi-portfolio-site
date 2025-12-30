module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "@strapi/provider-email-nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env.int("SMTP_PORT"),
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
      },
      settings: {
        defaultFrom: "no-reply@sbalazs.com",
        defaultReplyTo: "no-reply@sbalazs.com",
      },
    },
  },
});
