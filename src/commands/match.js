import { getMatch } from "../images.js";


export default {
    
    data: {
        name: 'match',
        description: 'Responde con un match aleatorio"',
    },
    execute: async (interaction) => {
        const match = await getMatch();
        await interaction.reply({content: "Here is a match for both of you ❤️", files: [{ attachment: `${match[1]}`}, { attachment: `${match[0]}`}]});
    },
};
