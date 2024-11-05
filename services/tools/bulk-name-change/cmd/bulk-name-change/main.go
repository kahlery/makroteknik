// bulk-name-change is a tool to change the name of the each image file in the specified directory.
// if the filename and image url in the database are matched, the filename will be changed to _id of the product.

package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"bulk-name-change/internal"
	"bulk-name-change/internal/config"
	"bulk-name-change/internal/db"
	"bulk-name-change/internal/util"
)

func main() {
	// Parse the flags
	flag.Parse()

	// Get the directory path
	dirPath := flag.Arg(0)
	if dirPath == "" {
		fmt.Println("directory path is required")
		os.Exit(1)
	}

	// Get the configuration
	cfg, err := config.GetConfig()
	if err != nil {
		fmt.Println("failed to get the configuration:", err)
		os.Exit(1)
	}

	// Connect to the database
	client, err := db.Connect(cfg)
	if err != nil {
		fmt.Println("failed to connect to the database:", err)
		os.Exit(1)
	}

	// Get the product service
	productService := internal.NewProductService(client)

	// Get the files in the directory
	files, err := os.ReadDir(dirPath)
	if err != nil {
		fmt.Println("failed to read the directory:", err)
		os.Exit(1)
	}

	// Loop through the files
	for _, file := range files {
		// Check if the file is an image
		if !strings.HasSuffix(file.Name(), ".jpg") && !strings.HasSuffix(file.Name(), ".jpeg") && !strings.HasSuffix(file.Name(), ".png") {
			continue
		}

		// Get the product by image URL
		product, err := productService.GetProductByImageURL(file.Name())
		if err != nil {
			fmt.Println("failed to get the product by image URL:", err)
			continue
		}

		// Check if the product is found
		if product == nil {
			fmt.Println("product not found for image:", file.Name())
			continue
		}

		// Get the new file name
		newFileName := fmt.Sprintf("%s%s", product.ID.Hex(), filepath.Ext(file.Name()))

		// Rename the file
		err = os.Rename(filepath.Join(dirPath, file.Name()), filepath.Join(dirPath, newFileName))
		if err != nil {
			fmt.Println("failed to rename the file:", err)
			continue
		}

		// Log the success
		util.LogSuccess(fmt.Sprintf("file renamed: %s -> %s", file.Name(), newFileName))
	}
}
