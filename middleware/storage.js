import multer, { diskStorage } from "multer";
import randomstring from "randomstring";
import path from "path";

const fileType = (file, cb) => {
  let allow = /jpeg|jpg|png|gif/;

  const isMatch = allow.test(path.extname(file.originalname).toLowerCase());

  const isMIME = allow.test(file.mimetype);

  if (isMIME && isMatch) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadFile = multer({
  //  storage disk and file detail
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/upload");
    },
    filename: (req, file, cb) => {
      let p1 = randomstring.generate(4);
      let p2 = randomstring.generate(4);

      let ext = path.extname(file.originalname).toLowerCase();

      cb(null, file.fieldname + "_" + p1 + p2 + ext);
    },
  }),

  limits: {
    fileSize: 1000000 * 2,
  },
  fileFilter: (req, file, cb) => {
    fileType(file, cb);
  },
}).single("profile");
