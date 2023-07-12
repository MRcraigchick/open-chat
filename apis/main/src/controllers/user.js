import { hashSync } from 'bcrypt';
import { User } from '@/db/models';
import { requestsInstance as auth } from '@/auth-requests';

export default (() => {
  return {
    async register(req, res, next) {
      try {
        await new User({
          ...req.body,
          password: hashSync(req.body.password, Number(process.env.HASH_SALT)),
        }).save();
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, message: 'Failed to register user' });
        return;
      }
      res.status(200).json({ result: true, message: 'Registerd user successfully' });
      return;
    },

    async startSession(req, res, next) {
      try {
        const user = await User.findOne({ email: req.body.email });
        const authRes = await auth.post('/tokens', { payload: { id: user._id } });
        const authData = await authRes.json();
        if (!authData.result) throw new Error('Failed to generate tokens');
        res.status(200).json({ result: true, tokens: authData.tokens });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to generate tokens' });
      }
    },

    async updateAccess(req, res, next) {
      try {
        const authRes = await auth.post('/tokens/access/refresh', {
          session: req.body.session,
        });
        const authData = await authRes.json();
        console.log(authData);
        if (!authData.result) throw new Error('Invalid session token');
        res.status(200).json({ result: true, access: authData.tokens.access });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Invalid session token' });
      }
    },

    async endSession(req, res, next) {
      try {
        const authRes = await auth.delete('/tokens/session', {
          session: req.body.session,
        });
        const authData = await authRes.json();
        if (!authData.result) throw new Error('Invalid session');
        res.status(200).json({ result: true, message: 'Session ended' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Invalid session' });
      }
    },
  };
})();
