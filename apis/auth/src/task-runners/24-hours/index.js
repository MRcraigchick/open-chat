import runtimeLoop from '@/lib/loops';
import session from './tasks/session';

runtimeLoop(async () => {
  session.removeUnused({ days: -1 });
}, '24h');
