import multer from 'multer';
import AppError from '../utils/AppError.js';

// Store image in RAM as a memory buffer - NOT on the local disk
const storage = multer.memoryStorage();

// Validate file types (JPEG, PNG, WEBP, HEIC/HEIF)

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
    ]
    const allowedExtensions = /\.(jpe?g|png|webp|heic|heif)$/i;
    if(
        allowedMimeTypes.includes(file.mimetype) ||
        allowedExtensions.test(file.originalname)
    ) {
        cb(null,true);
    } else {
        cb (
            new AppError (
                'Invalid file format. Please upload a JPEG, PNG, WEBP, or HEIC image.',
                400
            ),
            false
        );
    }
};

// 10 MB maximum file size limit
export const uploadSareePhoto = multer({
    storage,
    limits: {
        fileSize: 10*1024*1024,
    },
    fileFilter,
})
.single('photo');
