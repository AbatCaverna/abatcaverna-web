import jwt from 'jsonwebtoken';

export default function jsonwebtoken() {
  function encode(payload: object): string {
    const privateKey = process.env.ABAT_TOKEN
    if(privateKey === undefined) throw new Error('Missing argument')
    const token = jwt.sign({
      data: payload
    }, privateKey, { expiresIn: 60 * 60 * 24 * 30 * 6}); // expira em 6 meses
    return token
  }
  function decode(token: string) {
    const privateKey = process.env.ABAT_TOKEN
    if(privateKey === undefined) throw new Error('Missing argument')
    const decoded = jwt.verify(token, privateKey);
    return decoded;
  }
  return {
    encode,
    decode
  }
}