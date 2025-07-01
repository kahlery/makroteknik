import fs from "fs"
import path from "path"
import sharp from "sharp"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const BUCKET_NAME = process.env.S3_BUCKET_NAME
const IMAGE_DIR = path.resolve("./temp/images")

if (!BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME env variable is not defined")
}

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})

async function uploadImageToS3(buffer: Buffer, key: string) {
    const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: "images/" + key,
        Body: buffer,
        ContentType: "image/webp",
        ContentLength: buffer.length,
    }

    await s3Client.send(new PutObjectCommand(uploadParams))
}

export default async function uploadAllImages() {
    if (!fs.existsSync(IMAGE_DIR)) {
        throw new Error(`Image directory not found: ${IMAGE_DIR}`)
    }

    const files = await fs.promises.readdir(IMAGE_DIR)

    for (const filename of files) {
        const inputFilePath = path.join(IMAGE_DIR, filename)
        const baseName = path.parse(filename).name
        const webpFileName = baseName + ".webp"

        try {
            console.log(`Converting ${filename} to WebP...`)
            const webpBuffer = await sharp(inputFilePath)
                .webp({ quality: 80 }) // You can adjust quality here
                .toBuffer()

            console.log(
                `Uploading ${webpFileName} to S3 bucket ${BUCKET_NAME}...`
            )
            await uploadImageToS3(webpBuffer, webpFileName)
            console.log(`Uploaded ${webpFileName} successfully.`)
        } catch (err) {
            console.error(`Error processing ${filename}:`, err)
        }
    }
}
