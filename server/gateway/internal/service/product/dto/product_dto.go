package dto

type GetProductsResponse struct {
	ID          string `json:"_id"`
	CategoryId  int    `json:"categoryId"`
	Title       string `json:"title"`
	ImageUrl    string `json:"imageUrl"`
	ProductCode string `json:"productCode"`
	Description string `json:"description"`
}
