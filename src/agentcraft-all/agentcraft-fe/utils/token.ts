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




export function generateDingTalkToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}


export function getTokenFromCookie(cookie:string) {
    let token = ''
    try {
        token = cookie.split(';').find(row => row.indexOf('token=') !== -1)?.split('=')[1]?.trim() as string;
        if(token) {
            token = `Bearer ${token}`
        }
    } catch (e) {

    }
    return token;
}


export function getTokenFromRequest(req: any) {
    const cookie = req.headers.cookie as string;
    return getTokenFromCookie(cookie);
}

