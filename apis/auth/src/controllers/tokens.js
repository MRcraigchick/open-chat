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
        res.status(500).json({ result: false, error: 'Failed to generate tokens' });
        return;
      }
    },

    async validateAccessToken(req, res, next) {
      try {
        jwt.verifyAccessToken(req.body.access);
        res.status(200).json({ result: true, message: 'Access token validated' });
        return;
      } catch (err) {
        console.log(err);
        res.status(401).json({ result: false, error: 'Invalid access token' });
        return;
      }
    },

    async refreshAccessTokenWithSessionToken(req, res, next) {
      const { session } = req.body;
      try {
        if (!Session.findOne({ token: session })) {
          res.status(404).json({ result: false, error: 'Session does no exist' });
          return;
        }
        const sessionData = jwt.verifySessionToken(session);
        res.status(200).json({
          result: true,
          tokens: { access: jwt.createAccessToken({ payload: sessionData.payload }) },
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
    async sendTokenPayload(req, res, next) {
      try {
        const tokenData = jwt.verifyAccessToken(req.body.access);
        res.status(200).json({ result: true, payload: tokenData.payload });
      } catch (err) {
        console.log(err);
        res.status(401).json({ result: false, error: 'Invalid access token' });
      }
    },
  };
})();
