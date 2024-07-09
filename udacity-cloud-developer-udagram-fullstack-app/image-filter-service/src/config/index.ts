
// should be used for test purposes only
const jwtSecretDefault = "zdWIiOiIxMeyJhbGciOiJIUzI1NiJ9.OjoxMTY.oV2Wn7k6Dl9uvrkZY9Tz_TZfo-UeBEIpcO00f3eal2EjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"

export const config = {
    dev: {
        jwtSecret: process.env.JWT_SECRET || jwtSecretDefault,
    },
};
