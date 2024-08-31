export const CartTable = () => {
    const cart = [
        {
            productId: 0,
            size: "250mm",
        },
    ]

    return (
        <table className="table-auto">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Code</td>
                    <td>Size</td>
                    <td>Details</td>
                </tr>
            </tbody>
        </table>
    )
}
