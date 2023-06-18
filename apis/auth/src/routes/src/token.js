import { routerInstance } from '@/lib/express-util';
import { validate, query } from '@/middleware';
import controller from '@/controllers/token';

export default routerInstance((router) => {
  router.post('/', validate.fields(['id']), controller.generateSessionTokens);

  router.post(
    '/access/refresh',
    validate.fields(['refresh']),
    query.token.exists,
    controller.renewAccessTokenWithRefreshToken
  );

  router.post(
    '/access/valid',
    validate.fields(['access']),
    query.token.exists,
    controller.validateAccessToken
  );

  router.delete(
    '/refresh',
    validate.fields(['refresh']),
    query.token.exists,
    controller.removeRefreshToken
  );
});
