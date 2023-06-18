import jwt from 'jsonwebtoken';

export default (() => {
  return {
    verifyRefreshToken(token) {
      const result = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      if (result) return;
      throw new Error('Invalid refresh token');
    },

    verifyAccessToken(token) {
      const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (result) return;
      throw new Error('Invalid access token');
    },

    createAccessToken(id) {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACESSS_TOKEN_EXPIRATION_TIME,
      });
    },

    createRefreshToken(id) {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET);
    },
  };
})();
