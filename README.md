# 🌸 Japanese Study Reminder Discord Bot

A Discord bot that sends daily Japanese study reminders with interactive embed messages and reaction tracking.

## ✨ Features

- 📅 **Daily Reminders**: Automatically sends study check-ups at 8 PM Tokyo time
- 🎨 **Beautiful Embeds**: Stylish embed messages with organized study activities
- 🌸 **Interactive Reactions**: Users can react to show what they studied
- ⚙️ **Admin Commands**: Test reminders and get help information
- 🌏 **Timezone Support**: Configured for Tokyo timezone

## 📋 Study Activities Tracked

- 🌸 **Studied Japanese** - General study sessions
- 👄 **Talked Japanese** - Speaking practice
- 🇯🇵 **Consumed Japanese Content** - Watching anime, listening to music, etc.
- 📖 **Read Japanese** - Reading practice
- ✒️ **Wrote Japanese** - Writing practice

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- A Discord account and server
- Basic knowledge of Discord bot setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/japanese-study-discord-bot.git
cd japanese-study-discord-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to "Bot" section and click "Add Bot"
4. Copy the bot token
5. In "OAuth2" > "URL Generator":
   - Select "bot" scope
   - Select permissions: "Send Messages", "Add Reactions", "Read Message History"
   - Use generated URL to invite bot to your server

### 4. Configuration

1. Create a `.env` file in the root directory:

```env
BOT_TOKEN=your_bot_token_here
CHANNEL_ID=your_channel_id_here
```

2. Get your channel ID:
   - Enable Developer Mode in Discord settings
   - Right-click on your target channel
   - Select "Copy ID"

### 5. Run the Bot

```bash
npm start
```

## 🎮 Commands

- `!testreminder` - Test the daily reminder (Admin only)
- `!reminderhelp` - Show help information and bot status

## ⏰ Schedule

The bot sends reminders daily at **8:00 PM Tokyo time** (JST/UTC+9).

To change the time, modify the `REMINDER_TIME` variable in `bot.js`:

```javascript
const REMINDER_TIME = "0 20 * * *"; // Format: minute hour * * *
```

## 🎨 Customization

### Change Reminder Message

Edit the `createStudyEmbed()` function in `bot.js` to customize:

- Embed color
- Title and description
- Study activities
- Footer message

### Change Reaction Emojis

Modify the `REACTION_EMOJIS` array:

```javascript
const REACTION_EMOJIS = ["🌸", "👄", "🇯🇵", "📖", "✒️"];
```

### Change Timezone

Update the timezone in the cron schedule:

```javascript
cron.schedule(
  REMINDER_TIME,
  () => {
    // ...
  },
  {
    timezone: "Asia/Tokyo", // Change this
  }
);
```

## 🚀 Deployment Options

### Free Hosting Options:

- **Railway** - Easy deployment with GitHub integration
- **Render** - Free tier with automatic deployments
- **Heroku** - Free tier available (with scheduler add-on)

### Paid Options:

- **DigitalOcean** - VPS hosting
- **AWS EC2** - Cloud hosting
- **Google Cloud Platform** - Cloud hosting

### Local Hosting:

Keep your computer running 24/7 with the bot active.

## 📁 Project Structure

```
japanese-study-discord-bot/
├── bot.js              # Main bot code
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (not in repo)
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🛡️ Security Notes

- **Never commit your `.env` file** - It's already in `.gitignore`
- **Keep your bot token secure** - Don't share it publicly
- **Use environment variables** for all sensitive data

## 🐛 Troubleshooting

### Bot not responding:

1. Check if bot is online in Discord
2. Verify bot has necessary permissions in your server
3. Check console for error messages

### Reminder not sending:

1. Verify `CHANNEL_ID` is correct
2. Ensure bot has permission to send messages in that channel
3. Check timezone settings

### Permission errors:

1. Make sure bot has "Send Messages" and "Add Reactions" permissions
2. Check channel-specific permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Discord.js community for the excellent library
- Japanese language learning community for inspiration
- All contributors and users of this bot

---

**がんばって！ (Good luck with your Japanese studies!)**
