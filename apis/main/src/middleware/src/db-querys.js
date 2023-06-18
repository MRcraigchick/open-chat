import { User } from '@/db/models';
import { compareSync } from 'bcrypt';

export default (() => {
  return {
    user: {
      async doesNotExist(req, res, next) {
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser)
          return res.status(409).json({
            result: false,
            error: 'User already registerd',
          });
        next();
      },
      async exists(req, res, next) {
        const foundUser = await User.findOne({ email: req.body.email });
        if (foundUser) {
          next();
          return;
        }
        res.status(401).json({
          result: false,
          error: 'Invalid user',
        });
      },
      async matchingPassword(req, res, next) {
        const user = await User.findOne({ email: req.body.email });
        if (compareSync(req.body.password, user.password)) {
          next();
          return;
        }
        res.status(401).json({
          result: false,
          error: 'Invalid user',
        });
      },
    },
  };
})();
