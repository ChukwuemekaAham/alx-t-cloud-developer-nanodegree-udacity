# Udagram Backend API


Note: in the config/config.ts file we see commented plaintext variables. It is better practice to store these variables as environment variables accessed by process.env.VARIABLE_NAME. 

JWT secret is a secret. This allows the server to encrypt and decrypt JWTs. If it is compromised, the person with the secret can generate valid JWTs with whatever payload they want. Each environment should have it's own secret and care should be taken to ensure it remains secret.