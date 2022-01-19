const crypto = require("crypto");

const generateKeys = () => {
  const accessTokenSecret = crypto.randomBytes(32).toLocaleString("hex");
  const refreshTokenSecret = crypto.randomBytes(32).toLocaleString("hex");
  console.log({ accessTokenSecret, refreshTokenSecret });
};

generateKeys();
