import { useState, useEffect } from "react"

// stores
import { useProductStore } from "../../product/stores/ProductStore"

// icons
import { MdDeleteOutline } from "react-icons/md"
import { MdAdd } from "react-icons/md"
import { MdEdit } from "react-icons/md"
import { IoMdSave } from "react-icons/io"
import { MdCancel } from "react-icons/md"
import { MdRefresh } from "react-icons/md"

// third
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// Components
import CFileInput from "../../common/components/CFileInput"

export const Panel = () => {
    // Stores
    const productsList = useProductStore((s) => s.productsList)
    const categoriesList = useProductStore((s) => s.categoriesList)
    const getProducts = useProductStore((s) => s.getProducts)

    const postProduct = useProductStore((s) => s.postProduct)
    const patchProduct = useProductStore((s) => s.patchProduct)
    const deleteProduct = useProductStore((s) => s.deleteProduct)

    const getPDF = useProductStore((s) => s.getPDF)
    const postPDF = useProductStore((s) => s.postPDF)
    const getPDFMeta = useProductStore((s) => s.getPDFMeta)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsEditing(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    // state to hold the current product being edited or created
    const [currentProduct, setCurrentProduct] = useState({
        _id: null,
        title: "",
        categoryID: 0,
        image: "",
        productCode: "",
        sizeToPrice: [],
        description: "",
    })

    // state to control whether the form is visible for editing/adding
    const [isEditing, setIsEditing] = useState(false)

    // state to hold the search query
    const [searchQuery, setSearchQuery] = useState("")

    // state to hold new size and price inputs
    const [sizeInput, setSizeInput] = useState("")
    const [priceInput, setPriceInput] = useState("")

    const [isAddNewNorEdit, setIsAddNewNorEdit] = useState(false)

    const [PDF, setPDF] = useState(null)

    // handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCurrentProduct({ ...currentProduct, [name]: value })
    }

    // handle image upload and convert to base64
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setCurrentProduct((prevProduct) => ({
                ...prevProduct,
                image: reader.result, // Base64 string
                imageName: file.name,
                imageFile: file,
            }))
        }
        if (file) {
            reader.readAsDataURL(file) // Convert to base64
        }
    }

    // handle adding a new size-price pair
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
        if (currentProduct._id) {
            patchProduct(currentProduct._id, currentProduct)
        } else {
            await postProduct(currentProduct) // Assuming postProduct returns the created product

            // refetch the posted product
            getProducts()
        }

        if (PDF) {
            postPDF(currentProduct._id, PDF, currentProduct.pdfName)
        }

        if (currentProduct.imageFile) {
            postImage(
                currentProduct._id,
                currentProduct.imageFile,
                currentProduct.imageName
            )
        }

        setPDF(null)
        setIsEditing(false)
        setCurrentProduct({
            _id: null,
            title: "",
            categoryID: 0,
            image: "",
            imageName: "",
            imageFile: null,
            productCode: "",
            sizeToPrice: [],
            description: "",
            pdfName: "",
        })
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
    const handleEditProduct = (product) => {
        getPDFMeta(product._id).then((pdfMeta) => {
            setCurrentProduct({
                _id: product._id,
                title: product.title ?? "not title",
                categoryID: product.categoryID ?? "0",
                image: product.image ?? "",
                productCode: product.productCode ?? "",
                sizeToPrice: product.sizeToPrice ?? [],
                description: product.description ?? "",
                pdfMeta: pdfMeta,
            })

            setPDF(null)

            setSizeInput("") // Reset size input on edit
            setPriceInput("") // Reset price input on edit
            setIsEditing(true)
        })
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
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            pdfName: file.name,
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
                    <button className="text-white font-bold">products</button>
                    <button className="text-white font-bold">categories</button>
                    <button className="text-white font-bold">posts</button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative w-screen flex flex-wrap py-16 h-full min-h-screen">
            {renderNavbar()}
            {/* -------------------------------------------------------------------- */}
            {renderCardGrid(
                filteredProducts,
                handleEditProduct,
                handleDeleteProduct,
                categoriesList
            )}
            {/* -------------------------------------------------------------------- */}
            {isEditing &&
                renderProductForm(
                    currentProduct,
                    handleInputChange,
                    categoriesList,
                    handlePDFChange,
                    handleImageChange,
                    isAddNewNorEdit,
                    handleRemoveSizePrice,
                    sizeInput,
                    setSizeInput,
                    priceInput,
                    setPriceInput,
                    handleAddSizePrice,
                    handleSaveProduct,
                    setIsEditing,
                    setCurrentProduct,
                    handleDragEnd,
                    getPDF
                )}
            {/* -------------------------------------------------------------------- */}
            {renderFloatingAddButton(
                setIsEditing,
                setCurrentProduct,
                setSizeInput,
                setPriceInput,
                setPDF,
                setIsAddNewNorEdit
            )}
            {/* -------------------------------------------------------------------- */}
            {renderFloatingRenewButton(getProducts)}
        </div>
    )
}

function renderCardGrid(
    filteredProducts,
    handleEditProduct,
    handleDeleteProduct,
    categoriesList
) {
    return (
        <div className="flex flex-row w-screen flex-wrap mt-10 gap-16 px-[5%]">
            {filteredProducts.reverse().map((v) => (
                <div
                    key={v._id}
                    className="w-[350px] h-[490px] text-black text-opacity-60 text-sm 
                     border-black border-opacity-20 shadow-lg border p-4  bg-white overflow-clip
                     cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform duration-1000 ease-in-out
                     "
                    onClick={() => handleEditProduct(v)}
                >
                    <div className="gap-4">
                        <div className="relative">
                            <div className="absolute flex flex-col gap-2 right-0">
                                <button
                                    className="bg-white backdrop-blur-sm bg-opacity-10 backdrop-contrast-200 text-rose-500 px-2 py-2  font-bold"
                                    onClick={(e) => {
                                        handleDeleteProduct(v._id)
                                        e.stopPropagation()
                                    }}
                                >
                                    <MdDeleteOutline className="text-[1.5rem]" />
                                </button>
                            </div>
                            <div className="flex flex-row gap-8">
                                <img
                                    src={v.image}
                                    alt={v.title}
                                    className="w-1/2 object-scale-down mx-auto h-fit  mb-8"
                                />{" "}
                                {/* <img
                                    src={v.image}
                                    alt={v.title}
                                    className="w-1/3 object-scale-down h-fit  mb-8"
                                /> */}
                            </div>
                            <h3 className="text-primary font-bold">title:</h3>
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
                                category:
                            </h3>
                            <p>
                                {categoriesList.find(
                                    (category) => category._id === v.categoryID
                                )?.categoryName || null}
                            </p>
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
    )
}

function renderProductForm(
    currentProduct,
    handleInputChange,
    categoriesList,
    handlePDFChange,
    handleImageChange,
    isAddNewNorEdit,
    handleRemoveSizePrice,
    sizeInput,
    setSizeInput,
    priceInput,
    setPriceInput,
    handleAddSizePrice,
    handleSaveProduct,
    setIsEditing,
    setCurrentProduct,
    handleDragEnd,
    getPDF
) {
    return (
        <div
            className="bg-black bg-opacity-80 w-full h-full fixed top-0 right-0 z-50 text-primary text-opacity-60 text-sm"
            onClick={() => setIsEditing(false)}
        >
            <div
                className="bg-white flex flex-col border-black border p-4 h-full fixed top-0 right-0 w-1/3 z-50 overflow-y-scroll"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-8 font-bold text-rose-500">
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
                    <label className="text-primary font-bold">category:</label>
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
                    {console.log(
                        "currentProduct.pdfMeta:",
                        currentProduct.pdfMeta
                    )}
                    {currentProduct.pdfMeta && (
                        <>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                alt={currentProduct.title}
                                className="w-1/4 cursor-pointer"
                                onClick={() => {
                                    getPDF(currentProduct._id)
                                }}
                            />
                            <p className="text-blue-800">
                                {currentProduct._id}.pdf
                            </p>
                        </>
                    )}
                    <CFileInput
                        id="pdf-upload"
                        accept="application/pdf"
                        onChange={handlePDFChange}
                        isAvailable={currentProduct.pdfMeta !== undefined}
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
                                        onClick={handleImageChange}
                                        className="absolute top-4 left-4 py-2 bg-white bg-opacity-30  backdrop-blur-sm text-rose-500 px-2 font-bold flex gap-2 items-center"
                                    >
                                        <MdDeleteOutline className="text-[1.5rem]" />
                                    </button>
                                    <label className="text-blue-800">
                                        {currentProduct._id}.
                                        {
                                            currentProduct.image
                                                .split("/")[1]
                                                .split(";")[0]
                                                .split("base64,")[0]
                                        }
                                    </label>
                                </>
                            ) : (
                                ""
                            )}
                            <CFileInput
                                id="image-upload"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={handleImageChange}
                                isAvailable={currentProduct.image.length > 40}
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
                                                        ref={provided.innerRef}
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
                                                            onChange={(e) => {
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
                                                            onChange={(e) => {
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
                            onClick={handleSaveProduct}
                        >
                            <IoMdSave className="text-[1.5rem]" />
                        </button>
                        <button
                            type="button"
                            className="bg-rose-600 text-white px-2 py-2  font-bold"
                            onClick={() => setIsEditing(false)}
                        >
                            <MdCancel className="text-[1.5rem]" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function renderFloatingAddButton(
    setIsEditing,
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
                setIsEditing(true)
                setCurrentProduct({
                    _id: null,
                    title: "",
                    categoryID: 0,
                    image: "",
                    productCode: "",
                    sizeToPrice: [],
                    description: "",
                })
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
