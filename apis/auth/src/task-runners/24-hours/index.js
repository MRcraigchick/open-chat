import runTimeLoop from '@/lib/loops';
import session from './tasks/session';

runTimeLoop(async () => {
  session.removeUnused({ days: -1 });
}, '24h');
