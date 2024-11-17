import { useState } from "react"
import { useProductStore } from "../../product/stores/ProductStore"

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
        categoryID: 0,
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
    const [isAddNewNorEdit, setIsAddNewNorEdit] = useState(false)

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
            categoryID: 0,
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
        <div className="relative w-screen flex flex-wrap bg-gray-200 py-16 h-full min-h-screen">
            {/* Navbar */}
            <div
                className="px-[5%] fixed flex justify-between gap-12 top-0 left-0 w-full items-center
             bg-primary p-4 border z-10 border-black border-opacity-20"
            >
                <h1 className="text-lg font-bold text-white">
                    makroteknik.co.uk/admin
                </h1>
                <div className="flex gap-8">
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-72 px-4 py-1 border rounded-full border-opacity-100 border-primary placeholder:text-primary placeholder:text-opacity-60"
                    />
                    <button className="text-white font-bold">products</button>
                    <button className="text-white font-bold">categories</button>
                    <button className="text-white font-bold">posts</button>
                </div>
            </div>

            {/* List of products */}
            <div className="flex flex-row w-screen flex-wrap mt-16 gap-12 px-[5%]">
                {filteredProducts.map((v) => (
                    <div
                        key={v._id}
                        className="w-[300px] h-[500px] text-black text-opacity-60  border-black border-opacity-20 border p-4 rounded-xl bg-white "
                    >
                        <div className="flex-col flex gap-4">
                            <div className="relative">
                                <div className="absolute flex flex-col gap-2 right-0">
                                    {/* Edit and Delete buttons */}
                                    <button
                                        className="bg-primary text-white px-4 py-2 rounded-full font-bold   "
                                        onClick={() => handleEditProduct(v)}
                                    >
                                        edit
                                    </button>
                                    <button
                                        className="bg-rose-600 text-white px-4 py-2 rounded-full font-bold"
                                        onClick={() =>
                                            handleDeleteProduct(v._id)
                                        }
                                    >
                                        delete
                                    </button>
                                </div>
                                <img
                                    src={v.image}
                                    alt={v.title}
                                    className="w-36 object-scale-down h-fit rounded-lg mb-8"
                                />
                                <h3 className="text-primary font-bold">
                                    title:
                                </h3>
                                <h3 className="line-clamp-1">{v.title}</h3>
                                <hr className="border-black border-opacity-20 my-2" />
                                <h3 className="text-primary font-bold">
                                    product code:
                                </h3>
                                <p>{v.productCode}</p>
                                <hr className="border-black border-opacity-20 my-2" />
                                <h3 className="text-primary font-bold">
                                    description:
                                </h3>
                                <p className="line-clamp-3">{v.description}</p>
                                <hr className="border-black border-opacity-20 my-2" />
                                <h3 className="text-primary font-bold">
                                    size-price:
                                </h3>
                                <ul>
                                    {v.sizeToPrice.map((sizePrice, idx) => (
                                        <li key={idx}>
                                            {`${Object.keys(sizePrice)[0]} - ${
                                                Object.values(sizePrice)[0]
                                            }`}
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
                <div className="bg-white flex flex-col border-black border p-4 h-full fixed top-0 right-0 w-1/3 z-50 overflow-y-scroll">
                    <h3 className="mb-4 font-bold text-orange-600">
                        {currentProduct._id ? "EDITTING" : "CREATING"}
                    </h3>
                    <form className="flex flex-col gap-4">
                        <label className="text-primary font-bold">title:</label>
                        <input
                            type="text"
                            name="title"
                            value={currentProduct.title}
                            onChange={handleInputChange}
                            placeholder="title"
                            className="border p-2 rounded"
                        />
                        <label className="text-primary font-bold">
                            product code:
                        </label>
                        <input
                            type="text"
                            name="productCode"
                            value={currentProduct.productCode}
                            onChange={handleInputChange}
                            placeholder="product code"
                            className="border p-2 rounded"
                        />
                        <label className="text-primary font-bold">
                            category:
                        </label>
                        {/* dropdown to select category */}
                        <select
                            name="categoryID"
                            value={currentProduct.categoryID}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                        >
                            <option value={0}>select category</option>
                            {/* Map over categories to create options */}
                            {categoriesList.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        <label className="text-primary font-bold">pdf:</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handlePDFChange}
                            className="border p-2 rounded"
                            placeholder=""
                        />
                        <label className="text-primary font-bold">
                            product image:
                        </label>
                        {currentProduct.image ? (
                            <div className="flex flex-col gap-4 items-start">
                                <img
                                    className="w-full"
                                    src={currentProduct.image}
                                />
                                <button className="py-2 bg-primary rounded-full text-white px-4">
                                    change
                                </button>
                                <button className="py-2 bg-rose-600 rounded-full text-white px-4">
                                    delete
                                </button>
                            </div>
                        ) : (
                            <input
                                type="file" // File input for image upload
                                accept="image/*"
                                onChange={handleImageChange} // Change handler for file
                                className="border p-2 rounded"
                            />
                        )}
                        <label className="text-primary font-bold">
                            description:
                        </label>
                        <textarea
                            name="description"
                            value={currentProduct.description}
                            onChange={handleInputChange}
                            placeholder="product description"
                            className="border h-64 p-2 rounded"
                        />
                        <label className="text-primary font-bold">
                            size-price:
                        </label>
                        {/* list available sizes */}
                        {!isAddNewNorEdit &&
                            Object.keys(currentProduct.sizeToPrice[0]).length >
                                0 && <p></p> && (
                                <ul className="text-black text-opacity-60">
                                    {currentProduct.sizeToPrice.map(
                                        (sizePrice, idx) => (
                                            <li key={idx} className="flex ">
                                                {`${
                                                    Object.keys(sizePrice)[0]
                                                } - ${
                                                    Object.values(sizePrice)[0]
                                                }`}
                                                <button
                                                    className="text-rose-600 ml-auto font-bold"
                                                    onClick={() =>
                                                        handleRemoveSizePrice(
                                                            idx
                                                        )
                                                    }
                                                >
                                                    remove
                                                </button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        {/* Inputs for size and price */}
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={sizeInput}
                                onChange={(e) => setSizeInput(e.target.value)}
                                placeholder="size (e.g., 450mm)"
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                                placeholder="price (e.g., £810.00 ex vat)"
                                className="border p-2 rounded"
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-primary text-white px-4 py-2 rounded"
                            onClick={handleAddSizePrice}
                        >
                            add entered size-price pair
                        </button>

                        {/* Buttons to save or cancel */}
                        <div className="fixed right-4 top-4 flex  gap-2">
                            <button
                                type="button"
                                className="bg-primary text-white px-4 py-2 rounded-full"
                                onClick={handleSaveProduct}
                            >
                                save
                            </button>
                            <button
                                type="button"
                                className="bg-rose-600 text-white px-4 py-2 rounded-full"
                                onClick={() => setIsEditing(false)}
                            >
                                cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Add new product button */}
            <button
                className="bg-primary text-white px-4 py-2 rounded-full fixed right-2 bottom-4"
                onClick={() => {
                    setIsEditing(true)
                    setCurrentProduct({
                        _id: null,
                        title: "",
                        categoryID: 0,
                        image: "",
                        productCode: "",
                        sizeToPrice: [],
                        description: "",
                        pdf: null,
                    })
                    setSizeInput("") // Reset size input
                    setPriceInput("") // Reset price input
                    setIsAddNewNorEdit(true)
                }}
            >
                add new
            </button>
        </div>
    )
}
