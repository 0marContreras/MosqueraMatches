export default {
    data: {
        name: 'hermosa',
        description: 'Menciona a tu novia y le dice hermosa',
    },
    execute: async (interaction) => {
        const noviaId = '1210666420346687589'; // ID de tu novia
        await interaction.reply(`<@${noviaId}> eres hermosa TE AMOOO😍`);
    },
};