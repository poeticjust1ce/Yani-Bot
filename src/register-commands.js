import * as dotenv from 'dotenv'

dotenv.config()

import { REST, Routes } from 'discord.js'

const commands = [
  {
    name: 'status',
    description: `Checks the bot's status`,
  },
  {
    name: 'stock',
    description: `Checks blox fruit current stock`,
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();