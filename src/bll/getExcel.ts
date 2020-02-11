import multer from 'multer';

export const upload = multer({ // multer settings
    dest: 'excel',
    fileFilter: (req, file, callback) => { // file filter
        if (!file.originalname.match(/\.(xls|xlsx)$/)) {
            return callback(new Error('Please upload a excel file'));
        }
        callback(null, true);
    },
}).single('file');
