import { Session } from '@/db/models';

export default (() => {
  return {
    session: {
      async exists(req, res, next) {
        const token = await Session.findOne({ token: req.body.session });
        if (token) {
          next();
          return;
        }
        res.status(404).json({
          result: false,
          error: 'Token not found',
        });
      },
    },
  };
})();
