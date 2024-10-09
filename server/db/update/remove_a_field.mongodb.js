// remove_a_field.mongodb.js script removes the imageUrl field from the products collection in the makroteknik database.

// Select the database to use.
use("makroteknik")

// Remove the imageUrl field from the documents.
db.products.updateMany({}, [{ $unset: "imageUrl" }])
// Verify the updated documents
db.products.find()
