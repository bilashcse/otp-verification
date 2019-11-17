const otpGenerator = require('otp-generator');
const crypto = require('crypto');

const algorithm = 'sha256';
const generateValidNUmber = (phone) => `880${/(\d){10}$/.exec(phone)[0]}`;

const generateOTP = async (phone) => {
  const secret = 'hello123';
  const phoneNo = generateValidNUmber(phone);
  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });


  const ttl = 5 * 60 * 1000; // Expires after in Minutes, converteed to miliseconds
  const expires = Date.now() + ttl; // timestamp to 5 minutes in the future
  const data = `${phoneNo}.${otp}.${expires}`; // phone.otp.expiry_timestamp
  const d = {
    phoneNo,
    otp,
  };
  const hashBase = crypto.createHmac(algorithm, secret).update(JSON.stringify(d)).digest('hex'); // creating SHA256 hash of the data
  const hash = `${hashBase}.${expires}`; // Hash.expires, format to send to the user
  console.log(hash);
  return hash;
};

const verifyOTP = async (phone, otp) => {

};


generateOTP('01717346500');

module.exports = {
  generateOTP,
  verifyOTP,
};
