const jwt = require("jsonwebtoken");

const generateAccessToken = (userID) =>
{
    return jwt.sign(
        {id: userID},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}

const generateRefreshToken = (userID) => {
  return jwt.sign(
    { id: userID },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };