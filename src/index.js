import { Client, IntentsBitField, REST, Routes, Collection } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ],
});

bot.commands = new Collection();

// Cargar comandos desde la carpeta "commands"
const commands = [];
const commandsPath = path.resolve('src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    bot.commands.set(command.default.data.name, command.default);
    commands.push(command.default.data);
}

// Registrar los comandos en Discord
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_KEY);

(async () => {
    try {
        console.log('Registrando comandos de aplicación...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Comandos registrados con éxito.');
    } catch (error) {
        console.error('Error al registrar comandos:', error);
    }
})();

// Manejar eventos del bot
bot.on('ready', () => {
    console.log('Bot listo');
});

bot.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = bot.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error('Error al ejecutar el comando:', error);
        await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
    }
});

bot.login(process.env.DISCORD_KEY);
