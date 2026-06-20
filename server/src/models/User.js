import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },

    // GOOGLE AUTH
    avatar: {
      type: String,
      default: "",
    },

    isGoogleUser: {
      type: Boolean,
      default: false,
    },

    // PASSWORD OPTIONAL FOR GOOGLE USERS
    password: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },

    // RESET PASSWORD
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpire: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

// HASH PASSWORD BEFORE SAVE
userSchema.pre("save", async function () {
  if (!this.password) {
    return;
  }

  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// MATCH PASSWORD
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) {
    return false;
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
