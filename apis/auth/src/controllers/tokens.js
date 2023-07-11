import { Session } from '@/db/models';
import jwt from '@/lib/jwt-util';

export default (() => {
  return {
    async generateTokens(req, res, next) {
      try {
        const { payload } = req.body;
        const access = jwt.createAccessToken({ payload });
        const session = jwt.createSessionToken({ payload });
        await new Session({ token: session }).save();
        res.status(200).json({
          result: true,
          tokens: {
            access,
            session,
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

    async refreshAccessTokenWithSessionToken(req, res, next) {
      const { session, payload } = req.body;
      try {
        jwt.verifySessionToken(session);
      } catch (err) {
        console.log(err);
        Session.deleteMany({ token: session });
        res
          .status(401)
          .json({ result: false, expired: true, error: 'Session has expired' });
        return;
      }
      try {
        res.status(200).json({
          result: true,
          tokens: { access: jwt.createAccessToken({ payload }) },
        });
        return;
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to generate access token' });
        return;
      }
    },

    async removeSessionToken(req, res, next) {
      try {
        await Session.deleteMany({ token: req.body.session });
        res
          .status(200)
          .json({ result: true, message: 'Session token removed successfully' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to remove session token' });
        return;
      }
    },
  };
})();
