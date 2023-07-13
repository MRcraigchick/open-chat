import { Session } from '@/db/models';
const { add } = require('date-fns');

export default (() => {
  return {
    async removeUnused(expires) {
      try {
        const thresholdDate = add(new Date(), expires || { days: -7 });
        const unusedSessions = await Session.find({
          lastRequested: { $lt: thresholdDate },
        });

        if (unusedSessions.length > 0) {
          await Session.deleteMany({
            _id: { $in: unusedSessions.map((doc) => doc._id) },
          });
          console.log(
            `${unusedSessions.length} unused session${
              unusedSessions.length > 1 ? 's' : ''
            } removed`
          );
        }
      } catch (err) {
        console.log('Remove unused sessions task failed', err);
      }
    },
  };
})();
