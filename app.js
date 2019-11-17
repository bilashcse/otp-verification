const express = require('express');

const { generateOTP, verifyOTP } = require('./src/otp');

const app = express();

const port = process.env.PORT || 3005;
app.listen(port, () => console.warn(`Server running on localhost:${port}`));

app.get('/generate', async (req, res) => {
  try {
    const result = await generateOTP(req.query.mobileNo);
    res.json({
      isError: false,
      hash: result.hash,
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      isError: true,
    });
  }
});

app.get('/verify', async (req, res) => {
  try {
    const result = await verifyOTP(req.query.mobileNo, req.query.otp, req.query.hash);
    res.json({
      isError: false,
      verified: result.verified,
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      isError: true,
    });
  }
});
