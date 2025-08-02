export default function TableAdminView() {
    const sheetUrl =
        "https://docs.google.com/spreadsheets/d/1M8mOf279W5sCQ5Yd_bsY_IdVd7umR-UeTAGb6TDkrIw/edit?gid=0#gid=0"

    const handleApply = async () => {
        try {
            await axios.post(`${apiUrl}/product/apply`)
            alert(
                "Applying changes, please wait 3-5 minutes then reload the page."
            )
        } catch (err) {
            console.error("Apply failed", err)
            alert("Apply failed")
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                makroteknik.co.uk{" "}
                <span className="font-normal">Data Sheet Editor</span>
            </h1>

            <iframe
                src={sheetUrl}
                width="100%"
                height="600"
                style={{ border: "1px solid #ccc" }}
                allowFullScreen
            />

            <button
                onClick={handleApply}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-bold"
            >
                Apply Table into Site
            </button>
        </div>
    )
}
