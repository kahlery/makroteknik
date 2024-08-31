import React, { useState } from "react"
import { useCartStore } from "../stores/CartStore"
import { useProductStore } from "../../Products/stores/ProductStore"
import { MdDeleteOutline } from "react-icons/md"

export const CartTable = () => {
    const cartProducts = useCartStore((state) => state.cartProducts)
    const productsList = useProductStore((state) => state.productsList)
    const removeProduct = useCartStore((state) => state.removeProduct)
    const setSizeQuantity = useCartStore((state) => state.setSizeQuantity)

    const [editQuantity, setEditQuantity] = useState({})

    // Helper function to get product details by ID
    const getProductDetails = (productId) => {
        return productsList.find((product) => product.productId === productId)
    }

    const handleQuantityChange = (productId, size, e) => {
        const quantity = parseInt(e.target.value, 10)
        setEditQuantity((prev) => ({
            ...prev,
            [`${productId}-${size}`]: quantity,
        }))
        setSizeQuantity(productId, size, quantity)
    }

    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Code
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Size
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Count
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(cartProducts).map(
                                    ([productId, sizes]) => {
                                        const productDetails =
                                            getProductDetails(
                                                parseInt(productId, 10)
                                            )

                                        return sizes.map((sizeObj, index) => {
                                            const size = Object.keys(sizeObj)[0]
                                            const quantity = sizeObj[size]

                                            return (
                                                <tr
                                                    key={`${productId}-${size}-${index}`}
                                                >
                                                    <td className="flex flex-row items-center gap-3 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                                        <img
                                                            src={
                                                                productDetails?.imageUrl ||
                                                                "/images/default-product.png"
                                                            }
                                                            alt={
                                                                productDetails?.title ||
                                                                "Product"
                                                            }
                                                            className="w-12 h-12 rounded-md"
                                                        />
                                                        <p className="pr-6">
                                                            {productDetails?.title ||
                                                                "Product Name"}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {productDetails?.productCode ||
                                                            "Product Code"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {Object.keys(
                                                            productDetails[
                                                                "sizeToPrice"
                                                            ][size]
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {Object.values(
                                                            productDetails[
                                                                "sizeToPrice"
                                                            ][size]
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        <input
                                                            type="number"
                                                            value={
                                                                editQuantity[
                                                                    `${productId}-${size}`
                                                                ] || quantity
                                                            }
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    productId,
                                                                    size,
                                                                    e
                                                                )
                                                            }
                                                            className="w-full px-2 py-1 border border-gray-300 rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-0 whitespace-nowrap text-end">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent text-gray-800 disabled:pointer-events-none"
                                                            onClick={() =>
                                                                removeProduct(
                                                                    productId,
                                                                    size
                                                                )
                                                            }
                                                        >
                                                            <MdDeleteOutline className="text-[1.5rem]" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
