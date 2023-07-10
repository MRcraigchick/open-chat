import jwt from 'jsonwebtoken';

export default (() => {
  return {
    verifySessionToken(token) {
      const result = jwt.verify(token, process.env.SESSION_TOKEN_SECRET);
      if (result) return;
      throw new Error('Invalid session token');
    },

    verifyAccessToken(token) {
      const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (result) return;
      throw new Error('Invalid access token');
    },

    createAccessToken(payload) {
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACESSS_TOKEN_EXPIRATION_TIME,
      });
    },

    createSessionToken(payload) {
      return jwt.sign(payload, process.env.SESSION_TOKEN_SECRET);
    },
  };
})();
