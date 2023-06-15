import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { mediaType, mediaFor } = req.params;
        const fileDir = path.join(
            __dirname,
            `../../public/uploads/${mediaType}/${mediaFor}/`,
        );
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true }, (err) => {
                throw Error(err);
            });
        }

        cb(null, `public/uploads/${mediaType}/${mediaFor}/`);
    },
    filename: (req, file, cb) => {
        const datetimestamp = Date.now();
        const filename = file.originalname.replace(/[^A-Z0-9.]/gi, '-');
        const fileArray = filename.split('.');
        const ext = fileArray.pop();
        cb(null, `${fileArray.join('-')}-${datetimestamp}.${ext}`);
    }
})

const upload = multer({
    storage,
    fileFilter:  (req, file, callback) => {
        const ext = path.extname(file.originalname);
        let fileFormats = [];
        if (req.params.mediaType === 'image') {
          fileFormats = ['.png', '.jpg', '.gif', '.jpeg'];
        } else if (req.params.mediaType === 'video') {
          fileFormats = ['.mp4', '.mov', '.wmv', '.mp4'];
        } else if (req.params.mediaType === 'audio') {
          fileFormats = ['.aac', '.m4a', '.mp3'];
        } else if (req.params.mediaType === 'file') {
          fileFormats = ['.pdf', '.doc', '.docx'];
        } else if (req.params.mediaType === 'media') {
          fileFormats = [
            '.png',
            '.jpg',
            '.gif',
            '.aac',
            '.m4a',
            '.mp3',
            '.jpeg',
            '.pdf',
            '.doc',
            '.docx',
            '.mp4',
            '.mov',
            '.wmv',
          ];
        }
        if (fileFormats.indexOf(ext.toLowerCase()) === -1) {
          return callback(
            new Error(`Allowed file format ${fileFormats.toString()}.`),
          );
        }
        callback(null, true);
      }
})

export default {
    uploadFiles() {
        upload.any('files')(req, res, (error) => {
            console.log(error);
        })
    }
}