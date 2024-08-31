import React, { useEffect } from "react"

// stores
import { useCartStore } from "../stores/CartStore"
import { useProductStore } from "../../Products/stores/ProductStore"

// icons
import { MdDeleteOutline } from "react-icons/md"

export const CartTable = () => {
    const cartProducts = useCartStore((state) => state.cartProducts)
    const productsList = useProductStore((state) => state.productsList)

    // Helper function to get product details by ID
    const getProductDetails = (productId) => {
        return productsList.find((product) => product.productId == productId)
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
                                        Count
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                                    >
                                        Price
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

                                            console.log(productDetails)

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
                                                            {productDetails?.name ||
                                                                "Product Name"}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {productDetails?.code ||
                                                            "Product Code"}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {size}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {/* Assuming price is stored in the productList */}
                                                        £
                                                        {productDetails?.price *
                                                            quantity || "0.00"}
                                                    </td>
                                                    <td className="px-6 py-0 whitespace-nowrap text-end">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent text-gray-800 disabled:pointer-events-none"
                                                            onClick={() => {
                                                                // Implement removeProduct here using useCartStore
                                                            }}
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
