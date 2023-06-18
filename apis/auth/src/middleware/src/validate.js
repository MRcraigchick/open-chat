import { validateBody } from 'lib/cjs/input-validators';

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
  };
})();
