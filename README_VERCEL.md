# Vercel Backend Setup for One4Health

This project is now configured to run a backend on Vercel while keeping the frontend on Shopify.

## How to Finish Setup

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2.  **Import Project**: 
    *   Click "Add New" -> "Project".
    *   Select your `one4health-website-new` repository.
3.  **Configure Project**:
    *   **Framework Preset**: Select "Vite" (it should auto-detect).
    *   **Root Directory**: Leave as `./`.
4.  **Environment Variables**:
    *   If you want the backend to talk to Supabase, add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel project settings (under Settings -> Environment Variables).
5.  **Deploy**: Click "Deploy".

## Your API Endpoints

Once deployed, your backend will be at `https://your-project-name.vercel.app/api/...`

*   **Health Check**: `https://your-project-name.vercel.app/api/health`
*   **Adding more logic**: Simply add new `.ts` files to the `api/` folder.

## Using the Backend in React

To call your new backend from your website, you can use `fetch`:

```javascript
const response = await fetch('https://your-project-name.vercel.app/api/health');
const data = await response.json();
console.log(data.message); // "One4Health Backend is live!"
```
