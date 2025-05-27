import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import fs from 'fs';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dlfhckrea',
  api_key: '365394174322742',
  api_secret: config.cloudnary_api,
});

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName,
      },
      function (err, result) {
        if (err) {
          reject(err);
        }
        console.log({ result });
        resolve(result);
        fs.unlink(path, (err) => {
          if (err) {
            console.log({ err });
          } else {
            console.log('File is deleted');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
