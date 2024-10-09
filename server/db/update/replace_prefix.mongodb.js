// replace_prefix script basically removes the /images prefix from the imageUrl field of the products collection in the makroteknik database.

// Select the database to use.
use("makroteknik")

// Remove /images prefix from the image URLs. Then, update the documents.
db.products.updateMany(
    { imageUrl: { $regex: "^/images" } }, // Only select documents with image URLs starting with /images
    [
        {
            $set: {
                imageUrl: {
                    $substr: ["$imageUrl", 8, { $strLenCP: "$imageUrl" }],
                },
            },
        },
    ]
)

// Verify the updated documents
db.products.find()
