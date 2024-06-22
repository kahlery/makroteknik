import csv
import json
import requests

# Replace with your Google Sheets CSV export link
google_sheets_csv_url = 'https://docs.google.com/spreadsheets/d/1EUiAPqgnJ1Fv2Hx1e61c7O3LGOpmjohixzA1nBGSHvI/export?format=csv'

# Fetch the CSV data from the Google Sheets URL
response = requests.get(google_sheets_csv_url)
response.raise_for_status()  # Ensure the request was successful

print("data:", response.content)
print()

# Decode the CSV content
csv_content = response.content.decode('utf-8')

# Read the CSV data
csv_reader = csv.DictReader(csv_content.splitlines())

# Initialize the list for storing product data
products = []

# Iterate over each row in the CSV and convert it to the desired JSON format
for product_id, row in enumerate(csv_reader):
    product = {
        "productId": product_id,
        "categoryId": int(row['categoryId']),
        "title": row['name'],
        "imageUrl": row['imageURL'],
        "productCode": f"{product_id + 1:04d}",
        "description": row['description']
    }
    products.append(product)

# Convert the list to JSON
products_json = json.dumps(products, indent=4)

# Save the JSON data to a local file
with open('../products.json', 'w') as json_file:
    json_file.write(products_json)

print("products.json has been created successfully.")
