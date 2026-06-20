import LiveSession from "../models/LiveSession.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import { createGoogleMeetEvent } from "../utils/googleMeet.js";

// CREATE LIVE SESSION
export const createLiveSession = async (req, res) => {
  try {
    const { title, student, scheduledAt } = req.body;

    // teacher comes from auth middleware
    const teacher = req.user._id;

    // generate unique room id

    const studentUser = await User.findById(student);

    if (!studentUser) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const { meetingLink, googleEventId } = await createGoogleMeetEvent({
      title,
      studentEmail: studentUser.email,
      scheduledAt,
    });

    const session = await LiveSession.create({
      title,
      teacher,
      student,
      scheduledAt,

      meetingLink,
      googleEventId,
    });
    if (studentUser) {
      await sendEmail({
        to: studentUser.email,

        subject: "New Live Session Scheduled",

        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New Live Session Scheduled</h2>

            <p>Hello ${studentUser.name},</p>

            <p>A new live session has been scheduled for you.</p>

            <p>
              <strong>Session:</strong> ${title}
            </p>

            <p>
              <strong>Date & Time:</strong>
              ${new Date(scheduledAt).toLocaleString()}
            </p>

            <p>Your Google Meet session has been created.</p>

            <p>
              <a href="${meetingLink}">
                Join Google Meet
              </a>
            </p>

            <br />

            <p>
              Regards,
              <br />
              Kapwa Connect
            </p>
          </div>
          `,
      });
    }

    res.status(201).json({
      success: true,
      message: "Live session created successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET TEACHER SESSIONS
export const getTeacherSessions = async (req, res) => {
  try {
    const teacherId = req.user._id;

    const sessions = await LiveSession.find({
      teacher: teacherId,
    })
      .populate("student", "name email")
      .sort({ scheduledAt: 1 });

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET STUDENT SESSIONS
export const getStudentSessions = async (req, res) => {
  try {
    const studentId = req.user._id;

    const sessions = await LiveSession.find({
      student: studentId,
    })
      .populate("teacher", "name email")
      .sort({ scheduledAt: 1 });

    res.status(200).json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE SESSION
export const getSingleSession = async (req, res) => {
  try {
    const session = await LiveSession.findById(req.params.id)
      .populate("teacher", "name email")
      .populate("student", "name email");

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE SESSION STATUS
export const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const session = await LiveSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    session.status = status;

    await session.save();

    res.status(200).json({
      success: true,
      message: "Session status updated",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMeetingLink = async (req, res) => {
  try {
    const { meetingLink } = req.body;

    const session = await LiveSession.findById(req.params.id).populate(
      "student",
      "name email",
    );

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    session.meetingLink = meetingLink;

    await session.save();

    // Send email to student
    await sendEmail({
      to: session.student.email,

      subject: "Live Session Meeting Link Added",

      html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Meeting Link Available</h2>

        <p>Hello ${session.student.name},</p>

        <p>Your live session meeting link has been added.</p>

        <a
          href="${meetingLink}"
          style="
            background:black;
            color:white;
            padding:10px 16px;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Join Session
        </a>

        <p>${meetingLink}</p>

        <br />

        <p>
          Regards,
          <br />
          Kapwa Connect
        </p>
      </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Meeting link added successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE LIVE SESSION

export const deleteLiveSession = async (req, res) => {
  try {
    const session = await LiveSession.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await session.deleteOne();

    res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
