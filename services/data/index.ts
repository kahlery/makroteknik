import readline from "readline"
import chalk from "chalk"

import dotenv from "dotenv"
dotenv.config()

import importGSheet from "./scripts/importGSheet"
import fetchImages from "./scripts/fetchImages"
import insertIntoDB from "./scripts/insertIntoDB"
import clearTemp from "./scripts/clearTemp"
import uploadImagesS3 from "./scripts/uploadImagesS3"

// --------------------------------------------------------------------

const executeWholeSequence = async () => {
    await clearTemp()

    await importGSheet()
    await fetchImages()

    await insertIntoDB()
    await uploadImagesS3()
}

const nameScriptPair: { [key: string]: () => Promise<void> } = {
    "1": importGSheet,
    "2": fetchImages,
    "3": insertIntoDB,
    "4": uploadImagesS3,
    e: executeWholeSequence,
    c: clearTemp,
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const displayMenu = () => {
    console.log(chalk.underline("🚀 Scripts Available:"))
    Object.entries(nameScriptPair).forEach(([key, script]) => {
        console.log(chalk.gray(` ${key}) ${script.name}`))
    })
    console.log(chalk.gray(" q) Quit"))
}

const promptUser = () => {
    displayMenu()
    rl.question(
        chalk.bgBlack.whiteBright("Choose an option: "),
        async (choice) => {
            if (choice === "q") {
                console.log(chalk.green("Exiting..."))
                rl.close()
                return
            }

            const script = nameScriptPair[choice]
            if (script) {
                try {
                    console.clear()
                    console.log(
                        chalk.bgBlack.whiteBright(
                            `running ${script.name}() ...`
                        )
                    )
                    console.log(
                        "--------------------------------------------------------------------"
                    )
                    await script()
                } catch (err) {
                    console.log(
                        chalk.red(`Error running script ${choice}: ${err}`)
                    )
                }
            } else {
                console.log(chalk.red("❌ Invalid choice. Try again."))
            }
            console.log(
                "--------------------------------------------------------------------"
            )
            promptUser()
        }
    )
}

// --------------------------------------------------------------------

promptUser()
