use("makroteknik")

db.products.updateMany({ categoryID: { $type: "int" } }, [
    {
        $set: {
            categoryID: {
                $toString: "$categoryID",
            },
        },
    },
])

// Verify the updated documents
db.products.find()
