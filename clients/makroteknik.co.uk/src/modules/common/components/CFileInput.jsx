import React, { useState } from "react"

const CFileInput = ({ id, isAvailable, accept }) => {
    const [fileName, setFileName] = useState("No file chosen")

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFileName(file ? file.name : "No file chosen")
    }

    return (
        <div>
            <label
                htmlFor="file-upload"
                className="custom-file-label cursor-pointer px-4 py-2 bg-black font-bold text-white"
            >
                {isAvailable ? "file exists/change file" : "new file"}
            </label>
            <input
                id={id}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
            />
            <span className="ml-4 text-gray-700">{fileName}</span>
        </div>
    )
}

export default CFileInput
