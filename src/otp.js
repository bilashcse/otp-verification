const otpGenerator = require('otp-generator');
const crypto = require('crypto');

const hashAlgorithm = 'sha256';
const secret = 'hello@123!';

const generateValidNUmber = (phone) => `880${/(\d){10}$/.exec(phone)[0]}`;

const generateOTP = async (phone) => {
  const phoneNo = generateValidNUmber(phone);
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
  const data = {
    phoneNo,
    otp,
  };
  const hash = crypto.createHmac(hashAlgorithm, secret).update(JSON.stringify(data)).digest('hex'); // creating SHA256 hash of the data
  return { otp, hash };
};

const verifyOTP = async ({ mobileNo, otp, hash }) => {
  if (!hash) {
    throw new Error('Sorry, didn\'t get hash for this OTP');
  }
  const phoneNo = generateValidNUmber(mobileNo);
  const data = {
    phoneNo,
    otp,
  };
  const newHash = crypto.createHmac(hashAlgorithm, secret).update(JSON.stringify(data)).digest('hex');

  let isValid = false;
  if (newHash === hash) {
    isValid = true;
  }
  return isValid;
};

module.exports = {
  generateOTP,
  verifyOTP,
};
