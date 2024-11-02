import { useState } from "react"
import { useProductStore } from "../../Products/stores/ProductStore"

export const Panel = () => {
    // Stores
    const productsList = useProductStore((s) => s.productsList)
    const categoriesList = useProductStore((s) => s.categoriesList)
    const postProduct = useProductStore((s) => s.postProduct)
    const patchProduct = useProductStore((s) => s.patchProduct)
    const deleteProduct = useProductStore((s) => s.deleteProduct)

    // State to hold the current product being edited or created
    const [currentProduct, setCurrentProduct] = useState({
        _id: null,
        title: "",
        categoryId: 0,
        image: "",
        productCode: "",
        sizeToPrice: [],
        description: "",
        pdf: null,
    })

    // State to control whether the form is visible for editing/adding
    const [isEditing, setIsEditing] = useState(false)

    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState("")

    // State to hold new size and price inputs
    const [sizeInput, setSizeInput] = useState("")
    const [priceInput, setPriceInput] = useState("")

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCurrentProduct({ ...currentProduct, [name]: value })
    }

    // Handle image upload and convert to base64
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setCurrentProduct((prevProduct) => ({
                ...prevProduct,
                image: reader.result, // Base64 string
            }))
        }
        if (file) {
            reader.readAsDataURL(file) // Convert to base64
        }
    }

    // Handle adding a new size-price pair
    const handleAddSizePrice = () => {
        if (sizeInput && priceInput) {
            const newSizePrice = { [sizeInput]: priceInput }
            setCurrentProduct((prevProduct) => ({
                ...prevProduct,
                sizeToPrice: [...prevProduct.sizeToPrice, newSizePrice],
            }))
            setSizeInput("") // Reset size input
            setPriceInput("") // Reset price input
        }
    }

    // Handle removing a size-price pair
    const handleRemoveSizePrice = (index) => {
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            sizeToPrice: prevProduct.sizeToPrice.filter(
                (_, idx) => idx !== index
            ),
        }))
    }

    // Handle saving the product (either update or add)
    const handleSaveProduct = () => {
        if (currentProduct._id) {
            patchProduct(currentProduct._id, currentProduct)
        } else {
            postProduct(currentProduct)
        }
        // Reset form and state after saving
        setIsEditing(false)
        setCurrentProduct({
            _id: null,
            title: "",
            categoryId: 0,
            image: "",
            productCode: "",
            sizeToPrice: [],
            description: "",
            pdf: null,
        })
    }

    // Handle editing a product
    const handleEditProduct = (product) => {
        setCurrentProduct(product)
        setIsEditing(true)
        setSizeInput("") // Reset size input on edit
        setPriceInput("") // Reset price input on edit
    }

    // Handle deleting a product
    const handleDeleteProduct = (id) => {
        deleteProduct(id)
    }

    // handle PDF upload
    const handlePDFChange = (e) => {
        const file = e.target.files[0]
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            pdf: file,
        }))
    }

    // Filter products based on search query
    const filteredProducts = productsList.filter(
        (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    )

    return (
        <div className="relative w-screen flex flex-wrap bg-gray-200 py-16 h-full">
            {/* Top Bar */}
            <div className="pl-16 fixed flex gap-12 top-0 left-0 w-full bg-white p-4 border z-10 shadow-xl">
                <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-72 px-2 py-1 border-b-2 border-primary placeholder:text-primary"
                />
                <div className="flex gap-8 mx-auto">
                    <button className="text-primary">Products</button>
                    <button className="text-primary">Categories</button>
                    <button className="text-primary">News</button>
                </div>
            </div>

            {/* List of products */}
            <div className="flex flex-row w-screen flex-wrap mt-16 gap-12 px-12">
                {filteredProducts.map((v) => (
                    <div
                        key={v._id}
                        className="w-[600px] h-[400px] overflow-y-scroll border rounded-lg p-8 bg-white shadow-xl"
                    >
                        <div className="flex-col flex gap-4">
                            <div className="relative">
                                <div className="absolute flex gap-2 top-0 right-0">
                                    {/* Edit and Delete buttons */}
                                    <button
                                        className="bg-primary text-white px-2 py-1 rounded"
                                        onClick={() => handleEditProduct(v)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleDeleteProduct(v._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                                <img
                                    src={v.image}
                                    alt={v.title}
                                    className="w-24 mx-auto object-scale-down h-fit rounded-lg mb-4"
                                />
                                <h3 className="text-primary font-bold">
                                    Title:
                                </h3>
                                <h3 className="line-clamp-1">{v.title}</h3>
                                <hr className="border-black border-opacity-20 my-2" />
                                <h3 className="text-primary font-bold">
                                    Product Code:
                                </h3>
                                <p>{v.productCode}</p>
                                <hr className="border-black border-opacity-20 my-2" />
                                <h3 className="text-primary font-bold">
                                    Description:
                                </h3>
                                <p className="line-clamp-3">{v.description}</p>
                                <hr className="border-black border-opacity-20 my-2" />
                                <h3 className="text-primary font-bold">
                                    Size & Price:
                                </h3>
                                <ul>
                                    {v.sizeToPrice.map((sizePrice, idx) => (
                                        <li key={idx}>
                                            {`${Object.keys(sizePrice)[0]} - ${
                                                Object.values(sizePrice)[0]
                                            }`}
                                            <button
                                                className="text-red-500 ml-2"
                                                onClick={() =>
                                                    handleRemoveSizePrice(idx)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Form for adding/updating a product */}
            {isEditing && (
                <div className="bg-gray-100 border-black border-4 p-4 fixed bottom-0 left-0 w-1/2">
                    <h3>
                        {currentProduct._id
                            ? "Edit Product"
                            : "Add New Product"}
                    </h3>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="title"
                            value={currentProduct.title}
                            onChange={handleInputChange}
                            placeholder="Product Title"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="productCode"
                            value={currentProduct.productCode}
                            onChange={handleInputChange}
                            placeholder="Product Code"
                            className="border p-2 rounded"
                        />
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handlePDFChange}
                            className="border p-2 rounded"
                        />
                        {/* dropdown to select category */}
                        <select
                            name="categoryId"
                            value={currentProduct.categoryId}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        >
                            <option value={0}>Select Category</option>
                            {/* Map over categories to create options */}
                            {categoriesList.map((category) => (
                                <option
                                    key={category.categoryId}
                                    value={category.categoryId}
                                >
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <input
                            type="file" // File input for image upload
                            accept="image/*"
                            onChange={handleImageChange} // Change handler for file
                            className="border p-2 rounded"
                        />
                        <textarea
                            name="description"
                            value={currentProduct.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            className="border h-64 p-2 rounded"
                        />
                        {/* Inputs for size and price */}
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={sizeInput}
                                onChange={(e) => setSizeInput(e.target.value)}
                                placeholder="Size (e.g., 450mm)"
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                                placeholder="Price (e.g., £810.00 ex vat)"
                                className="border p-2 rounded"
                            />
                            <button
                                type="button"
                                className="bg-primary text-white px-4 py-2 rounded"
                                onClick={handleAddSizePrice}
                            >
                                Add Size/Price
                            </button>
                        </div>
                        {/* Buttons to save or cancel */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="bg-primary text-white px-4 py-2 rounded"
                                onClick={handleSaveProduct}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Add new product button */}
            <button
                className="bg-primary text-white px-4 py-2 rounded fixed right-2 bottom-4"
                onClick={() => {
                    setIsEditing(true)
                    setCurrentProduct({
                        _id: null,
                        title: "",
                        categoryId: 0,
                        image: "",
                        productCode: "",
                        sizeToPrice: [],
                        description: "",
                        pdf: null,
                    })
                    setSizeInput("") // Reset size input
                    setPriceInput("") // Reset price input
                }}
            >
                Add New Product
            </button>
        </div>
    )
}
