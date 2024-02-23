import { TriggerClient, eventTrigger } from '@trigger.dev/sdk';
import { OpenAI } from '@trigger.dev/openai';
import { z } from 'zod';
import { client } from '@/trigger';

const openai = new OpenAI({
  id: 'openai',
  apiKey: process.env.OPENAI_API_KEY!,
});

// This Job will use OpenAI GPT-3.5 Turbo to tell you a joke
client.defineJob({
  id: 'openai-create-prompt',
  name: 'OpenAI - Create Prompt',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'openai.create.prompt',
    schema: z.object({
      userPrompt: z.string(),
    }),
  }),
  integrations: {
    openai,
  },
  run: async (payload, io, ctx) => {
    await io.openai.retrieveModel('get-model', {
      model: 'gpt-3.5-turbo',
    });

    const models = await io.openai.listModels('list-models');

    const aiContext = '';
    const basePrompt = '';

    const promptResult = await io.openai.chat.completions.backgroundCreate(
      'background-chat-completion',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: payload.userPrompt,
          },
        ],
      }
    );

    return {
      prompt: promptResult.choices[0]?.message?.content,
    };
  },
});
