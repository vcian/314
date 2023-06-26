import multer from 'multer';
import path from 'path';
export const setupMulter = () => {
  // Handle File uploads for auto-uploading.
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(path.resolve(__dirname, `../../../collector/hotdir`))
      const uploadOutput = path.resolve(__dirname, `../../../collector/hotdir`);
      cb(null, uploadOutput);
    },
    filename: function (_, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage,
  });
  return { handleUploads: upload };
};
