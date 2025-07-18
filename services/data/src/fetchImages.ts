import fs from "fs"
import path from "path"
import ProgressBar from "progress"

const JSON_PATH = path.resolve("./temp/json/products.json")
const IMAGE_DIR = path.resolve("./temp/images")

if (!fs.existsSync(IMAGE_DIR)) {
    fs.mkdirSync(IMAGE_DIR, { recursive: true })
}

async function downloadImage(url: string, filename: string) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch image: ${url}`)

    const buffer = await res.arrayBuffer()
    const filePath = path.join(IMAGE_DIR, filename)
    await fs.promises.writeFile(filePath, Buffer.from(buffer))
}

export default async function fetchImages() {
    if (!fs.existsSync(JSON_PATH)) {
        throw new Error(
            `JSON file not found at ${JSON_PATH}. Please run importGSheet first.`
        )
    }

    const jsonData = await fs.promises.readFile(JSON_PATH, "utf8")
    const products = JSON.parse(jsonData)
    const productsWithImages = products.filter(
        (p: any) => p.original_image_url && p._id
    )

    const bar = new ProgressBar("Downloading images [:bar] :current/:total", {
        total: productsWithImages.length,
        width: 30,
        complete: "█",
        incomplete: "░",
    })

    for (const product of productsWithImages) {
        try {
            const extMatch = product.original_image_url.match(
                /\.(jpg|jpeg|png|gif|webp|bmp)$/i
            )
            const ext = extMatch ? extMatch[0] : ".jpg"
            const filename = `${product._id}${ext}`

            await downloadImage(product.original_image_url, filename)
        } catch (err) {
            console.error(
                `Error downloading image for product ID ${product._id}:`,
                err
            )
        }

        bar.tick()
    }
}
