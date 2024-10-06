// server/gateway/internal/service/product/model/product.go

package model

type Product struct {
	ID          string              `json:"_id"`
	CategoryId  int                 `json:"categoryId"`
	Title       string              `json:"title"`
	ImageUrl    string              `json:"imageUrl"`
	ProductCode string              `json:"productCode"`
	Description string              `json:"description"`
	SizeToPrice []map[string]string `json:"sizeToPrice"`
}
