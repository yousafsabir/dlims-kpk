import multer from 'multer'
import path from 'path'
import mime from 'mime-types'
import { v4 as uuidV4 } from 'uuid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../public/images'))
  },
  filename: function (req, file, cb) {
    cb(null, uuidV4() + '.' + mime.extension(file.mimetype))
  },
})

const upload = multer({ storage: storage })
export default upload
