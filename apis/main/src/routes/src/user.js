import { routerInstance } from '@/lib/express-util';
import { validate, query } from '@/middleware';
import controller from '@/controllers/user';

export default routerInstance((router) => {
  router.post(
    '/',
    validate.fields(['firstname', 'lastname', 'email', 'password']),
    validate.email,
    query.user.doesNotExist,
    controller.register
  );
  router.post(
    '/session/start',
    validate.fields(['email', 'password']),
    validate.email,
    query.user.exists,
    query.user.matchingPassword,
    controller.startSession
  );
  router.put('/access/refresh', validate.fields(['session']), controller.updateAccess);
  router.delete('/session/end', validate.fields(['session']), controller.endSession);
});
