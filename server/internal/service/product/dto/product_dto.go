package dto

type Product struct {
	ID          string              `json:"_id"`
	CategoryId  int                 `json:"categoryId"`
	Title       string              `json:"title"`
	ProductCode string              `json:"productCode"`
	Description string              `json:"description"`
	SizeToPrice []map[string]string `json:"sizeToPrice"`
	Image       string              `json:"image"`
}

type GetProductsResponse struct {
	Products []Product `json:"products"`
}

type DeleteProductRequest struct {
	ID string `json:"id"`
}
