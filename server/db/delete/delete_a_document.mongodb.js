// delete_a_document.js - delete a document from a collection

use("makroteknik")

db.products.deleteOne({
    title: "test",
})
