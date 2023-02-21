import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

export default {
  upload(folder: string) {
    try {
      return {
        storage: multer.diskStorage({
          destination: resolve(__dirname, '..', '..', folder),
          filename: (request, file, callback) => {
            console.log('uploading');
            const fileHash = crypto.randomBytes(16).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
          },
        }),
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
