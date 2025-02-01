const CryptoJS = require("crypto-js");

// Secure Encryption Key (Keep this secret and store in .env)
const ENCRYPTION_KEY = "your-32-char-long-secret-key"; // Replace with a strong key

// Encrypt Data
exports.encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

// Decrypt Data
exports.decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
