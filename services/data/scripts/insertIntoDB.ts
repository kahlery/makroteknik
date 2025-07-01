import { MongoClient } from "mongodb"
import fs from "fs"
import path from "path"

const MONGO_URI = Bun.env.MONGO_URI
const JSON_PATH = path.resolve("./temp/json/products.json")

export default async function insertIntoDB() {
    if (!MONGO_URI) throw new Error("MONGO_URI is not defined")

    if (!fs.existsSync(JSON_PATH)) {
        throw new Error(
            `JSON file not found at ${JSON_PATH}. Please run importGSheet first.`
        )
    }

    const jsonData = await fs.promises.readFile(JSON_PATH, "utf8")
    const products = JSON.parse(jsonData)

    const client = new MongoClient(MONGO_URI)
    try {
        await client.connect()
        const db = client.db("makroteknik")
        const collection = db.collection("products_2")

        const result = await collection.bulkWrite(
            products.map((product: any) => ({
                updateOne: {
                    filter: { _id: product._id },
                    update: { $set: product },
                    upsert: true,
                },
            }))
        )

        console.log(
            `Bulk operation results: Matched ${result.matchedCount}, Modified ${result.modifiedCount}, Upserted ${result.upsertedCount}`
        )
    } catch (err) {
        console.error("Error inserting products into DB:", err)
    } finally {
        await client.close()
    }
}
