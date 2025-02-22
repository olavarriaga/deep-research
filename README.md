# Deep Research - Enhanced Edition

A powerful AI-powered research assistant built on top of [@dzhng/deep-research](https://github.com/dzhng/deep-research) that helps automate in-depth research using GPT-4 and external search APIs. This enhanced version includes several improvements and modern development practices.

## 🌟 Improvements & New Features

- **Updated Tech Stack**: Upgraded to Next.js 14 with App Router and React 18
- **Enhanced Testing**: Added Jest configuration with comprehensive test setup
- **Modern Development Tools**: 
  - Added Prettier configuration for consistent code formatting
  - Docker support for containerized deployment
  - Improved TypeScript configuration
- **Development Experience**:
  - Added `.nvmrc` for consistent Node.js version management
  - Enhanced environment variable management with `.env.example`
  - Windows-specific startup script (`start.bat`)
- **Code Quality**:
  - Improved TypeScript types and configurations
  - Enhanced TailwindCSS setup with custom configurations
  - Better project structure and organization

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

### Docker Setup

```bash
docker-compose up
```

## 🛠️ Features

- **Smart Research**: Automated research using AI and external search APIs
- **Modern UI**: Clean, responsive interface with dark mode support
- **Research Dashboard**: Track and manage your research progress
- **API Integration**: Support for multiple search and AI APIs
- **Export Options**: Save your research findings in various formats

## 📋 Requirements

- Node.js 18.x or later (specified in `.nvmrc`)
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

## 🧪 Testing

Run tests using Jest:

```bash
npm test
```

## 📱 Pages

- **Home** (`/`): Start new research
- **Dashboard** (`/dashboard`): View research progress
- **Settings** (`/settings`): Configure API keys and preferences

## 🎨 Tech Stack

Built with:
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- TypeScript
- Framer Motion
- Jest for testing
- Prettier for code formatting
- Docker for containerization

## 📄 License

ISC License
