# Notiva Marketing Website

The official marketing website for Notiva - Your intelligent document and notification management platform.

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui
- **Animations:** Framer Motion, GSAP
- **Deployment:** AWS Amplify
- **Database:** Prisma + PostgreSQL (Supabase)

## 📦 Project Structure

```
notiva-website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (main)/       # Marketing pages
│   │   ├── (auth)/       # Auth pages (redirects to consumer app)
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   │   └── ui/           # shadcn/ui components
│   └── lib/              # Utilities and helpers
├── public/               # Static assets
├── amplify.yml           # AWS Amplify build config
├── next.config.ts        # Next.js configuration
└── package.json          # Dependencies
```

## 🛠️ Development

### Prerequisites

- Node.js 20 or higher
- npm 10 or higher

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your values
```

### Running Locally

```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

The app runs on `http://localhost:3001`

## 🌍 Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `NEXT_PUBLIC_MARKETING_URL` - Marketing website URL
- `NEXT_PUBLIC_CONSUMER_APP_URL` - Consumer app URL (for auth redirects)
- `NEXTAUTH_URL` - NextAuth base URL
- `NEXTAUTH_SECRET` - NextAuth secret (generate with `openssl rand -base64 32`)

## 📤 Deployment

This website is deployed to AWS Amplify. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to AWS Amplify

1. Connect your GitHub repository to Amplify
2. Select the `dev` or `main` branch
3. Amplify auto-detects `amplify.yml` configuration
4. Add environment variables in Amplify Console
5. Deploy!

### Automatic Deployments

Pushing to the configured branch triggers automatic deployments:
- `main` branch → Production (`notiva.de`)
- `dev` branch → Staging/Dev environment

## 🔗 Key Routes

- `/` - Homepage
- `/features/*` - Feature pages
- `/pricing` - Pricing page
- `/compare` - Comparison with competitors
- `/about/*` - About pages
- `/login` → Redirects to consumer app
- `/register` → Redirects to consumer app

## 🎨 Features

- ✅ Server-side rendering (SSR)
- ✅ Optimized images and assets
- ✅ SEO-friendly
- ✅ Responsive design
- ✅ Security headers configured
- ✅ Performance optimized
- ✅ Analytics ready
- ✅ Cross-subdomain authentication

## 🔒 Security

- Security headers configured in `amplify.yml`
- HTTPS enforced
- CSRF protection via NextAuth
- Environment variables securely managed in Amplify
- No sensitive data in repository

## 📊 Monitoring

- Build logs: AWS Amplify Console
- Runtime logs: CloudWatch
- Performance: Amplify Performance mode
- Analytics: Google Analytics (optional)

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## 📝 Contributing

This is the marketing website repository. For the main application, see the `notiva-consumer` repository.

### Submodule Setup

This repository is used as a git submodule in the main Notiva monorepo. To update the parent repo with changes:

```bash
# In parent repo
cd ../
git submodule update --remote notiva-website
git add notiva-website
git commit -m "chore: update notiva-website submodule"
git push
```

## 📞 Support

For questions or issues with deployment:
- Internal team: #devops or #infrastructure Slack channels
- AWS Amplify: Check build logs in Amplify Console
- Runtime issues: Check CloudWatch logs

## 📄 License

Private - All rights reserved by Notiva/Multroid
