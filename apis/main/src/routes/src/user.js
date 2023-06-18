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
    '/session',
    validate.fields(['email', 'password']),
    validate.email,
    query.user.exists,
    query.user.matchingPassword,
    controller.startSession
  );
  router.put(
    '/session/access/refresh',
    validate.fields(['refresh']),
    controller.updateSession
  );
  router.delete('/session/refresh', validate.fields(['refresh']), controller.endSession);
});
