# 💬 Ping — Real-Time Messaging App

> **Stay Connected, Stay Close** — A modern real-time messaging application built with Next.js 16.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

- 🔐 **Authentication** — Secure sign-in with credentials or OAuth (NextAuth.js)
- 💬 **Real-Time Messaging** — Instant message delivery powered by Pusher
- 👥 **Group Chats** — Create and manage group conversations
- 👤 **Direct Messages** — One-on-one private conversations
- 🖼️ **Image Sharing** — Upload and share images via Cloudinary
- 🟢 **Online Status** — See who's currently active
- ✅ **Message Seen Indicators** — Know when your messages are read
- 👤 **User Profiles** — Customizable profile with avatar support
- 📱 **Responsive Design** — Beautiful UI across all devices

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Database** | MongoDB |
| **ORM** | Prisma 6 |
| **Authentication** | NextAuth.js |
| **Real-Time** | Pusher |
| **State Management** | Zustand |
| **Image Upload** | Cloudinary (next-cloudinary) |
| **Styling** | Tailwind CSS 4 |
| **Forms** | React Hook Form |
| **Icons** | React Icons |
| **HTTP Client** | Axios |
| **Date Utilities** | date-fns |

---

## 📁 Project Structure

```
ping/
├── app/
│   ├── (site)/           # Landing page
│   ├── actions/          # Server actions (getUsers, getConversations, etc.)
│   ├── api/              # API routes (auth, conversations, messages, settings)
│   ├── auth/             # Authentication pages
│   ├── components/       # Reusable UI components (Avatar, Modal, Button, etc.)
│   ├── context/          # React contexts (Auth, Toaster)
│   ├── conversations/    # Conversation views & chat UI
│   ├── hooks/            # Custom hooks (useActiveList, useConversation, etc.)
│   ├── libs/             # Utility libraries (Prisma client, Pusher config)
│   ├── types/            # TypeScript type definitions
│   └── users/            # User listing & profile pages
├── prisma/               # Prisma schema (User, Account, Conversation, Message)
├── public/               # Static assets
└── middleware.ts         # Route protection middleware
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm / bun
- MongoDB database
- Pusher account
- Cloudinary account

### Environment Variables

Create a `.env` file in the root directory with:

```env
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Providers (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Pusher
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_SECRET="your-pusher-secret"
NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-key"
NEXT_PUBLIC_PUSHER_CLUSTER="your-pusher-cluster"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
```

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🗃️ Database Models

- **User** — User accounts with profile info
- **Account** — OAuth provider accounts
- **Conversation** — Chat rooms (direct or group)
- **Message** — Individual messages with seen status

---

## 🔒 Authentication

Supports multiple authentication methods:
- **Credentials** — Email & password (bcrypt hashed)
- **GitHub OAuth**
- **Google OAuth**

---

## 📄 License

© 2025 Ping™ — Made with 💙 by **Sanyog Tripathi**

All Rights Reserved.
