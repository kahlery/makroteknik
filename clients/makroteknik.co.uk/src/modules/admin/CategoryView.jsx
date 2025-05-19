import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProductStore } from "../product/stores/ProductStore"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function CategoryView() {
    const {
        categoriesList,
        getCategories,
        postCategory,
        patchCategory,
        deleteCategory,
    } = useProductStore()

    const [categories, setCategories] = useState([])

    const [newCategoryName, setNewCategoryName] = useState("")
    const [editingCategory, setEditingCategory] = useState(null)
    const [editCategoryName, setEditCategoryName] = useState("")

    const navigate = useNavigate()

    const [sortedCategories, setSortedCategories] = useState([])

    useEffect(() => {
        getCategories() // Fetch categories when component mounts
    }, [getCategories])

    useEffect(() => {
        // Sort categories by orderIndex whenever categoriesList changes
        setSortedCategories(
            [...categoriesList].sort((a, b) => a.orderIndex - b.orderIndex)
        )
    }, [categoriesList])

    const handleAddCategory = async () => {
        if (newCategoryName.trim()) {
            await postCategory({
                categoryName: newCategoryName,
                orderIndex: categories.length,
            })
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

    const onDragEnd = async (result) => {
        if (!result.destination) return

        const reorderedCategories = [...categories]
        const [movedCategory] = reorderedCategories.splice(
            result.source.index,
            1
        )
        reorderedCategories.splice(result.destination.index, 0, movedCategory)

        // Update orderIndex based on new position
        const updatedCategories = reorderedCategories.map(
            (category, index) => ({
                ...category,
                orderIndex: index,
            })
        )

        setCategories(updatedCategories)

        // Persist the new order in the backend
        for (const category of updatedCategories) {
            await patchCategory(category._id, {
                orderIndex: category.orderIndex,
            })
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-100 p-8">
            <button
                onClick={() => navigate(-1)}
                className="mt-6 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
                {"<"} Return admin panel
            </button>
            <h1 className="text-2xl font-bold my-6">Manage Categories</h1>

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

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="categories">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-4"
                        >
                            {sortedCategories.map((category, index) => (
                                <Draggable
                                    key={category._id}
                                    draggableId={category._id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
                                        >
                                            {editingCategory ===
                                            category._id ? (
                                                <input
                                                    type="text"
                                                    value={editCategoryName}
                                                    onChange={(e) =>
                                                        setEditCategoryName(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="p-2 border border-gray-300 rounded-md mr-2"
                                                />
                                            ) : (
                                                <span className="text-lg">
                                                    {category.categoryName}
                                                </span>
                                            )}

                                            <div className="space-x-2">
                                                {editingCategory ===
                                                category._id ? (
                                                    <button
                                                        onClick={() =>
                                                            handleEditCategory(
                                                                category._id
                                                            )
                                                        }
                                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditingCategory(
                                                                category._id
                                                            )
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
                                                        handleDeleteCategory(
                                                            category._id
                                                        )
                                                    }
                                                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
