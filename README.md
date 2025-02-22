# Deep Research

An AI-powered research assistant that helps automate in-depth research using GPT-4 and external search APIs.

## 🚀 Quick Start

### Windows Users
Simply double-click the `start.bat` file to run the application.

### Manual Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your API keys in `.env.local`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Features

- **Smart Research**: Automated research using AI and external search APIs
- **Modern UI**: Clean, responsive interface with dark mode support
- **Research Dashboard**: Track and manage your research progress
- **API Integration**: Support for multiple search and AI APIs
- **Export Options**: Save your research findings in various formats

## 📋 Requirements

- Node.js 22.x or later
- Modern web browser
- API keys for:
  - OpenAI (for GPT-4)
  - Search APIs (configurable)

## 🔧 Configuration

Configure your API keys in the Settings page or directly in `.env.local`:

```env
OPENAI_API_KEY=your_key_here
SEARCH_API_KEY=your_key_here
```

## 📱 Pages

- **Home** (`/`): Start new research
- **Dashboard** (`/dashboard`): View research progress
- **Settings** (`/settings`): Configure API keys and preferences

## 🎨 Development

Built with:
- Next.js 14
- React 18
- TailwindCSS
- TypeScript
- Framer Motion

## 📄 License

ISC License
