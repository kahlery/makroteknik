// remove_a_field.mongodb.js script removes the imageUrl field from the products collection in the makroteknik database.

// Select the database to use.
use("makroteknik")

db.categories.updateMany({}, [{ $unset: "categoryId" }])
// Verify the updated documents
db.categories.find()
