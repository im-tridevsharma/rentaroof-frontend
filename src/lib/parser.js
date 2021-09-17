import CryptoJS from "crypto-js";

const parseData = (encryptStr) => {
  var key = process.env.PARSER_KEY;
  let encrypted = atob(encryptStr);
  encrypted = JSON.parse(encrypted);
  const iv = CryptoJS.enc.Base64.parse(encrypted.iv);
  const value = encrypted.value;
  key = CryptoJS.enc.Base64.parse(key);
  var decrypted = CryptoJS.AES.decrypt(value, key, {
    iv: iv,
  });
  decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};

export default parseData;
