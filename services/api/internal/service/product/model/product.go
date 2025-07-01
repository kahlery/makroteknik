package model

type Product struct {
	ID               string            `bson:"_id,omitempty" json:"_id"`
	Category         string            `bson:"category" json:"category"`
	Title            string            `bson:"title" json:"title"`
	ProductCode      string            `bson:"product_code" json:"product_code"`
	Description      string            `bson:"description" json:"description"`
	SizeToPrice      map[string]string `bson:"size_2_price" json:"size_2_price"`
	Supplier         string            `bson:"supplier" json:"supplier"`
	OriginalImageUrl string            `bson:"original_image_url" json:"original_image_url"`
}
