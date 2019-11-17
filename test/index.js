/* eslint-disable no-undef */
const { expect } = require('chai');
const { generateOTP, verifyOTP } = require('../src/otp');

let hash, otp, mobileNo = '01717346500';
// eslint-disable-next-line no-undef
describe('OTP verification', async () => {
  it('should return OTP & hash', async () => {
    const result = await generateOTP(mobileNo);
    hash = result.hash;
    otp = result.otp;
    expect(result).to.have.all.keys('otp', 'hash');
  });

  it('should verify OTP with hash', async () => {
    const isVerified = await verifyOTP({
      mobileNo,
      otp,
      hash
    });
    expect(isVerified).to.be.true;

  });
});
