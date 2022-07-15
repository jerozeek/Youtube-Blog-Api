export const smtpConfig = {
    pool: true,
    host: "host",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "username",
        pass: "password",
    },
}