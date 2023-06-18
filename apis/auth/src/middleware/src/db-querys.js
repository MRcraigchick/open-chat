import { Token } from '@/db/models';

export default (() => {
  return {
    token: {
      async exists(req, res, next) {
        const token = await Token.findOne({ hash: req.body.token });
        if (token) {
          next();
          return;
        }
        res.status(401).json({
          result: false,
          error: 'Invalid token',
        });
      },
    },
  };
})();
