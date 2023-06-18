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
        const authRes = await auth.post('/token', { id: user._id });
        const authData = await authRes.json();
        if (!authData.result) throw new Error('Auth server failed to generate tokens');
        res.status(200).json({ result: true, tokens: authData.tokens });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to create session' });
      }
    },

    async updateSession(req, res, next) {
      try {
        const authRes = await auth.post('/token/access/refresh', {
          refresh: req.body.refresh,
        });
        const authData = await authRes.json();
        if (!authData.result)
          throw new Error('Auth server failed to update access token');
        res.status(200).json({ result: true, access: authData.access });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to update session' });
      }
    },

    async endSession(req, res, next) {
      try {
        const authRes = await auth.delete('/token/refresh', {
          refresh: req.body.refresh,
        });
        const authData = await authRes.json();
        if (!authData.result) throw new Error('Auth server failed to remove token');
        res.status(200).json({ result: true, message: 'Session ended' });
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed to end session' });
      }
    },
  };
})();
