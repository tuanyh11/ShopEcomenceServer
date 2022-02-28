import multer from 'multer';
import path from 'path';

const maxSize = 200 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: 'images/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix  + '-' + file.originalname );
    }
}) 

export const upload = multer({
    storage,
    limits: {fieldSize: maxSize},
    fileFilter: (req, file, cb)=> {
                const fileExtens = ['png', 'jpg', 'gif', 'eps'];
                const extend =  path.extname(file.originalname).slice(1);
                if(!fileExtens.includes(extend)) {  
                    return cb('goes wrong on the mimetype'); 
                }
                req.extendFile = path.extname(file.originalname);
                cb(null, true);
            }
})


