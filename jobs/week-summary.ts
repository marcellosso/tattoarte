import { client } from '@/trigger';
import { cronTrigger } from '@trigger.dev/sdk';

client.defineJob({
  id: 'week-summary-email-notification',
  name: 'Week Summary Email Notification',
  version: '0.1.1',
  trigger: cronTrigger({
    // This Job will run at 9:00am BRT (12 pm UTC) every Friday.
    cron: '0 12 * * 5',
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info('Received the scheduled event', {
      payload,
    });

    return { foo: 'bar' };
  },
});
