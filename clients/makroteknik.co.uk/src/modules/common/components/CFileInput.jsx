import React, { useState } from "react"

const CFileInput = ({ id, isAvailable, accept, onChange }) => {
    const [fileName, setFileName] = useState("No file chosen")

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFileName(file ? file.name : "No file chosen")

        // Call the passed onChange handler
        if (onChange) {
            onChange(e) // Pass the event to the parent
        }
    }

    return (
        <div>
            <label
                htmlFor={id}
                className="custom-file-label cursor-pointer px-4 py-2 bg-1 font-bold text-white"
            >
                {isAvailable ? "file exists! change file?" : "new file"}
            </label>
            <input
                id={id}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
            <span className="ml-4">{fileName}</span>
        </div>
    )
}

export default CFileInput
