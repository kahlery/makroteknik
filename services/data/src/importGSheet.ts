import csv from "csvtojson"
import fs from "fs"
import path from "path"

const GSHEET_CSV_URI = Bun.env.GSHEET_CSV_URI
const JSON_DIR = path.resolve("./temp/json")
const JSON_PATH = path.join(JSON_DIR, "products.json")

export default async function importGSheet() {
    if (!GSHEET_CSV_URI) throw new Error("GSHEET_CSV_URI is not defined")

    // Ensure directory exists
    if (!fs.existsSync(JSON_DIR)) {
        fs.mkdirSync(JSON_DIR, { recursive: true })
    }

    const response = await fetch(GSHEET_CSV_URI)
    const csvText = await response.text()
    const jsonArray = await csv().fromString(csvText)

    jsonArray.forEach((product) => {
        // Convert is_priced to boolean
        if (typeof product.is_priced === "string") {
            const val = product.is_priced.trim().toLowerCase()
            product.is_priced = val === "true" || val === "yes"
        } else {
            product.is_priced = false
        }

        // Parse size_2_price string into an object
        if (
            typeof product.size_2_price === "string" &&
            product.size_2_price.trim() !== ""
        ) {
            const obj: Record<string, string> = {}
            product.size_2_price
                .split("\n")
                .forEach(
                    (pairStr: {
                        split: (arg0: string) => {
                            (): any
                            new (): any
                            map: {
                                (arg0: (s: any) => any): [any, any]
                                new (): any
                            }
                        }
                    }) => {
                        const [size, price] = pairStr
                            .split(" : ")
                            .map((s) => s.trim())
                        if (size && price) obj[size] = price
                    }
                )
            product.size_2_price = obj
        } else {
            product.size_2_price = {}
        }
    })

    // Save JSON array to file
    await fs.promises.writeFile(
        JSON_PATH,
        JSON.stringify(jsonArray, null, 2),
        "utf8"
    )

    console.log(jsonArray[0])
    console.log(`Saved JSON data to ${JSON_PATH}`)
}
