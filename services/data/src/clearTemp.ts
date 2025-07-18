// clearTemp.js
import fs from "fs"
import path from "path"

const TEMP_DIR = path.resolve("./temp")

async function clearFilesInFolder(folder: string) {
    const entries = await fs.promises.readdir(folder, { withFileTypes: true })

    for (const entry of entries) {
        const fullPath = path.join(folder, entry.name)

        if (entry.isDirectory()) {
            await clearFilesInFolder(fullPath)
        } else if (entry.isFile()) {
            await fs.promises.unlink(fullPath)
            // console.log(`Deleted file: ${fullPath}`)
        }
    }
}

export default async function clearTemp() {
    if (!fs.existsSync(TEMP_DIR)) {
        console.warn(`Folder does not exist: ${TEMP_DIR}`)
        return
    }

    await clearFilesInFolder(TEMP_DIR)
    console.log(
        `Finished clearing files inside ${TEMP_DIR} but kept all folders.`
    )
}
