import { client } from '@/trigger';
import { cronTrigger } from '@trigger.dev/sdk';

client.defineJob({
  id: 'inactive-user-email-notification',
  name: 'Inactive User Email Notification',
  version: '1.0.0',
  trigger: cronTrigger({
    cron: '0 16 * * 5', // Every Friday at 4 pm UTC
  }),
  // integrations: { sendgrid },
  run: async (payload, io, ctx) => {
    // const users = await getUsersFromClerk();
    // const inactiveUsers = filterInactiveUsers(users);

    for (const user of inactiveUsers) {
      const emailContent = createEmailContentForInactiveUser(user);

      await io.sendgrid.sendEmail({
        to: user.email,
        from: 'Your-Name <your-email-address>',
        subject: 'We miss you!',
        text: emailContent,
      });
    }
  },
});
