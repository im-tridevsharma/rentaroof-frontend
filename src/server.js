import axios from "axios";
import CryptoJS from "crypto-js";

const server = axios.create({
  baseURL: "http://localhost:8000/api",
});

export function __e(string) {
  const key = process.env.PARSER_KEY;
  return CryptoJS.AES.encrypt(string, key).toString();
}

export function __d(encryptedBase64, parse = false) {
  let key = process.env.PARSER_KEY;

  if (!encryptedBase64) {
    return false;
  }

  if (parse) {
    //decrypt which is ecrypted from server side
    let encrypted = atob(encryptedBase64);
    encrypted = JSON.parse(encrypted);
    const iv = CryptoJS.enc.Base64.parse(encrypted.iv);
    const value = encrypted.value;
    key = CryptoJS.enc.Base64.parse(key);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      iv: iv,
    });
    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } else {
    //decrypt which is encrypted from client side
    const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key);
    if (decrypted) {
      try {
        const str = decrypted.toString(CryptoJS.enc.Utf8);
        if (str.length > 0) {
          return str;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}

export default server;
