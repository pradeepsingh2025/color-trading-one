# Color Trading Platform

A real-time, high-performance Color Trading and Betting platform built with modern web technologies. This application allows users to participate in fast-paced betting on colors, numbers, and sizes across various time periods, with live updates powered by WebSockets.

## 🚀 Features

- **Real-Time Betting:** Live updates and game state synchronization using Socket.io.
- **Multiple Game Modes:** Participate in 30-second, 1-minute, 3-minute, and 5-minute betting periods.
- **Versatile Betting Options:**
  - **Colors:** Bet on primary game colors.
  - **Numbers:** Select exact numbers (0-9) for higher payouts (1:9 multiplier).
  - **Sizes:** Bet on Big (5-9) or Small (0-4) outcomes.
- **User Authentication:** Secure JWT-based login and registration system.
- **Wallet Management:** Integrated Recharge and Withdrawal functionalities with real-time balance updates.
- **Admin Dashboard:** Administrative panel to monitor transactions, manage users, and view platform statistics.
- **Responsive UI:** Clean, mobile-first design built with Material UI.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Routing:** React Router DOM v7
- **Styling & UI Components:** 
  - Material UI (MUI) v7
  - Emotion
  - Lucide React (Icons)
- **Real-Time Communication:** Socket.io-client
- **Code Quality:** ESLint

## 📦 Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your backend API URL and any other necessary configurations:
   ```env
   VITE_API_URL=http://your-backend-api-url.com
   ```
4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`.

## 📜 Available Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Runs ESLint to catch and fix code style issues.

## 📁 Project Structure Highlights

- `src/components/game/` - Core logic and UI for the betting mechanics and real-time Socket.io listeners.
- `src/context/` - React Context providers (e.g., UserContext) for global state management.
- `src/pages/` - Top-level route components including AdminPanel, Login, Dashboard, Recharge, and Withdraw.
- `src/admin/` - Administrative components tailored for the admin dashboard.

## 📄 License

This project is proprietary and confidential.
