import { Token } from '@/db/models';
import jwt from '@/lib/jwt-util';

export default (() => {
  return {
    async generateSessionTokens(req, res, next) {
      try {
        const accessToken = jwt.createAccessToken(req.body.id);
        const refreshToken = jwt.createRefreshToken(req.body.id);
        await new Token({ hash: refreshToken }).save();
        res.status(200).json({
          result: true,
          tokens: {
            access: accessToken,
            refresh: refreshToken,
          },
        });
        return;
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ result: false, error: 'Failed to generate session tokens' });
        return;
      }
    },

    async validateAccessToken(req, res, next) {
      try {
        jwt.verifyAccessToken(req.body.access);
      } catch (err) {
        console.log(err);
        res.status(401).json({ result: false, error: 'Invalid access token' });
        return;
      }
      try {
        res.status(200), json({ result: true, message: 'Access token validated' });
        return;
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to validate access token' });
        return;
      }
    },

    async renewAccessTokenWithRefreshToken(req, res, next) {
      try {
        jwt.verifyRefreshToken(req.body.refresh);
      } catch (err) {
        console.log(err);
        Token.deleteMany({ hash: req.body.refresh });
        res
          .status(401)
          .json({ result: false, expired: true, error: 'Session has expired' });
        return;
      }
      try {
        res.status(200),
          json({ result: true, tokens: { access: jwt.createAccessToken(req.body.id) } });
        return;
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to generate access token' });
        return;
      }
    },

    async removeRefreshToken(req, res, next) {
      try {
        await Token.deleteMany({ hash: req.body.refresh });
        res
          .status(200)
          .json({ result: true, message: 'Refresh token removed succesfully' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to remove refresh token' });
        return;
      }
    },
  };
})();
