# Shambhavaa Blog

This site includes a small newsletter backend.

## Start The Site

```bash
npm install
cp .env.example .env
npm start
```

Open `http://localhost:3000`.

The newsletter form saves subscribers to `data/subscribers.json`.

## Send A New Post Notification

After adding or publishing a post, send an email notification to all subscribers:

```bash
curl -X POST http://localhost:3000/api/notify-post \
  -H "Content-Type: application/json" \
  -H "x-admin-token: change-this-secret-token" \
  -d '{
    "title": "Your post title",
    "url": "https://www.shambhavaa.com/your-post",
    "excerpt": "A short summary of the new post."
  }'
```

Before using this live, update `.env` with real SMTP details and a private `ADMIN_TOKEN`.
