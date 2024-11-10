package image

import (
	"os"
	"strings"

	"api/pkg/log"
)

func logNotSupportedImageExtension() {
	log.LogError("image extension is not supported" +
		"\nsupported image extensions: .jpg, .jpeg, .png, .webp")
}

func isImageExtensionSupported(imageName string) bool {
	if !strings.HasSuffix(imageName, ".jpg") &&
		!strings.HasSuffix(imageName, ".jpeg") &&
		!strings.HasSuffix(imageName, ".png") &&
		!strings.HasSuffix(imageName, ".webp") {
		logNotSupportedImageExtension()
		return false
	}

	return true
}

func ListAllImagesFromDirectory(directory string) ([]string, error) {
	// Read all files in the directory
	files, err := os.ReadDir(directory)
	if err != nil {
		return nil, err
	}

	// Loop through the files
	var images []string
	for _, file := range files {
		// Check if the image extension is supported
		if !isImageExtensionSupported(file.Name()) {
			logNotSupportedImageExtension()
			return nil, nil
		}

		// Append the image to the list
		images = append(images, file.Name())
	}

	return images, nil
}

func BufferSingleImageFromDirectory(directory, imageName string) ([]byte, error) {
	// Check if the image extension is supported
	if !isImageExtensionSupported(imageName) {
		logNotSupportedImageExtension()
		return nil, nil
	}

	// LogWorkingEnv()

	// Read the image
	imageBytes, err := os.ReadFile(directory + "/" + imageName)
	if err != nil {
		return nil, err
	}

	return imageBytes, nil
}

func SaveImageToDirectory(directory, imageName string, imageBytes []byte) error {
	// Check if the image extension is supported
	if !isImageExtensionSupported(imageName) {
		logNotSupportedImageExtension()
		return nil
	}

	// Write the image to the directory
	if err := os.WriteFile(directory+"/"+imageName, imageBytes, 0644); err != nil {
		return err
	}

	return nil
}

func DeleteImageFromDirectory(directory, imageName string) error {
	// Check if the image extension is supported
	if !isImageExtensionSupported(imageName) {
		logNotSupportedImageExtension()
		return nil
	}

	// Delete the image from the directory
	if err := os.Remove(directory + "/" + imageName); err != nil {
		return err
	}

	return nil
}
