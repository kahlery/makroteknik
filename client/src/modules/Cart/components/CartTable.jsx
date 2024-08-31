import { MdDeleteOutline } from "react-icons/md"

export const CartTable = () => {
    const cart = [
        {
            productId: 0,
            size: "250mm",
        },
    ]

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
                                <tr>
                                    <td className="flex flex-row items-center gap-3 px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        <img
                                            src="/images/products/0.jpeg"
                                            alt="product"
                                            className="w-12 h-12 rounded-md"
                                        />
                                        <p className="pr-6">
                                            Plate Mounted Axial Flow Fan
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        HCBB/4 Series
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        250mm
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        2
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        £424.00
                                    </td>
                                    <td className="px-6 py-0 whitespace-nowrap text-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent text-gray-800 disabled:pointer-events-none"
                                        >
                                            <MdDeleteOutline className="text-[1.5rem]" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
