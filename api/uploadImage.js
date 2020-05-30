const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
const aws = require('aws-sdk')

aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
})

module.exports = () => {
    const uploadFile = (req, res) => {
        const s3 = new aws.S3()

        fileFilter = (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
            if(!allowedTypes.includes(file.mimetype)) {
                const error = new Error("Formato inválido")
                error.code = 'LIMIT_FILE_TYPES'
                return cb(error, false)
            }
            return cb(null, true)
        }

        const storage = multer.diskStorage({
            destination:  (req, file, cb) => {
                cb(null, './uploadedFilesTEMP')
            },
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}_${file.originalname}`)
            },

        })
        
        // 10MB
        const MAX_SIZE =10000000

        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: MAX_SIZE
            }
        }).single('bugzUploadedFile')

        upload(req, res, err => {
            if(err) {
                if(err.code === 'LIMIT_FILE_TYPES'){
                    res.status(422).json({
                        error: "Somente imagens no formato jpg, png e gif são aceitas"
                    })
                    return
                }

                if(err.code === 'LIMIT_FILE_SIZE'){
                    res.status(422).json({
                        error: `Imagem excedeu limite de ${MAX_SIZE/1000000}MB`
                    })
                    return
                }
            }

            sharp(req.file.path)
                .resize({
                    height: 600, // a largura vai proporcional
                    fit: 'contain',
                    background: {
                        r: 0,
                        g: 0,
                        b: 0,
                        alpha: 1
                    }
                })
                .toBuffer()
                .then(buffer => {
                    s3.upload({
                        Bucket: "bugz",
                        Key: `${Date.now()}-${req.file.originalname}`,
                        Body: buffer,
                        ACL: "public-read"
                    })
                    .promise()
                    .then(S3Response => {
                        fs.unlink(req.file.path, () => {
                            res.json({ file: S3Response.Location})
                        })
                    })
                    .catch(error => {
                        res.status(422).json({ error })
                    })
                })
        })
    }

    return { uploadFile }
}