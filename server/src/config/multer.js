import multer from "multer";

import path from "path";

// STORAGE

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/uploads/");
  },

  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// FILE FILTER

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".txt",
    ".jpg",
    ".jpeg",
    ".png",
  ];

  const ext = file.originalname
    .substring(file.originalname.lastIndexOf("."))
    .toLowerCase();

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
