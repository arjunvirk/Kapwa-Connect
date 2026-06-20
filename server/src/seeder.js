import dotenv from "dotenv";

dotenv.config({
  path: "./server/.env",
});

import connectDB from "./config/db.js";

import users from "./data/users.js";
import homeworks from "./data/homeworks.js";
import mcqs from "./data/mcqs.js";
import crosswords from "./data/crosswords.js";
import fillBlanks from "./data/fillBlanks.js";
import wordMatches from "./data/wordMatches.js";
import liveSessions from "./data/liveSessions.js";

import User from "./models/User.js";
import Homework from "./models/Homework.js";
import MCQ from "./models/MCQ.js";
import MCQAttempt from "./models/MCQAttempt.js";
import Crossword from "./models/Crossword.js";
import FillBlank from "./models/FillBlank.js";
import WordMatch from "./models/WordMatch.js";
import LiveSession from "./models/LiveSession.js";

// CONNECT DATABASE

connectDB();

// IMPORT DATA

const importData = async () => {
  try {
    // CLEAR DATABASE

    await MCQAttempt.deleteMany();

    await LiveSession.deleteMany();

    await WordMatch.deleteMany();

    await FillBlank.deleteMany();

    await Crossword.deleteMany();

    await MCQ.deleteMany();

    await Homework.deleteMany();

    await User.deleteMany();

    // CREATE USERS

    const createdUsers = await User.insertMany(users);

    // TEACHER

    const teacherId = createdUsers[0]._id;

    // STUDENTS

    const studentIds = createdUsers.slice(1).map((student) => student._id);

    // CREATE HOMEWORK

    const sampleHomework = homeworks.map((homework) => ({
      ...homework,
      createdBy: teacherId,
      assignedTo: studentIds,
    }));

    await Homework.insertMany(sampleHomework);

    // CREATE MCQS

    const sampleMCQs = mcqs.map((mcq) => ({
      ...mcq,
      createdBy: teacherId,
      assignedTo: studentIds,
    }));

    await MCQ.insertMany(sampleMCQs);

    // CREATE CROSSWORDS

    const sampleCrosswords = crosswords.map((crossword) => ({
      ...crossword,
      createdBy: teacherId,
    }));

    await Crossword.insertMany(sampleCrosswords);

    // CREATE FILL BLANKS

    const sampleFillBlanks = fillBlanks.map((item) => ({
      ...item,
      createdBy: teacherId,
    }));

    await FillBlank.insertMany(sampleFillBlanks);

    // CREATE WORD MATCHES

    const sampleWordMatches = wordMatches.map((item) => ({
      ...item,
      createdBy: teacherId,
    }));

    await WordMatch.insertMany(sampleWordMatches);

    // CREATE LIVE SESSIONS

    const sampleLiveSessions = liveSessions.map((session, index) => ({
      ...session,
      teacher: teacherId,
      student: studentIds[index % studentIds.length],
    }));

    await LiveSession.insertMany(sampleLiveSessions);

    console.log("Data Imported!");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

// DESTROY DATA

const destroyData = async () => {
  try {
    await MCQAttempt.deleteMany();

    await LiveSession.deleteMany();

    await WordMatch.deleteMany();

    await FillBlank.deleteMany();

    await Crossword.deleteMany();

    await MCQ.deleteMany();

    await Homework.deleteMany();

    await User.deleteMany();

    console.log("Data Destroyed!");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

// RUN COMMAND

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
