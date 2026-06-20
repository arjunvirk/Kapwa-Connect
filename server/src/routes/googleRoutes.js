import express from "express";
import oauth2Client from "../config/googleCalender.js";

const router = express.Router();

// STEP 1 - Redirect to Google Consent Screen

router.get("/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",

    prompt: "consent",

    scope: ["https://www.googleapis.com/auth/calendar"],
  });

  res.redirect(authUrl);
});

// STEP 2 - Google Callback

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);

    console.log("\n==============================");
    console.log("GOOGLE REFRESH TOKEN");
    console.log(tokens.refresh_token);
    console.log("==============================\n");

    res.send(`
      <h2>Google Calendar Connected Successfully ✅</h2>
      <p>Check your terminal for the refresh token.</p>
    `);
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to generate refresh token");
  }
});

export default router;
