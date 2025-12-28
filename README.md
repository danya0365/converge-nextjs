<div align="center">
  <img src="public/favicon/apple-touch-icon.png" alt="Converge Logo" width="80" height="80">
  
  # Converge
  
  ### 🚀 Omnichannel Chat Platform with AI Chatbot for Business
  
  **รวมทุกช่องทางการแชทในที่เดียว พร้อม AI ตอบอัตโนมัติ 24/7**

  [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  
  [![GitHub stars](https://img.shields.io/github/stars/danya0365/converge-nextjs?style=for-the-badge&logo=github)](https://github.com/danya0365/converge-nextjs/stargazers)
  [![GitHub forks](https://img.shields.io/github/forks/danya0365/converge-nextjs?style=for-the-badge&logo=github)](https://github.com/danya0365/converge-nextjs/network/members)
  [![GitHub issues](https://img.shields.io/github/issues/danya0365/converge-nextjs?style=for-the-badge&logo=github)](https://github.com/danya0365/converge-nextjs/issues)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  [🌐 Live Demo](https://converge.vercel.app) · [📖 Documentation](#-documentation) · [🐛 Report Bug](https://github.com/danya0365/converge-nextjs/issues) · [✨ Request Feature](https://github.com/danya0365/converge-nextjs/issues)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="docs/screenshots/landing.png" alt="Converge Landing Page" width="100%">
  <p><em>Landing Page - Modern & Professional Design</em></p>
  
  <br/>
  
  <img src="docs/screenshots/dashboard.png" alt="Converge Dashboard" width="100%">
  <p><em>Dashboard - Real-time Analytics & Metrics</em></p>
</div>

---

## ✨ Features

<table>
  <tr>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/message-square.svg" width="40" height="40"><br>
      <b>Unified Inbox</b><br>
      รวมแชทจากทุกช่องทางในหน้าจอเดียว
    </td>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bot.svg" width="40" height="40"><br>
      <b>AI Chatbot</b><br>
      ตอบอัตโนมัติ 24/7 ด้วย AI อัจฉริยะ
    </td>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/bar-chart-3.svg" width="40" height="40"><br>
      <b>Analytics</b><br>
      วิเคราะห์ข้อมูลลูกค้าเชิงลึก
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/send.svg" width="40" height="40"><br>
      <b>Broadcast</b><br>
      ส่งข้อความถึงลูกค้าหลายพันคน
    </td>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/users.svg" width="40" height="40"><br>
      <b>Team Collaboration</b><br>
      ทำงานร่วมกันเป็นทีม
    </td>
    <td align="center" width="33%">
      <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" width="40" height="40"><br>
      <b>Automation</b><br>
      สร้าง Flow อัตโนมัติ
    </td>
  </tr>
</table>

### 🔗 Supported Channels

<p align="center">
  <img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook">
  <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram">
  <img src="https://img.shields.io/badge/LINE-00C300?style=for-the-badge&logo=line&logoColor=white" alt="LINE">
  <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp">
  <img src="https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white" alt="TikTok">
  <img src="https://img.shields.io/badge/Shopee-EE4D2D?style=for-the-badge&logo=shopee&logoColor=white" alt="Shopee">
  <img src="https://img.shields.io/badge/Lazada-0F146D?style=for-the-badge&logo=lazada&logoColor=white" alt="Lazada">
</p>

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15.5 (App Router, Turbopack) |
| **Frontend** | React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, CSS Variables |
| **State Management** | Zustand 5 |
| **Database** | Supabase (PostgreSQL) |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Theme** | next-themes (Dark/Light mode) |

---

## 🏗️ Architecture

This project follows **Clean Architecture** principles:

```
src/
├── domain/          # Business entities & interfaces
│   └── entities/    # Core business models
├── infrastructure/  # External services & data layer
│   └── ...          # API clients, repositories
├── presentation/    # UI Layer
│   ├── components/  # Reusable UI components
│   ├── presenters/  # View logic & state management
│   └── providers/   # React Context providers
├── stores/          # Zustand global stores
└── utils/           # Shared utilities
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **Yarn** or npm
- **Docker** (for Supabase local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danya0365/converge-nextjs.git
   cd converge-nextjs
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Start Supabase (optional)**
   ```bash
   yarn supabase-start
   ```

5. **Run development server**
   ```bash
   yarn dev
   ```

6. **Open browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with Turbopack |
| `yarn build` | Build for production |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |
| `yarn type-check` | TypeScript type checking |
| `yarn supabase-start` | Start local Supabase |
| `yarn supabase-stop` | Stop local Supabase |
| `yarn supabase-reset` | Reset Supabase database |
| `yarn supabase-generate` | Generate TypeScript types |

---

## 📂 Project Structure

```
converge-nextjs/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard pages
│   │   ├── analytics/      # Analytics page
│   │   ├── channels/       # Channel management
│   │   ├── customers/      # Customer CRM
│   │   └── inbox/          # Unified inbox
│   ├── login/              # Authentication
│   ├── signup/             # User registration
│   ├── pricing/            # Pricing plans
│   └── features/           # Feature pages
├── src/                    # Source code (Clean Architecture)
├── public/                 # Static assets
├── supabase/               # Database migrations & config
└── docs/                   # Documentation & screenshots
```

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Marosdee Uma**

- GitHub: [@danya0365](https://github.com/danya0365)
- Email: marosdee.u@gmail.com

---

<div align="center">
  
  ### ⭐ Star us on GitHub — it helps!
  
  Made with ❤️ in Thailand 🇹🇭
  
</div>
