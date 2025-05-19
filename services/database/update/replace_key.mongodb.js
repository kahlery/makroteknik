// replace_field script replaces the key of a field with a new key.
// This script is useful when you want to rename a field in your documents.

// Select the database to use.
use("makroteknik")

// Replace the key of the field.
db.users.updateMany(
    {}, // Match all documents.
    {
        $rename: {
            userName: "username",
        },
    }
)

// Print the result.
db.users.find()
