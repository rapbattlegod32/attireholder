import { TOTP } from "totp-generator"

import dotenv from 'dotenv';
dotenv.config({ path: '../../config/.env' });

const totpkey = process.env.TOTP_KEY;

const { otp, expires } = TOTP.generate(totpkey)

console.log(`key: ${otp}`)