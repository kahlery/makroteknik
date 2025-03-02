import { useState, useEffect, useRef } from "react"

// stores
import { useProductStore } from "../../product/stores/ProductStore"

// icons
import { MdDeleteOutline } from "react-icons/md"
import { MdAdd } from "react-icons/md"
import { IoMdSave } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { MdRefresh } from "react-icons/md"
import { MdContentCopy } from "react-icons/md"

// third
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import CFileInput from "../../common/components/CFileInput"

import { Link } from "react-router-dom"

let DEFAULT_CURRENT_PRODUCT = {
    _id: null,
    title: "",
    categoryID: 0,
    image: "",
    imageTitle: "",
    imageFile: null,
    productCode: "",
    sizeToPrice: [],
    description: "",
    pdfName: "",
    isPDFMetaLoaded: 1,
}

export const Panel = () => {
    // Stores -------------------------------------------------------------------
    const loading = useProductStore((s) => s.loading)
    const productsList = useProductStore((s) => s.productsList)
    const categoriesList = useProductStore((s) => s.categoriesList)
    const getProducts = useProductStore((s) => s.getProducts)

    const postProduct = useProductStore((s) => s.postProduct)
    const patchProduct = useProductStore((s) => s.patchProduct)
    const deleteProduct = useProductStore((s) => s.deleteProduct)

    const getPDF = useProductStore((s) => s.getPDF)
    const postPDF = useProductStore((s) => s.postPDF)
    const getPDFMeta = useProductStore((s) => s.getPDFMeta)
    const deletePDF = useProductStore((s) => s.deletePDF)
    // States --------------------------------------------------------------------
    // state to control whether the form is visible for editing/adding
    const [isRenderForm, setIsRenderForm] = useState(false)

    // state to hold the search query
    const [searchQuery, setSearchQuery] = useState("")

    // state to hold new size and price inputs
    const [sizeInput, setSizeInput] = useState("")
    const [priceInput, setPriceInput] = useState("")

    const [isAddNewNorEdit, setIsAddNewNorEdit] = useState(false)

    const [PDF, setPDF] = useState(null)

    const [currentProduct, setCurrentProduct] = useState(
        DEFAULT_CURRENT_PRODUCT
    )

    // Effects --------------------------------------------------------------------
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsRenderForm(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    // Handlers --------------------------------------------------------------------
    // handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target

        setCurrentProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    // Add a new function to handle image deletion
    const handleDeleteImage = () => {
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            image: "", // Reset the image
            imageName: "", // Reset the image name
            imageFile: null, // Reset the image file
        }))
    }

    // Add a new function to handle image deletion
    const handleDeletePDF = () => {
        setCurrentProduct(DEFAULT_CURRENT_PRODUCT)
        setIsRenderForm(false)

        deletePDF(currentProduct._id)
    }

    // handle image upload and convert to base64
    // Modify the handleImageChange function
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setCurrentProduct((prevProduct) => ({
                    ...prevProduct,
                    image: reader.result, // Base64 string
                    imageName: file.name,
                    imageFile: file,
                }))
            }
            reader.readAsDataURL(file) // Convert to base64
        } else {
            handleDeleteImage() // If no file is selected, delete the image
        }
    }

    // handle adding a new size-price pair
    const handleAddSizePrice = () => {
        let size = sizeInput.trim()
        let price = priceInput.trim()

        // Add default "mm" to size if not already present
        if (size && !size.toLowerCase().endsWith("mm")) {
            size += "mm"
        }

        // Add default "£" and "ex VAT" to price if not already present
        if (price && !price.toLowerCase().startsWith("£")) {
            price = `£${price}`
        }
        if (price && !price.toLowerCase().endsWith("ex vat")) {
            price += " ex VAT"
        }

        if (size && price) {
            const newSizePrice = { [size]: price }
            setCurrentProduct((prevProduct) => ({
                ...prevProduct,
                sizeToPrice: [...prevProduct.sizeToPrice, newSizePrice],
            }))
            setSizeInput("") // Reset size input
            setPriceInput("") // Reset price input
        }
    }

    // handle removing a size-price pair
    const handleRemoveSizePrice = (index) => {
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            sizeToPrice: prevProduct.sizeToPrice.filter(
                (_, idx) => idx !== index
            ),
        }))
    }

    const handleSaveProduct = async () => {
        let productID

        if (currentProduct._id) {
            console.log("Patching the product.")
            await patchProduct(currentProduct._id, currentProduct)
        } else {
            console.log("Creating the product.")
            productID = await postProduct(currentProduct) // Ensure this returns the created product with `_id`.
        }

        return productID
    }

    const handleCopyProduct = (product) => {
        const copiedProduct = {
            ...product,
            _id: null, // Reset the ID to ensure a new product is created
            pdfName: "", // Reset the PDF name
            pdfMeta: null, // Reset the PDF metadata
        }
        setCurrentProduct(copiedProduct)
        setIsRenderForm(true)
    }

    const postFiles = async (productID) => {
        if (PDF) {
            await postPDF(productID, PDF, currentProduct.pdfName)
        }

        // Reset the form after successful save
        setPDF(null)
        setIsRenderForm(false)
        setCurrentProduct(DEFAULT_CURRENT_PRODUCT)
        getPDFMeta(currentProduct._id)
    }

    const handleDragEnd = (result) => {
        const { destination, source } = result

        if (!destination) return // No destination means we ignore the drag

        // If the item was dropped in the same place
        if (destination.index === source.index) return

        const updatedSizeToPrice = Array.from(currentProduct.sizeToPrice)
        const [movedItem] = updatedSizeToPrice.splice(source.index, 1) // Remove the item from the source index
        updatedSizeToPrice.splice(destination.index, 0, movedItem) // Insert it into the destination index

        setCurrentProduct({
            ...currentProduct,
            sizeToPrice: updatedSizeToPrice,
        })
    }

    // handle editing a product
    const handleEditProduct = async (product) => {
        await getPDFMeta(product._id)

        // Set the form
        setCurrentProduct(productsList.find((x) => x._id === product._id))
        setIsRenderForm(true)
    }

    // handle deleting a product
    const handleDeleteProduct = (id) => {
        // delete the product after confirmation
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id)
        }
    }

    // handle PDF upload
    const handlePDFChange = (e) => {
        const file = e.target.files[0]
        setPDF(file)
        const decodedFileName = decodeURIComponent(file.name) // Decode the file name
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            pdfName: decodedFileName, // Use the decoded file name
        }))
    }

    // filter products based on search query
    const filteredProducts = productsList.filter(
        (product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    )

    const renderNavbar = () => {
        return (
            <div
                className="px-[5%] fixed flex justify-between gap-12 top-0 left-0 w-full items-center
     bg-black p-2 border z-10 border-black border-opacity-20 shadow-xl"
            >
                <h1 className="font-bold text-white">
                    makroteknik.co.uk/admin
                </h1>
                <div className="flex gap-12">
                    <input
                        type="text"
                        placeholder="search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-72 px-4 py-1 border-gray-600 border bg-white text-black placeholder:text-black placeholder:text-opacity-80 placeholder:font-bold"
                    />
                    <Link className="text-white font-bold" to="category">
                        categories
                    </Link>
                    <Link className="text-white font-bold" to="post">
                        post
                    </Link>
                </div>
            </div>
        )
    }

    const groupProductsByCategory = (products, categories) => {
        const grouped = {}

        // First, find products that do not belong to any category
        const uncategorizedProducts = products.filter(
            (product) =>
                !categories.some(
                    (category) => category._id === product.categoryID
                )
        )

        // Add uncategorized products at the top
        if (uncategorizedProducts.length > 0) {
            grouped["uncategorized"] = {
                categoryName: "Uncategorized",
                products: uncategorizedProducts,
            }
        }

        // Then, group the remaining products by their categories
        categories.forEach((category) => {
            grouped[category._id] = {
                categoryName: category.categoryName,
                products: products.filter(
                    (product) => product.categoryID === category._id
                ),
            }
        })

        return grouped
    }

    function renderFloatingContentBar(categoriesList) {
        const [isOpen, setIsOpen] = useState(true) // Track whether the bar is open or collapsed

        const toggleBar = () => {
            setIsOpen((prevState) => !prevState) // Toggle the state of the bar
        }

        return (
            <div className="fixed right-8 top-16 transform bg-white border border-4 border-black bg-opacity-100 px-4 py-2 shadow-lg z-50">
                <button
                    onClick={toggleBar}
                    className="text-blue-600 bg-white font-bold hover:text-rose-500"
                >
                    {isOpen ? "-> Hide Categories" : "<- Show Categories"}
                </button>
                {isOpen && (
                    <ul className="flex flex-col gap-2 my-4">
                        {categoriesList.map((category) => (
                            <li key={category._id}>
                                <a
                                    href={`#category-${category._id}`}
                                    className="text-primary font-bold hover:text-rose-500"
                                >
                                    • {category.categoryName}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }

    if (loading > 0) {
        return (
            <div className="text-center text-lg text-gray-500 mt-32">
                Loading...
            </div>
        )
    }

    return (
        <div className="relative w-screen flex flex-wrap py-16 h-full min-h-screen">
            {renderNavbar()}
            {renderFloatingContentBar(categoriesList)}
            {renderCardGrid(
                filteredProducts,
                handleEditProduct,
                handleDeleteProduct,
                categoriesList,
                groupProductsByCategory,
                handleCopyProduct // Pass the new handler
            )}
            {renderProductForm(
                isRenderForm,
                currentProduct,
                handleInputChange,
                categoriesList,
                handlePDFChange,
                handleImageChange,
                handleRemoveSizePrice,
                sizeInput,
                setSizeInput,
                priceInput,
                setPriceInput,
                handleAddSizePrice,
                handleSaveProduct,
                postFiles,
                setIsRenderForm,
                setCurrentProduct,
                handleDragEnd,
                getPDF,
                productsList,
                handleDeleteImage,
                handleDeletePDF
            )}
            {renderFloatingAddButton(
                setIsRenderForm,
                setCurrentProduct,
                setSizeInput,
                setPriceInput,
                setPDF,
                setIsAddNewNorEdit
            )}
            {renderFloatingRenewButton(getProducts)}
        </div>
    )
}

function renderCardGrid(
    filteredProducts,
    handleEditProduct,
    handleDeleteProduct,
    categoriesList,
    groupProductsByCategory,
    handleCopyProduct // Add this new handler
) {
    const groupedProducts = groupProductsByCategory(
        filteredProducts,
        categoriesList
    )

    return (
        <div className="flex flex-col w-screen flex-wrap mt-10 gap-16 px-[5%]">
            {Object.keys(groupedProducts).map((categoryId) => (
                <div
                    key={categoryId}
                    id={`category-${categoryId}`}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold mb-4">
                        {groupedProducts[categoryId].categoryName}
                    </h2>
                    <div className="flex flex-row flex-wrap gap-16">
                        {groupedProducts[categoryId].products.map((product) => (
                            <div
                                key={product._id}
                                className="w-[350px] h-[490px] text-black text-opacity-60 text-sm 
                                 border-black border-opacity-20 shadow-lg border p-4  bg-white overflow-clip
                                 cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-1000 ease-in-out"
                                onClick={() => handleEditProduct(product)}
                            >
                                {/* Product card content */}
                                <div className="gap-4">
                                    <div className="relative">
                                        <div className="absolute flex flex-col gap-2 right-0">
                                            <button
                                                className="bg-white backdrop-blur-sm bg-opacity-10 backdrop-contrast-200 text-rose-500 px-2 py-2  font-bold"
                                                onClick={(e) => {
                                                    handleDeleteProduct(
                                                        product._id
                                                    )
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <MdDeleteOutline className="text-[1.5rem]" />
                                            </button>
                                            <button
                                                className="bg-white backdrop-blur-sm bg-opacity-10 backdrop-contrast-200 text-blue-500 px-2 py-2  font-bold"
                                                onClick={(e) => {
                                                    handleCopyProduct(product)
                                                    e.stopPropagation()
                                                }}
                                            >
                                                <MdContentCopy className="text-[1.5rem]" />
                                            </button>
                                        </div>
                                        <div className="flex flex-row gap-8">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-1/2 object-scale-down mx-auto h-fit  mb-8"
                                            />
                                        </div>
                                        <h3 className="text-primary font-bold">
                                            title:
                                        </h3>
                                        <h3 className="line-clamp-1">
                                            {product.title}
                                        </h3>
                                        <hr className="border-black border-opacity-20 my-2" />
                                        <h3 className="text-primary font-bold">
                                            product code:
                                        </h3>
                                        <p>{product.productCode}</p>
                                        <hr className="border-black border-opacity-20 my-2" />
                                        <h3 className="text-primary font-bold">
                                            description:
                                        </h3>
                                        <p className="line-clamp-3">
                                            {product.description}
                                        </p>
                                        <hr className="border-black border-opacity-20 my-2" />
                                        <h3 className="text-primary font-bold">
                                            category:
                                        </h3>
                                        <p>
                                            {categoriesList.find(
                                                (category) =>
                                                    category._id ===
                                                    product.categoryID
                                            )?.categoryName || null}
                                        </p>
                                        <hr className="border-black border-opacity-20 my-2" />
                                        <h3 className="text-primary font-bold">
                                            size-price:
                                        </h3>
                                        <ul>
                                            {product.sizeToPrice.map(
                                                (sizePrice, idx) => (
                                                    <li key={idx}>
                                                        {`${
                                                            Object.keys(
                                                                sizePrice
                                                            )[0]
                                                        } - ${
                                                            Object.values(
                                                                sizePrice
                                                            )[0]
                                                        }`}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

function renderProductForm(
    isRenderForm,
    currentProduct,
    handleInputChange,
    categoriesList,
    handlePDFChange,
    handleImageChange,
    handleRemoveSizePrice,
    sizeInput,
    setSizeInput,
    priceInput,
    setPriceInput,
    handleAddSizePrice,
    handleSaveProduct,
    postFiles,
    setIsRenderForm,
    setCurrentProduct,
    handleDragEnd,
    getPDF,
    productsList,
    handleDeleteImage,
    handleDeletePDF
) {
    if (!isRenderForm) {
        // Checks if the form is activated
        // return <div className="h-64 w-64 bg-5"></div>
    } else if (!currentProduct.isPDFMetaLoaded) {
        setCurrentProduct(
            productsList.find((x) => x._id === currentProduct._id)
        )
    } else {
        // If form is activated and pdf meta is loaded
        return (
            <div
                className="bg-black bg-opacity-80 w-full h-full fixed top-0 right-0 z-50 text-primary text-opacity-60 text-sm"
                // onClick={() => setIsRenderForm(false)}
            >
                <div
                    className="bg-white flex flex-col border-black border p-4 h-full fixed top-0 right-0 w-1/3 z-50 overflow-y-scroll"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="mb-8 font-bold text-blue-500">
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
                            className="border  border-gray-400 p-2"
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
                            className="border border-gray-400 p-2"
                        />
                        <label className="text-primary font-bold">
                            category:
                        </label>
                        {/* dropdown to select category */}
                        <select
                            name="categoryID"
                            value={currentProduct.categoryID}
                            onChange={handleInputChange}
                            className="border border-gray-400 p-2"
                        >
                            <option value={0}>select category</option>
                            {/* Map over categories to create options */}
                            {categoriesList.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>

                        <hr className="border-black border-opacity-20 border my-8" />

                        <label className="text-primary font-bold">pdf:</label>

                        {!currentProduct.pdfMeta ? (
                            <div>no PDF set yet</div>
                        ) : currentProduct.pdfMeta ? (
                            <>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                    alt={currentProduct.title}
                                    className="w-1/4 cursor-pointer"
                                    onClick={() => getPDF(currentProduct._id)}
                                />
                                <p>
                                    {decodeURIComponent(
                                        currentProduct.pdfMeta.Title
                                    )}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleDeletePDF}
                                    className="h-2 mb-6 w-fit bg-4 text-white p-4 text-center items-center flex"
                                >
                                    Delete the PDF
                                </button>
                            </>
                        ) : (
                            <p>No PDF metadata available.</p>
                        )}

                        <CFileInput
                            id="pdf-upload"
                            accept="application/pdf"
                            onChange={handlePDFChange}
                            isAvailable={currentProduct.pdfMeta}
                        />

                        <hr className="border-black border-opacity-20 border my-8" />

                        <label className="text-primary font-bold">
                            product image:
                        </label>
                        {currentProduct.image ? (
                            <div className="flex flex-col gap-4 items-start relative">
                                {currentProduct.image.length > 40 ? (
                                    <>
                                        <img
                                            className="w-3/4"
                                            src={currentProduct.image}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleDeleteImage}
                                            className="absolute top-4 left-4 py-2 bg-white bg-opacity-30  backdrop-blur-sm text-rose-500 px-2 font-bold flex gap-2 items-center"
                                        >
                                            <MdDeleteOutline className="text-[1.5rem]" />
                                        </button>
                                        <label className="text-1">
                                            {currentProduct.imageName}
                                            {/* {
                                                currentProduct.image
                                                    .split("/")[1]
                                                    .split(";")[0]
                                                    .split("base64,")[0]
                                            } */}
                                        </label>
                                    </>
                                ) : (
                                    ""
                                )}
                                <CFileInput
                                    id="image-upload"
                                    accept="image/png, image/jpeg, image/jpg, image/webp"
                                    onChange={handleImageChange}
                                    isAvailable={
                                        currentProduct.image.length > 40
                                    }
                                />
                            </div>
                        ) : (
                            <CFileInput
                                id="image-upload-new"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={handleImageChange} // Change handler for file
                                isAvailable={false} // If image is available
                            />
                        )}

                        <hr className="border-black border-opacity-20 border my-8" />

                        <label className="text-primary font-bold">
                            description:
                        </label>
                        <textarea
                            name="description"
                            value={currentProduct.description}
                            onChange={handleInputChange}
                            placeholder="product description"
                            className="border border-gray-400 h-64 p-2 "
                        />
                        <label className="text-primary font-bold">
                            size-price:
                        </label>
                        {/* list available sizes */}
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="sizeToPriceList">
                                {(provided) => (
                                    <ul
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="text-black text-opacity-60"
                                    >
                                        {currentProduct.sizeToPrice.map(
                                            (sizePrice, idx) => (
                                                <Draggable
                                                    key={idx}
                                                    draggableId={String(idx)}
                                                    index={idx}
                                                >
                                                    {(provided) => (
                                                        <li
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="flex gap-4 items-center mb-2"
                                                        >
                                                            <input
                                                                type="text"
                                                                value={
                                                                    Object.keys(
                                                                        sizePrice
                                                                    )[0]
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newSizeToPrice =
                                                                        [
                                                                            ...currentProduct.sizeToPrice,
                                                                        ]
                                                                    const updatedSize =
                                                                        e.target
                                                                            .value
                                                                    const price =
                                                                        Object.values(
                                                                            sizePrice
                                                                        )[0]
                                                                    newSizeToPrice[
                                                                        idx
                                                                    ] = {
                                                                        [updatedSize]:
                                                                            price,
                                                                    }
                                                                    setCurrentProduct(
                                                                        {
                                                                            ...currentProduct,
                                                                            sizeToPrice:
                                                                                newSizeToPrice,
                                                                        }
                                                                    )
                                                                }}
                                                                className="border border-gray-400 p-2  w-1/2"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={
                                                                    Object.values(
                                                                        sizePrice
                                                                    )[0]
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    const newSizeToPrice =
                                                                        [
                                                                            ...currentProduct.sizeToPrice,
                                                                        ]
                                                                    const size =
                                                                        Object.keys(
                                                                            sizePrice
                                                                        )[0]
                                                                    const updatedPrice =
                                                                        e.target
                                                                            .value
                                                                    newSizeToPrice[
                                                                        idx
                                                                    ] = {
                                                                        [size]: updatedPrice,
                                                                    }
                                                                    setCurrentProduct(
                                                                        {
                                                                            ...currentProduct,
                                                                            sizeToPrice:
                                                                                newSizeToPrice,
                                                                        }
                                                                    )
                                                                }}
                                                                className="border border-gray-400 p-2  w-1/2"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRemoveSizePrice(
                                                                        idx
                                                                    )
                                                                }
                                                                className="text-rose-500 font-bold ml-2"
                                                            >
                                                                Remove
                                                            </button>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )
                                        )}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {/* Inputs for size and price */}
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={sizeInput}
                                onChange={(e) => setSizeInput(e.target.value)}
                                placeholder="size (e.g., 450mm)"
                                className="border border-gray-400 p-2 "
                            />
                            <input
                                type="text"
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                                placeholder="price (e.g., £810.00 ex vat)"
                                className="border border-gray-400 p-2 "
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-primary text-white px-4 py-2  font-bold"
                            onClick={handleAddSizePrice}
                        >
                            add entered size-price pair
                        </button>

                        {/* Buttons to save or cancel */}
                        <div className="fixed right-4 top-4 flex  gap-2">
                            <button
                                type="button"
                                className="bg-primary text-white px-2 py-2  font-bold"
                                onClick={async () => {
                                    try {
                                        if (currentProduct._id) {
                                            handleSaveProduct()
                                            postFiles(currentProduct._id)
                                        } else {
                                            const id = await handleSaveProduct()
                                            postFiles(id)
                                        }
                                    } catch (error) {
                                        console.error(
                                            "Error saving product:",
                                            error
                                        )
                                    }
                                }}
                            >
                                <IoMdSave className="text-[1.5rem]" />
                            </button>
                            <button
                                type="button"
                                className="bg-rose-600 text-white px-2 py-2  font-bold"
                                onClick={() => setIsRenderForm(false)}
                            >
                                <MdCancel className="text-[1.5rem]" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function renderFloatingAddButton(
    setIsRenderForm,
    setCurrentProduct,
    setSizeInput,
    setPriceInput,
    setPDF,
    setIsAddNewNorEdit
) {
    return (
        <button
            className="bg-primary text-white px-4 py-4  fixed right-8 bottom-8"
            onClick={() => {
                setIsRenderForm(true)
                setCurrentProduct(DEFAULT_CURRENT_PRODUCT)
                setSizeInput("") // reset size input
                setPriceInput("") // reset price input
                setPDF(null)
                setIsAddNewNorEdit(true)
            }}
        >
            <MdAdd className="text-[1.5rem] " />
        </button>
    )
}

function renderFloatingRenewButton(getProducts) {
    return (
        <button
            className="bg-primary text-white px-4 py-4  fixed right-8 bottom-24"
            onClick={getProducts}
        >
            <MdRefresh className="text-[1.5rem]" />
        </button>
    )
}
