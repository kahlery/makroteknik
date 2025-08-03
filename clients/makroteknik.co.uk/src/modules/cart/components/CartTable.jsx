import React, { useEffect } from "react"
import { MdDeleteOutline } from "react-icons/md"
import { useCartStore } from "../stores/CartStore"
import { useProductStore } from "../../product/stores/ProductStore"

export const CartTable = () => {
    const { cartProducts, setSizeQuantity, removeProduct } = useCartStore()
    const { productsList, getProducts } = useProductStore()

    useEffect(() => {
        if (productsList.length === 0) getProducts()
    }, [productsList.length, getProducts])

    const getSizeLabelByIndex = (sizeMap, index) => {
        const sizes = Object.keys(sizeMap || {})
        return sizes[index] || "Unknown"
    }

    const renderCartRows = () => {
        return Object.entries(cartProducts).flatMap(([productId, sizes]) => {
            const product = productsList.find((p) => p._id === productId)
            if (!product) return null

            return sizes.map((sizeObj, i) => {
                const sizeIndex = Object.keys(sizeObj)[0]
                const quantity = sizeObj[sizeIndex]
                const sizeLabel = getSizeLabelByIndex(
                    product.size_2_price,
                    sizeIndex
                )

                return (
                    <tr key={`${productId}-${sizeIndex}`} className="border-t">
                        <td className="px-4 py-3">
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="w-16 h-16 object-contain rounded"
                            />
                        </td>
                        <td className="px-4 py-3 font-medium">
                            {product.title}
                        </td>
                        <td className="px-4 py-3">{product.product_code}</td>
                        <td className="px-4 py-3">{sizeLabel}</td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        setSizeQuantity(
                                            productId,
                                            sizeIndex,
                                            quantity - 1
                                        )
                                    }
                                    className="px-2 py-1 text-sm border rounded"
                                >
                                    -
                                </button>
                                <span>{quantity}</span>
                                <button
                                    onClick={() =>
                                        setSizeQuantity(
                                            productId,
                                            sizeIndex,
                                            quantity + 1
                                        )
                                    }
                                    className="px-2 py-1 text-sm border rounded"
                                >
                                    +
                                </button>
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <button
                                onClick={() =>
                                    removeProduct(productId, sizeIndex)
                                }
                                className="text-red-500 hover:text-red-700"
                            >
                                <MdDeleteOutline size={20} />
                            </button>
                        </td>
                    </tr>
                )
            })
        })
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCartRows() || (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-4 text-gray-500"
                            >
                                Cart is empty.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
