const multer = require('multer')

module.exports = () => {
    const uploadFile = (req, res) => {
        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './uploadedFiles')
            },
            filename: function (req, file, callback) {
                callback(null, `${Date.now()}_${file.originalname}`)
            }
        })
        
        const upload = multer({ storage }).single('bugzUploadedFile')

        upload(req, res, err => {
            if (err) {
                return res.end('Ocorreu um erro.')
            }
            const filename = res.req.file.filename
            res.end(filename)
        })
    }

    return { uploadFile }
}