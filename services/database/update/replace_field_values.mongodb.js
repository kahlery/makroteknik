use("makroteknik")

db.products.updateMany({ categoryId: { $type: "int" } }, [
    {
        $set: {
            categoryId: {
                $toString: "$categoryId",
            },
        },
    },
])

// Verify the updated documents
db.products.find()
