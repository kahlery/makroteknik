package dto

type Product struct {
	ID          string            `json:"_id"`
	Category    string            `json:"category"`
	Title       string            `json:"title"`
	ProductCode string            `json:"product_code"`
	Description string            `json:"description"`
	SizeToPrice map[string]string `json:"size_2_price"`

	IsPDFExist bool `json:"is_pdf_exist"`

	ImageName string `json:"image_name"`
	ImageUrl  string `json:"image_url"`
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
