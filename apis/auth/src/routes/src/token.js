import { routerInstance } from '@/lib/express-util';
import { validate, query } from '@/middleware';
import controller from '@/controllers/token';

export default routerInstance((router) => {
  router.post('/', validate.fields(['id']), controller.generateTokens);

  router.post(
    '/access/refresh',
    validate.fields(['session']),
    query.token.exists,
    controller.renewAccessTokenWithSessionToken
  );

  router.post(
    '/access/validate',
    validate.fields(['access']),
    query.token.exists,
    controller.validateAccessToken
  );

  router.delete(
    '/session',
    validate.fields(['session']),
    query.token.exists,
    controller.removeSessionToken
  );
});
