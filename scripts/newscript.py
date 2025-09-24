import requests
import json
from bs4 import BeautifulSoup
import time
import sys
import random

# Headers for the HTTP request
headers = {
    'authority': 'www.amazon.com',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9,bn;q=0.8',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
}

if len(sys.argv) < 2:
    print("Please provide the Amazon review URL.", file=sys.stderr)
    sys.exit(1)

reviews_url = sys.argv[1]
max_pages = 10  # Set a higher maximum to retrieve sufficient reviews

# Function to retrieve HTML from multiple pages
def reviewsHtml(url, max_pages):
    soups = []
    for page_no in range(1, max_pages + 1):
        paginated_url = f"{url}?pageNumber={page_no}"
        response = requests.get(paginated_url, headers=headers)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            soups.append(soup)
            time.sleep(2)  # Be respectful with delays between requests
        else:
            print(f"Failed to retrieve page {page_no}. Status code: {response.status_code}", file=sys.stderr)
            break

    return soups

# Function to extract reviews from HTML
def getReviews(html_data):
    data_dicts = []
    boxes = html_data.select('div[data-hook="review"]')

    for box in boxes:
        try:
            stars = box.select_one('[data-hook="review-star-rating"]').text.strip().split(' out')[0]
        except Exception:
            stars = 'N/A'

        try:
            description = box.select_one('[data-hook="review-body"]').text.strip()
        except Exception:
            description = 'N/A'

        data_dict = {
            'Stars': stars,
            'Description': description
        }
        data_dicts.append(data_dict)
    
    return data_dicts

# Retrieve reviews from multiple pages
html_datas = reviewsHtml(reviews_url, max_pages)
all_reviews = []

for html_data in html_datas:
    review = getReviews(html_data)
    all_reviews.extend(review)

# Randomly select 50 reviews if we have more than 50
if len(all_reviews) > 50:
    selected_reviews = random.sample(all_reviews, 50)
else:
    selected_reviews = all_reviews

# Output the JSON data
print(json.dumps(selected_reviews, indent=2))
