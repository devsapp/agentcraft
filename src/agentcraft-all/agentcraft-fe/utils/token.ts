import crypto from 'crypto';

const ecdsa = crypto.createECDH('secp256k1');
ecdsa.generateKeys();

const publicKey = ecdsa.getPublicKey('hex');
const privateKey = ecdsa.getPrivateKey('hex');

export function genAgentCraftName(name: string): string {
    // 签名
    const sign = crypto.createSign('SHA256');
    sign.update(name);
    sign.end();
    return sign.sign(privateKey, 'hex');

}


export function verifyAgentCraftName(name: string): any {
    // 验证签名
    const verify = crypto.createVerify('SHA256');
    verify.update(name);
    verify.end();
    const isValid = verify.verify(publicKey, name, 'hex');
    return isValid ? name : null;
}
