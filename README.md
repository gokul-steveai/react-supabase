# Chatter - Real-time Chat Application

A modern real-time chat application where you can instantly message with friends across multiple channels.

## ✨ What You Can Do

- 💬 **Send & Receive Messages Instantly** - See messages appear in real-time
- 👥 **Multiple Channels** - Organize conversations by topic
- 🟢 **See Who's Online** - Know when friends are active
- 📱 **Works on Mobile** - Responsive design for all devices
- 🔐 **Secure & Private** - Your messages are encrypted
- ⚡ **Lightning Fast** - Messages appear instantly

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- A Supabase account (free at supabase.com)

### Installation

1. Clone and install:
```bash
npm install
```

2. Set up your environment:
```bash
cp .env.example .env
```
Add your Supabase credentials to `.env`

3. Start the app:
```bash
npm run dev
```

That's it! Open http://localhost:5173 in your browser.

## 📖 How to Use

1. **Sign Up** - Create an account with your email
2. **Choose a Channel** - Pick a channel from the sidebar
3. **Start Chatting** - Type and send messages
4. **See Friends** - Check who's online in the header

## 🏗️ Project Structure

```
src/
├── pages/          # Login & Chat screens
├── components/     # UI building blocks
├── hooks/          # Reusable logic
└── db/             # Database connection
```

## 🔧 For Developers

**Tech Stack:**
- React 19 + TypeScript
- Supabase for backend
- Tailwind CSS for styling
- Vite for fast builds

**Key Features:**
- Real-time messaging via broadcast channels
- Instant message display (optimistic updates)
- Automatic duplicate prevention
- Secure authentication
- Role-based permissions

## 📦 Build for Production

```bash
npm run build
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
