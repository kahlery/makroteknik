package dto

type Product struct {
	ID          string              `json:"_id"`
	CategoryID  string              `json:"categoryID"`
	Title       string              `json:"title"`
	ProductCode string              `json:"productCode"`
	Description string              `json:"description"`
	SizeToPrice []map[string]string `json:"sizeToPrice"`
	Image       string              `json:"image"`
	IsPDFExist  bool                `json:"isPDFExist"`
	ImageName   string              `json:"imageName"`
}

type GetProductsResponse struct {
	Products []Product `json:"products"`
}

type DeleteProductRequest struct {
	ID string `json:"id"`
}

type PostProductResponse struct {
	ProductID string `json:"productID"`
}
