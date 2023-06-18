import { validateBody, validateEmail } from 'lib/cjs/input-validators';

export default (() => {
  return {
    fields(expectedFields) {
      return (req, res, next) => {
        if (
          !validateBody({
            body: req.body,
            expectedPropertys: expectedFields,
          })
        ) {
          res.status(406).json({
            result: false,
            error: 'Invalid fields',
          });
          return;
        }
        next();
      };
    },
    email(req, res, next) {
      if (!validateEmail(req.body?.email).matches) {
        res.status(406).json({
          result: false,
          error: 'Invalid email',
        });
        return;
      }
      next();
    },
    async session(req, res, next) {
      try {
        const authRes = await auth.post('/token/access/valid', {
          access: req.body.access,
        });
        const authData = await authRes.json();
        if (!authData.result) {
          res.status(401).json('Invalid session');
          return;
        }
        next();
        return;
      } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'Failed validate session' });
      }
    },
  };
})();
