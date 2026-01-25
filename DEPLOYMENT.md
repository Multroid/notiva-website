# Notiva Marketing Website - AWS Amplify Deployment Guide

This guide covers deploying the Notiva marketing website to AWS Amplify.

## Prerequisites

- AWS Account with Amplify access
- GitHub repository access (Multroid/notiva-website)
- Domain configured in Route 53 or your DNS provider

## Deployment Steps

### 1. Create New Amplify App

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click **"New app"** → **"Host web app"**
3. Select **GitHub** as your repository provider
4. Authenticate and select:
   - Repository: `Multroid/notiva-website`
   - Branch: `dev` (or `main` for production)

### 2. Configure Build Settings

Amplify should auto-detect the `amplify.yml` file. Verify the settings:

```yaml
App root directory: /
Build command: npm run build
Start command: (leave empty - Amplify handles this)
```

**Build specification file:** `amplify.yml` (already configured in repo)

### 3. Configure Environment Variables

In the Amplify Console, go to **App settings → Environment variables** and add:

#### Required Variables

```bash
# Application URLs
NEXT_PUBLIC_MARKETING_URL=https://notiva.de
NEXT_PUBLIC_CONSUMER_APP_URL=https://app.notiva.de

# NextAuth
NEXTAUTH_URL=https://notiva.de
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
COOKIE_DOMAIN=.notiva.de

# Email
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=noreply@notiva.de

# Database (if needed)
DATABASE_URL=<your-supabase-connection-string>
DIRECT_URL=<your-supabase-direct-connection-string>
```

#### Optional Variables

```bash
# Stripe (if marketing handles payments)
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=<your-ga-id>
```

**To generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Advanced Settings

#### Build Settings
- **Node.js version:** 20 (configured in package.json engines)
- **Build timeout:** 30 minutes (default is fine)
- **Live package updates:** Enabled

#### Monitoring
- Enable **CloudWatch Logs** for better debugging
- Set up **Alarms** for 4xx/5xx errors

#### Performance
- Enable **Performance mode** for better caching
- CDN caching is automatic with Amplify

### 5. Custom Domain Configuration

1. In Amplify Console, go to **Domain management**
2. Click **Add domain**
3. Enter your domain: `notiva.de`
4. Amplify will provide DNS records to add

#### DNS Configuration

If using Route 53:
- Amplify auto-configures DNS records

If using external DNS:
- Add the CNAME/A records provided by Amplify
- Wait for DNS propagation (up to 48 hours)

#### Subdomain Configuration

For `www.notiva.de`:
- Amplify automatically adds www subdomain
- Configure redirect: `www.notiva.de` → `notiva.de`

### 6. SSL Certificate

Amplify automatically provisions SSL certificates via AWS Certificate Manager (ACM):
- Free SSL/TLS certificates
- Auto-renewal
- No configuration needed

### 7. Deploy

1. Click **Save and deploy**
2. Monitor the build logs in real-time
3. Build typically takes 5-10 minutes

### 8. Verify Deployment

Once deployed, test:
- ✅ Homepage loads: `https://notiva.de`
- ✅ SSL certificate is valid (green padlock)
- ✅ All pages are accessible
- ✅ Redirects work (login, register redirect to consumer app)
- ✅ Images and assets load correctly

## Continuous Deployment

Amplify automatically deploys when you push to the configured branch:

- **Push to `dev` branch** → Automatic deployment
- **Preview environments** can be configured for PRs
- **Manual deployments** can be triggered from Amplify Console

## Branch Deployments

### Production (main branch)
- Branch: `main`
- Domain: `notiva.de`
- Environment: Production

### Staging (dev branch)
- Branch: `dev`
- Domain: `dev.notiva.de` (or custom subdomain)
- Environment: Development

### Feature Branches (optional)
Enable **Preview deployments** to auto-deploy feature branches with unique URLs.

## Monitoring & Logs

### Access Logs
1. Go to **Amplify Console → Your App → Monitoring**
2. View:
   - Build logs
   - Access logs (CloudWatch)
   - Error rates
   - Performance metrics

### CloudWatch Logs
- Navigate to **CloudWatch → Log groups**
- Look for: `/aws/amplify/notiva-website`

## Troubleshooting

### Build Failures

**Error: Node version mismatch**
```bash
Solution: Verify package.json has:
"engines": {
  "node": ">=20 <25"
}
```

**Error: npm ci fails**
```bash
Solution: Use --legacy-peer-deps flag (already in amplify.yml)
```

**Error: Out of memory**
```bash
Solution: Add to amplify.yml preBuild:
- export NODE_OPTIONS="--max-old-space-size=4096"
```

### Runtime Errors

**Error: Environment variables not working**
- Verify variables are set in Amplify Console
- Rebuild the app after adding variables
- Check variable names match next.config.ts

**Error: 404 on routes**
- Verify Next.js is using App Router (not Pages Router)
- Check rewrites/redirects in next.config.ts

### Performance Issues

**Slow page loads**
- Enable Amplify Performance mode
- Verify images are optimized
- Check Next.js build output for large bundles

## Cost Estimation

AWS Amplify pricing (as of 2024):

- **Build minutes:** $0.01 per minute
- **Hosting:** $0.15 per GB served
- **Requests:** First 1M requests/month free, then $0.30 per 1M

**Typical monthly costs for small-medium traffic:**
- Builds: ~$5-10 (10-20 builds/month)
- Hosting: ~$5-15 (50-100 GB/month)
- Total: ~$10-25/month

## Security Best Practices

1. ✅ **Never commit .env files** - Use Amplify Console for secrets
2. ✅ **Rotate secrets regularly** - Update NEXTAUTH_SECRET, API keys
3. ✅ **Use least privilege IAM** - Limit Amplify service role permissions
4. ✅ **Enable WAF** (optional) - Add AWS WAF for DDoS protection
5. ✅ **Monitor logs** - Set up CloudWatch alarms for errors

## Rollback

If a deployment breaks production:

1. Go to **Amplify Console → Deployments**
2. Find the last working deployment
3. Click **Redeploy this version**

## Additional Resources

- [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- [Next.js on Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/server-side-rendering-amplify.html)
- [Amplify CLI Reference](https://docs.amplify.aws/cli/)

## Support

For deployment issues:
- Check Amplify build logs first
- Review CloudWatch logs
- Contact AWS Support (if using paid plan)
- Internal team: Slack #devops or #infrastructure
