import fs from 'fs'

async function deleteFile(path: string) {
  return new Promise((resolve, reject): void => {
    fs.unlink(path, (error) => {
      if (error) {
        console.error('Error in shared/utils/deleteFile.ts')
        console.log(error)
        return error
      }
      resolve(true)
    })
  })
}

export default deleteFile
