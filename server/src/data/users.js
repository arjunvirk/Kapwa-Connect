import bcrypt from "bcryptjs";

const users = [
  {
    name: "Rho",
    email: "kapwaconnect.support@gmail.com",
    password: bcrypt.hashSync("kapwaconnect2026!*", 10),
    role: "teacher",
    isGoogleUser: false,
    isVerified: true,
  },
  {
    name: "Arjun Student",
    email: "asv0773@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "student",
    isGoogleUser: true,
    isVerified: true,
  },
];

export default users;
