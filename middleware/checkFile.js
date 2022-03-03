import { upload } from '../config/multerConfig.js';

export const checkOneFile = (name) => {
    return (req, res, next) => {
        const check = upload.single(name);
        check(req, res, (err) => {
            if (err) return res.status(403).json(err);
            next();
        });
    }
}