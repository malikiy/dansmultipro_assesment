import dotenv from 'dotenv';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const port = process.env.SERVER_PORT;
const cors = process.env.CORS || '*';
const jwtExpiryTime = process.env.JWT_TOKEN_EXPIRED;
const jwtSecret = process.env.JWT_SECRET;
const hostDansMultiPro = process.env.DANS_MULTIPRO_HOST;


export { 
    port,
    cors,
    jwtExpiryTime,
    jwtSecret,
    hostDansMultiPro
}