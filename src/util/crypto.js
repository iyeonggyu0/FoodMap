import CryptoJS from "crypto-js";
const crypto = CryptoJS;

export const encrypt = (data) => {
  return crypto.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_CRYPTO_KEY).toString();
};

export const decrypt = (text) => {
  try {
    const bytes = crypto.AES.decrypt(text, import.meta.env.VITE_CRYPTO_KEY);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  } catch (err) {
    console.log(err);
    return;
  }
};
