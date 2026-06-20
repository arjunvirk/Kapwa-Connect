import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

// LOGIN USER

export const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message:
          "This account does not have a password yet. Please login with Google first.",
      });
    }

    if (await user.matchPassword(password)) {
      // CHECK EMAIL VERIFICATION

      if (!user.isVerified) {
        return res.status(401).json({
          message: "Please verify your email first",
        });
      }

      generateToken(res, user._id);

      res.status(200).json({
        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        isGoogleUser: user.isGoogleUser,
      });
    } else {
      res.status(401);

      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// REGISTER USER

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "student",
      isVerified: false,
    });

    // GENERATE VERIFICATION TOKEN

    const verificationToken = crypto.randomBytes(20).toString("hex");

    // HASH TOKEN

    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    // SAVE TOKEN

    user.emailVerificationToken = hashedToken;

    user.emailVerificationExpire = Date.now() + 60 * 60 * 1000;

    await user.save();

    // VERIFY URL

    const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

    // EMAIL MESSAGE

    const message = `
Welcome to Kapwa Connect!

Please verify your email by clicking the link below:

${verifyUrl}

This link expires in 1 hour.
`;

    // SEND EMAIL

    await sendEmail({
      email: user.email,
      subject: "Verify Your Email",
      message,
    });

    res.status(201).json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

// VERIFY EMAIL

export const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token;

    // HASH TOKEN

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // VERIFY USER

    user.isVerified = true;

    user.emailVerificationToken = undefined;

    user.emailVerificationExpire = undefined;

    await user.save();

    // LOGIN USER

    generateToken(res, user._id);

    res.status(200).json({
      message: "Email verified successfully",

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      isGoogleUser: user.isGoogleUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Email verification failed",
    });
  }
};

// LOGOUT USER

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User logged out",
    });
  } catch (error) {
    next(error);
  }
};

// GET USER PROFILE

export const getUserProfile = (req, res, next) => {
  try {
    const user = {
      _id: req.user._id,

      name: req.user.name,

      email: req.user.email,

      role: req.user.role,

      isGoogleUser: req.user.isGoogleUser,
    };

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE USER PROFILE

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;

      user.email = req.body.email || user.email;

      user.role = req.body.role || user.role;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      generateToken(res, updatedUser._id);

      res.status(200).json({
        _id: updatedUser._id,

        name: updatedUser.name,

        email: updatedUser.email,

        role: updatedUser.role,

        isGoogleUser: updatedUser.isGoogleUser,
      });
    } else {
      res.status(404);

      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

// GET STUDENTS

export const getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: "student" }).select("name email");

    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE STUDENT

export const getStudentById = async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id).select("-password");

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        message: "User is not a student",
      });
    }

    res.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// UPDATE STUDENT
export const updateStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        message: "User is not a student",
      });
    }

    // ONLY ALLOW NAME UPDATE

    student.name = req.body.name || student.name;

    // OPTIONAL PASSWORD UPDATE

    if (req.body.password) {
      student.password = req.body.password;
    }

    const updatedStudent = await student.save();

    res.status(200).json({
      message: "Student updated successfully",

      student: {
        _id: updatedStudent._id,

        name: updatedStudent.name,

        email: updatedStudent.email,

        role: updatedStudent.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE STUDENT

export const deleteStudent = async (req, res, next) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        message: "User is not a student",
      });
    }

    await student.deleteOne();

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// FORGOT PASSWORD

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // GENERATE RESET TOKEN

    const resetToken = crypto.randomBytes(20).toString("hex");

    // HASH TOKEN

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // SAVE TOKEN

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    // RESET URL

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
You requested a password reset.

Click the link below to reset your password:

${resetUrl}

If you did not request this email, please ignore it.
`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });

    res.status(200).json({
      message: "Reset email sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD

export const resetPassword = async (req, res, next) => {
  try {
    const resetToken = req.params.token;

    // HASH TOKEN

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,

      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    // UPDATE PASSWORD

    user.password = req.body.password;

    // CLEAR RESET FIELDS

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
};

// 1 AUTH

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    const { credential, role } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,

      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        isGoogleUser: true,
        isVerified: true,
        role,
      });
    } else {
      user.isGoogleUser = true;

      if (!user.avatar) {
        user.avatar = picture;
      }

      await user.save();
    }

    jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    generateToken(res, user._id);

    res.status(200).json({
      success: true,

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

      avatar: user.avatar,

      isGoogleUser: user.isGoogleUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Google authentication failed",
    });
  }
};

export const checkVerificationStatus = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        verified: false,
      });
    }

    if (user.isVerified) {
      generateToken(res, user._id);

      return res.status(200).json({
        verified: true,

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isGoogleUser: user.isGoogleUser,
        },
      });
    }

    res.status(200).json({
      verified: false,
    });
  } catch (error) {
    res.status(500).json({
      verified: false,
    });
  }
};
