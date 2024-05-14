import * as categoryServices from "../service/category-service.js";

export const handleUpload = (req, res, next) => {
    console.log("masuk 2")
    const generatedFileName = req.file.filename;
    try {
        const result = {path : generatedFileName}
        res.status(200).json({
            data: result,
            message: "Create Success"
        });
    } catch (e) {
        next(e);
    }
};