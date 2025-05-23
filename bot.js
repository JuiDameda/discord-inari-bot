require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ]
});

// Configuration
const CHANNEL_ID = process.env.CHANNEL_ID;
const REMINDER_TIME = '0 20 * * *'; // 8 PM every day Tokyo time

// Create embed message for Japanese study reminder
function createStudyEmbed() {
    return new EmbedBuilder()
        .setColor(0xFF69B4) // Pink color
        .setTitle('🌸 Japanese Study Check Up 🌸')
        .setDescription('**Did you study Japanese today?**')
        .addFields(
            { name: '🌸 Studied Japanese', value: 'React if you studied today!', inline: true },
            { name: '👄 Talked Japanese', value: 'React if you practiced speaking!', inline: true },
            { name: '🇯🇵 Consumed Japanese Content', value: 'React if you watched/listened!', inline: true },
            { name: '📖 Read Japanese', value: 'React if you read something!', inline: true },
            { name: '✒️ Wrote Japanese', value: 'React if you practiced writing!', inline: true },
            { name: '\u200B', value: '\u200B', inline: true } // Empty field for spacing
        )
        .setFooter({ text: 'がんばって！ (Good luck!)' })
        .setTimestamp();
}

const REACTION_EMOJIS = ['🌸', '👄', '🇯🇵', '📖', '✒️'];

// Bot ready event
client.once('ready', () => {
    console.log(`✅ Bot is online! Logged in as ${client.user.tag}`);
    console.log(`🤖 Bot ID: ${client.user.id}`);
    console.log(`📅 Daily reminders scheduled for: ${REMINDER_TIME}`);
    
    // Set bot status
    client.user.setActivity('Japanese study reminders 🌸', { type: 'WATCHING' });
});

// Function to send daily reminder
async function sendDailyReminder() {
    try {
        const channel = await client.channels.fetch(CHANNEL_ID);
        
        if (!channel) {
            console.error('❌ Channel not found! Check your CHANNEL_ID');
            return;
        }

        console.log(`📨 Sending Japanese study reminder to #${channel.name}`);
        
        // Create and send the embed message
        const embed = createStudyEmbed();
        const message = await channel.send({ embeds: [embed] });
        
        // Add reactions to the message
        for (const emoji of REACTION_EMOJIS) {
            try {
                await message.react(emoji);
                // Small delay between reactions to avoid rate limits
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.error(`❌ Failed to add reaction ${emoji}:`, error.message);
            }
        }
        
        console.log('✅ Japanese study reminder sent successfully!');
        
    } catch (error) {
        console.error('❌ Error sending daily reminder:', error);
    }
}

// Schedule the daily reminder
cron.schedule(REMINDER_TIME, () => {
    console.log('⏰ Scheduled reminder triggered');
    sendDailyReminder();
}, {
    scheduled: true,
    timezone: "Asia/Tokyo" // Tokyo timezone
});

// Optional: Command to test the reminder manually
client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;
    
    // Test command (only works for server administrators)
    if (message.content.toLowerCase() === '!testreminder') {
        if (message.member.permissions.has('ADMINISTRATOR')) {
            console.log('🧪 Manual Japanese study reminder test triggered');
            await sendDailyReminder();
        } else {
            message.reply('❌ You need administrator permissions to use this command.');
        }
    }
    
    // Help command
    if (message.content.toLowerCase() === '!reminderhelp') {
        const helpMessage = "🌸 **Japanese Study Reminder Bot Commands:**\n\n" +
            "`!testreminder` - Test the daily reminder (Admin only)\n" +
            "`!reminderhelp` - Show this help message\n\n" +
            `📅 Daily reminders are scheduled for 8 PM Tokyo time\n` +
            `🌸 React to show what Japanese activities you did today!`;
        
        message.reply(helpMessage);
    }
});

// Error handling
client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.BOT_TOKEN).catch((error) => {
    console.error('❌ Failed to login:', error);
    process.exit(1);
});