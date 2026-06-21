import { google } from "googleapis";
import oauth2Client from "../config/googleCalender.js";

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client,
});

export const createGoogleMeetEvent = async ({
  title,
  studentEmail,
  scheduledAt,
}) => {
  const startTime = new Date(scheduledAt);

  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  // DEBUG LOGS

  console.log("scheduledAt:", scheduledAt);
  console.log("date:", new Date(scheduledAt));
  console.log("iso:", new Date(scheduledAt).toISOString());
  const event = await calendar.events.insert({
    calendarId: "primary",

    conferenceDataVersion: 1,

    requestBody: {
      summary: title,

      start: {
        dateTime: startTime.toISOString(),
        timeZone: "Asia/Manila",
      },

      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Asia/Manila",
      },

      attendees: [
        {
          email: studentEmail,
        },
      ],

      conferenceData: {
        createRequest: {
          requestId: Date.now().toString(),
        },
      },
    },
  });

  return {
    meetingLink: event.data.hangoutLink,
    googleEventId: event.data.id,
  };
};
