# MIT-ADT Admin Panel - Security Lab

A web-based Capture The Flag (CTF) training application simulating an ADT University admin panel with intentional security vulnerabilities for educational purposes. This lab teaches security professionals how to identify and exploit common web-based vulnerabilities.

## 🎯 Overview

**MIT-ADT Admin** is an interactive security training platform designed to help you identify and understand common web vulnerabilities through hands-on exploration. The application features a realistic admin panel interface with three main security challenges:

- **SSRF (Server-Side Request Forgery)** - Exploit server-side request handling to access internal resources
- **robots.txt Information Disclosure** - Discover hidden endpoints through improper configuration
- **Hidden API Endpoints** - Find and access unauthenticated internal APIs

## ⚙️ Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- Basic understanding of web security concepts
- A modern web browser

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment (Optional)

Create a `.env.local` file in the project root. The Gemini API key is optional for this CTF lab:

```bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
```

### 3. Run the Development Server

```bash
npm run dev
```

The application will start on **http://localhost:3000**

## 📂 Project Structure

```
.
├── src/
│   ├── App.tsx              # Main React component with UI and logic
│   ├── main.tsx             # React entry point
│   └── index.css             # Tailwind styling
├── server.ts                # Express backend with vulnerable endpoints
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🏗️ Technologia Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom MIT-ADT theme colors
- **Animations**: Motion/Framer Motion
- **Icons**: Lucide React

## 🎓 Lab Challenges

### Challenge 1: SSRF Vulnerability

**Objective**: Exploit the Resource Status Fetcher to access internal endpoints

- Navigate to the **System Console** (Admin Panel)
- Use the "Resource Status Fetcher" form to request URLs
- Try fetching internal endpoints like `http://localhost:3000/admin`
- Extract the flag from the response

**Endpoint**: `POST /api/fetch`

---

### Challenge 2: robots.txt Information Disclosure

**Objective**: Discover hidden API paths through the robots.txt file

- Access `/robots.txt` in your browser or via fetch
- Look for the hidden flag comment in the file
- Discover disallowed paths pointing to internal endpoints

**Endpoint**: `GET /robots.txt`

---

### Challenge 3: Hidden API Endpoint

**Objective**: Access an unauthenticated internal API endpoint

- Discover the endpoint path from robots.txt or through the SSRF vulnerability
- Access `/api/internal/config` without authentication
- Extract sensitive information and the hidden flag

**Endpoint**: `GET /api/internal/config`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/fetch` | Fetch and return content from a URL (SSRF vulnerable) |
| POST | `/api/submit-flag` | Submit a flag for validation |
| GET | `/api/status` | Get server status |
| GET | `/robots.txt` | Server robot rules (contains hints) |
| GET | `/admin` | Internal admin panel (SSRF target) |
| GET | `/api/internal/config` | Internal configuration API |

## 🎮 How to Play

1. **Start the Lab**: Run `npm run dev` and open http://localhost:3000
2. **Explore**: Navigate through the admin panel and examine each component
3. **Identify Vulnerabilities**: Look for security weaknesses in the provided endpoints
4. **Capture Flags**: Submit discovered flags through the Flag Submission Panel
5. **Track Progress**: Monitor your completion status in the Lab Progress section

## 📊 Available Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run lint

# Clean build artifacts
npm run clean
```

## 🎨 UI Features

- **Responsive Design**: Works on desktop and tablet devices
- **Real-time Feedback**: Instant validation of submitted flags
- **Progress Tracking**: Visual indicator of completed challenges
- **MIT-ADT Branding**: Custom color scheme and university theming
- **Animated Components**: Smooth transitions and UI animations

## 🔒 Security Notes

**⚠️ Educational Purpose Only**

This application contains **intentional security vulnerabilities** for training purposes. It should **NEVER** be deployed in a production environment or exposed to the internet without proper security controls.

The vulnerabilities in this lab are:
- **Deliberately introduced** for educational value
- **Unprotected** by design to facilitate learning
- **Not meant for real-world deployment**

## 🛠️ Development

### Adding New Challenges

To add new vulnerabilities to the lab:

1. Add a new endpoint in `server.ts`
2. Create a corresponding UI component in `App.tsx`
3. Update the flag validation in `/api/submit-flag`
4. Document the challenge in this README

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key (for future AI features) |
| `APP_URL` | No | Application URL (defaults to localhost:3000) |
| `NODE_ENV` | No | Environment mode (development or production) |

## 📝 Troubleshooting

**Server won't start?**
- Ensure port 3000 is not in use: `lsof -i :3000`
- Check Node.js version: `node --version`
- Clear dependencies and reinstall: `rm -rf node_modules && npm install`

**Hot reload not working?**
- Check Vite configuration in `vite.config.ts`
- Verify HMR is not disabled in environment

**Flags not validating?**
- Ensure the server is running
- Check browser console for fetch errors
- Verify flag format: `FLAG{type-xxxx-xxxx-xxxx-xxxx}`

## 🤝 Contributing

Contributions are welcome! For bug fixes or new features:

1. Fork the repository
2. Create a feature branch
3. Test your changes
4. Submit a pull request

## 📜 License

This project is provided for educational purposes. See LICENSE file for details.

## 👨‍🎓 Learning Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Server-Side Request Forgery (SSRF)](https://owasp.org/www-community/attacks/Server-Side_Request_Forgery)
- [Web Security Academy](https://portswigger.net/web-security)

---

**Happy Hacking! 🎯**

## 🚀 Deployment to Vercel

This project is configured for easy deployment on Vercel. Follow these steps to deploy:

### Prerequisites

- A [Vercel account](https://vercel.com/signup)
- Git repository with the project code
- Environment variables ready

### Deployment Steps

#### Option 1: Using Vercel Dashboard (Recommended)

1. **Push your code to GitHub, GitLab, or Bitbucket**
   ```bash
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
   - Click "Add New..." → "Project"
   - Import your Git repository

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add `GEMINI_API_KEY` (if using Gemini features)
   - Add `APP_URL` (set to your Vercel domain)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project

#### Option 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from your project directory**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to your Vercel account
   - Select or create a project
   - Confirm settings

4. **Set environment variables**
   ```bash
   vercel env add GEMINI_API_KEY
   ```

### Deployment Configuration

The project includes a `vercel.json` configuration file that specifies:
- Node.js runtime for the Express server
- Build command to generate the Vite bundle
- Routing configuration for API endpoints and static files

### Post-Deployment

After successful deployment:
- Your app is available at `https://<project-name>.vercel.app`
- API endpoints are accessible at `https://<project-name>.vercel.app/api/*`
- Update `APP_URL` environment variable to your Vercel domain

### Troubleshooting Deployment

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version is 18+

**Environment variables not loading?**
- Make sure variables are added in Vercel settings
- Redeploy after adding/modifying variables
- Check that `.env` file is in `.gitignore`

**API endpoints returning 404?**
- Verify `server.ts` is correctly configured
- Check routing configuration in `vercel.json`
- Review Vercel function logs for errors

---

**Happy Hacking! 🎯**

