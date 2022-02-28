import { upload } from '../config/multerConfig.js';

const errorFile = (req, res) => {
    const error = upload.single('avatar');
    error(req, res, err => {
        if(err) return res.status(403).json(err);
    })  
}

export default errorFile;