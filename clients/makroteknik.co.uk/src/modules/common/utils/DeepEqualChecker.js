export default function AreDeepEqual(obj1, obj2) {
    // Check if both are null or not objects
    if (obj1 === obj2) return true

    // Check if either is null or not an object
    if (
        typeof obj1 !== "object" ||
        obj1 === null ||
        typeof obj2 !== "object" ||
        obj2 === null
    ) {
        return false
    }

    // Get all keys from both objects
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    // If the number of keys is different, return false
    if (keys1.length !== keys2.length) return false

    // Compare the values of each key recursively
    for (let key of keys1) {
        if (!keys2.includes(key) || !AreDeepEqual(obj1[key], obj2[key])) {
            return false
        }
    }

    return true
}
