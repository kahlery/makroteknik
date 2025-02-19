import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" // Import useNavigate
import { useProductStore } from "../product/stores/ProductStore"

export default function CategoryView() {
    const {
        categoriesList,
        getCategories,
        postCategory,
        patchCategory,
        deleteCategory,
        productsList,
    } = useProductStore()
    const [newCategoryName, setNewCategoryName] = useState("")
    const [editingCategory, setEditingCategory] = useState(null)
    const [editCategoryName, setEditCategoryName] = useState("")

    const navigate = useNavigate() // Create navigate function

    useEffect(() => {
        getCategories()
    }, [getCategories])

    const handleAddCategory = async () => {
        if (newCategoryName.trim()) {
            await postCategory({ categoryName: newCategoryName })
            setNewCategoryName("")
            getCategories()
        }
    }

    const handleEditCategory = async (id) => {
        if (editCategoryName.trim()) {
            await patchCategory(id, { categoryName: editCategoryName })
            setEditingCategory(null)
            setEditCategoryName("")
            getCategories()
        }
    }

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id)
        getCategories()
    }

    const getProductCount = (categoryId) => {
        return productsList.filter(
            (product) => product.categoryID === categoryId
        ).length
    }

    return (
        <div className="h-screen w-screen bg-gray-100 p-8">
            {/* Return Button */}
            <button
                onClick={() => navigate(-1)} // Navigate back to the previous route
                className="mt-6 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
                {"<"} Return admin panel
            </button>
            <h1 className="text-2xl font-bold my-6">Manage Categories</h1>

            {/* Add Category Section */}
            <div className="mb-8">
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New Category Name"
                    className="p-2 border border-gray-300 rounded-md mr-2"
                />
                <button
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Add Category
                </button>
            </div>

            {/* Categories List */}
            <div className="space-y-4">
                {categoriesList.map((category) =>
                    category ? (
                        <div
                            key={category._id}
                            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
                        >
                            {editingCategory === category._id ? (
                                <input
                                    type="text"
                                    value={editCategoryName}
                                    onChange={(e) =>
                                        setEditCategoryName(e.target.value)
                                    }
                                    className="p-2 border border-gray-300 rounded-md mr-2"
                                />
                            ) : (
                                <span className="text-lg">
                                    {category.categoryName} (
                                    {getProductCount(category._id)} products)
                                </span>
                            )}

                            <div className="space-x-2">
                                {editingCategory === category._id ? (
                                    <button
                                        onClick={() =>
                                            handleEditCategory(category._id)
                                        }
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setEditingCategory(category._id)
                                            setEditCategoryName(
                                                category.categoryName
                                            )
                                        }}
                                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleDeleteCategory(category._id)
                                    }
                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    )
}
