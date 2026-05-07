import "dotenv/config";
import express from "express";
import { promises as fs } from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 3000;
const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");
const subscribersFile = path.join(dataDir, "subscribers.json");

app.use(express.json());
app.use(express.static(rootDir));

async function readSubscribers() {
  try {
    const data = await fs.readFile(subscribersFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveSubscribers(subscribers) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(subscribersFile, JSON.stringify(subscribers, null, 2));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createTransporter() {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing mail settings: ${missing.join(", ")}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

app.post("/api/subscribe", async (request, response) => {
  const email = String(request.body.email || "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return response.status(400).json({ error: "Please enter a valid email address." });
  }

  const subscribers = await readSubscribers();
  const exists = subscribers.some((subscriber) => subscriber.email === email);

  if (!exists) {
    subscribers.push({ email, subscribedAt: new Date().toISOString() });
    await saveSubscribers(subscribers);
  }

  response.json({ message: "Subscribed. You will receive new post notifications." });
});

app.post("/api/notify-post", async (request, response) => {
  if (!process.env.ADMIN_TOKEN || request.header("x-admin-token") !== process.env.ADMIN_TOKEN) {
    return response.status(401).json({ error: "Unauthorized." });
  }

  const title = String(request.body.title || "").trim();
  const url = String(request.body.url || "").trim();
  const excerpt = String(request.body.excerpt || "").trim();

  if (!title || !url) {
    return response.status(400).json({ error: "Post title and URL are required." });
  }

  const subscribers = await readSubscribers();
  if (subscribers.length === 0) {
    return response.json({ message: "No subscribers yet.", sent: 0 });
  }

  const transporter = createTransporter();
  const recipients = subscribers.map((subscriber) => subscriber.email);

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    bcc: recipients,
    subject: `New from Shambhavaa: ${title}`,
    text: `${title}\n\n${excerpt}\n\nRead here: ${url}`,
    html: `
      <h1>${title}</h1>
      ${excerpt ? `<p>${excerpt}</p>` : ""}
      <p><a href="${url}">Read the new Shambhavaa post</a></p>
    `,
  });

  response.json({ message: "Notification sent.", sent: recipients.length });
});

app.listen(port, () => {
  console.log(`Shambhavaa blog running at http://localhost:${port}`);
});
