/* eslint-disable no-undef */
const { expect } = require('chai');
const { generateOTP, verifyOTP } = require('../src/otp');

// eslint-disable-next-line no-undef
describe('OTP verification', async () => {
  it('should return OTP & hash', async () => {
    const result = await generateOTP('01717346500');
    // expect(result.to.);
  });

  it('should verify OTP with hash', async () => {

  });
});
