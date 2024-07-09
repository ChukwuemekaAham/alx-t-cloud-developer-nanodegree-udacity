export const config = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  dialect: "postgres",
  aws_region: process.env.AWS_REGION,
  aws_profile: process.env.AWS_PROFILE,
  aws_media_bucket: process.env.AWS_BUCKET,
  url: process.env.URL,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};


// export const config = {
//   "dev": {
//     "username": "",
//     "password": "",
//     "database": "",
//     "host": "",
//     "dialect": "postgres",
//     "aws_region": "us-east-2",
//     "aws_profile": "default",
//     "aws_media_bucket": "udagram-dev"
//   },
//   "jwt": {
//     "secret": " "
//   },
//   "prod": {
//     "username": "",
//     "password": "",
//     "database": "udagram_prod",
//     "host": "",
//     "dialect": "postgres"
//   }
// }
