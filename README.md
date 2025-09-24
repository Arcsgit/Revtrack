# RevTrack - Amazon Product Analyzer

RevTrack is a comprehensive Next.js application that analyzes Amazon products by scraping product details, prices, reviews, and provides intelligent insights to help users make informed purchasing decisions.

## Features

- **Product Analysis**: Extract detailed product information including title, price, ratings, availability, features, and images
- **Price History Tracking**: View price trends and historical data (with mock data for demonstration)
- **Review Analysis**: Scrape and analyze customer reviews with sentiment analysis
- **AI-Powered Insights**: Generate pros/cons and key insights from customer feedback
- **Price Comparison**: Compare current prices with historical data and identify trends
- **Responsive Design**: Modern, mobile-friendly interface with Tailwind CSS
- **Real-time Scraping**: Uses Playwright for robust web scraping that bypasses basic anti-bot measures

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Python 3.13** - Web scraping scripts
- **Playwright** - Browser automation for scraping
- **BeautifulSoup4** - HTML parsing
- **Requests** - HTTP library for Python

### Database & Auth
- **Supabase** - Database and authentication (configured but optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.13+
- Git

### Installation

1. **Clone the repository**
   ```bash
   cd /path/to/your/project
   # Your project is already here at /Users/archit/Downloads/REVTRACK/Frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Set up Python virtual environment** (Already done)
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install playwright beautifulsoup4 requests
   playwright install
   ```

4. **Environment Variables**
   Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## How to Use

1. **Open the application** in your browser at `http://localhost:3000`

2. **Enter an Amazon product URL** in the search box. For example:
   ```
   https://www.amazon.com/dp/B08N5WRWNW
   https://www.amazon.in/dp/B0D1TX35MQ
   ```

3. **Click "Analyze"** and wait for the scraping to complete (usually 30-60 seconds)

4. **View the results** which include:
   - Product details and images
   - Current pricing and discounts
   - Price history and trends
   - Customer review sentiment analysis
   - Pros and cons extracted from reviews
   - Key insights and recommendations

## API Endpoints

### `POST /api/analyze`
Comprehensive product analysis endpoint that:
- Scrapes product data using `scripts/product.py`
- Analyzes reviews using `scripts/script2.py`
- Generates price history and insights
- Returns structured JSON with all analysis data

### `POST /api/scrape` (Legacy)
Basic scraping endpoint for reviews only.

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── (auth-pages)/            # Authentication pages
│   ├── api/                     # API routes
│   │   ├── analyze/             # Main analysis endpoint
│   │   └── scrape/              # Legacy scrape endpoint
│   ├── results/                 # Results display page
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   └── page.js                  # Home page
├── components/                   # React components
│   ├── Hero/                    # Landing page components
│   └── ui/                      # Reusable UI components
├── lib/                         # Utility libraries
│   ├── scraper.ts               # Scraping utilities
│   └── utils.ts                 # General utilities
├── scripts/                     # Python scraping scripts
│   ├── product.py               # Product data scraping
│   ├── script2.py               # Review scraping
│   └── newscript.py             # Additional utilities
├── utils/                       # Next.js utilities
└── .venv/                       # Python virtual environment
```

## Key Features Implemented

### 1. Robust Web Scraping
- **Playwright Integration**: Handles JavaScript-heavy pages and bypasses basic anti-bot measures
- **Rate Limiting Protection**: Implements exponential backoff and retry logic
- **User Agent Rotation**: Uses multiple user agents to avoid detection
- **Error Handling**: Comprehensive error handling for network issues and rate limits

### 2. Comprehensive Analysis
- **Product Data**: Title, price, ratings, availability, features, images
- **Price Analysis**: Historical trends, lowest/highest prices, price direction
- **Review Sentiment**: Positive/negative/neutral sentiment analysis
- **Insights Generation**: Automated pros/cons and key insights

### 3. Modern UI/UX
- **Responsive Design**: Works on all device sizes
- **Loading States**: Progress indicators during analysis
- **Error States**: User-friendly error messages
- **Interactive Elements**: Hover effects and smooth animations

### 4. Performance Optimizations
- **Virtual Environment**: Isolated Python dependencies
- **Concurrent Processing**: Parallel scraping of product data and reviews
- **Efficient Caching**: Build-time optimizations
- **Lazy Loading**: Components and images loaded on demand

## Troubleshooting

### Common Issues

1. **Python command not found**
   - Ensure Python 3.13+ is installed
   - The virtual environment is properly activated
   - Scripts use the virtual environment's Python path

2. **Playwright browser not found**
   ```bash
   source .venv/bin/activate
   playwright install
   ```

3. **Rate limiting issues**
   - Wait a few minutes between requests
   - The application includes automatic retry logic
   - Some Amazon regions have stricter rate limiting

4. **Build failures**
   - Ensure all dependencies are installed: `npm install`
   - Check that Python virtual environment is properly set up
   - Verify environment variables are correctly configured

### Performance Tips

- **First analysis** may take longer as browsers are initialized
- **Subsequent requests** are faster due to caching
- **Complex products** with many reviews take longer to analyze
- **Rate limiting** may slow down requests during peak hours

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## Future Enhancements

- **Real Price History**: Store historical price data in database
- **Multiple Platforms**: Support for other e-commerce sites
- **Advanced Analytics**: Machine learning for better insights
- **User Accounts**: Save favorite products and price alerts
- **API Rate Management**: More sophisticated rate limiting
- **Competitor Analysis**: Compare prices across multiple sellers
- **Mobile App**: React Native or Flutter mobile application

## License

This project is for educational and personal use. Be sure to comply with Amazon's Terms of Service and robots.txt when scraping.

## Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Review the console logs for error details
3. Ensure all dependencies are properly installed
4. Verify that the Amazon URL is valid and accessible

---

**Made with ❤️ using Next.js and Python**