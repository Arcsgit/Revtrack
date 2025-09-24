import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds base delay

// Function to sleep for a given number of milliseconds
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Function to calculate exponential backoff delay
const getRetryDelay = (attempt: number) => RETRY_DELAY * Math.pow(2, attempt);

// Function to run Python script with retry logic
async function runPythonScriptWithRetry(scriptName: string, url: string, maxRetries: number = MAX_RETRIES): Promise<any> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await new Promise<any>((resolve, reject) => {
        console.log(`Attempting to run ${scriptName}, attempt ${attempt + 1}/${maxRetries + 1}`);

        const pythonPath = path.join(process.cwd(), '.venv', 'bin', 'python');
        const childProcess = spawn(pythonPath, [`scripts/${scriptName}`, url]);
        let data = '';
        let error = '';
        let timeout: NodeJS.Timeout;

        // Set a timeout for the process
        timeout = setTimeout(() => {
          childProcess.kill();
          reject(new Error(`Process timed out after 60 seconds`));
        }, 60000);

        childProcess.stdout.on('data', (chunk) => {
          data += chunk;
        });

        childProcess.stderr.on('data', (chunk) => {
          error += chunk;
        });

        childProcess.on('close', (code) => {
          clearTimeout(timeout);

          if (code !== 0) {
            const errorMessage = `Process exited with code ${code}: ${error}`;
            console.error(`Script ${scriptName} failed:`, errorMessage);

            // Check if this is a rate limiting error
            if (error.includes('429') || error.includes('rate limit') || error.includes('too many requests')) {
              reject(new Error('RATE_LIMITED'));
              return;
            }

            reject(new Error(errorMessage));
            return;
          }

          try {
            const jsonData = JSON.parse(data);
            console.log(`${scriptName} completed successfully`);
            resolve(jsonData);
          } catch (e) {
            reject(new Error(`Failed to parse JSON response: ${e}`));
          }
        });

        childProcess.on('error', (err) => {
          clearTimeout(timeout);
          reject(new Error(`Failed to start process: ${err.message}`));
        });
      });
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      // If this is the last attempt, don't retry
      if (attempt === maxRetries) {
        break;
      }

      // Check if error is rate limiting related
      if (error.message === 'RATE_LIMITED') {
        const delay = getRetryDelay(attempt);
        console.log(`Rate limited detected, waiting ${delay}ms before retry...`);
        await sleep(delay);
        continue;
      }

      // For other errors, wait before retrying
      const delay = getRetryDelay(attempt);
      console.log(`Retrying in ${delay}ms...`);
      await sleep(delay);
    }
  }

  // If we get here, all retries failed
  throw lastError || new Error('All retry attempts failed');
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Valid URL is required' }, { status: 400 });
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    console.log("Starting comprehensive scraping process for:", url);

    try {
      // First, scrape product data
      console.log("Scraping product data...");
      const productData = await runPythonScriptWithRetry('product.py', url);
      
      if (productData.error) {
        return NextResponse.json({ error: productData.error }, { status: 400 });
      }

      // Extract reviews URL from the product URL
      const reviewsUrl = url.replace(/\/dp\//, '/product-reviews/').replace(/\?.*$/, '') + '/ref=cm_cr_dp_d_show_all_btm?pageNumber=1&sortBy=recent';
      
      console.log("Scraping reviews...");
      let reviewsData = [];
      try {
        reviewsData = await runPythonScriptWithRetry('script2.py', reviewsUrl);
        if (reviewsData.error) {
          console.warn("Failed to scrape reviews:", reviewsData.error);
          reviewsData = [];
        }
      } catch (error) {
        console.warn("Failed to scrape reviews:", error);
        reviewsData = [];
      }

      // Combine the data
      const combinedData = {
        title: productData.data?.title || "N/A",
        productUrl: url,
        price: {
          current: productData.data?.price || "N/A",
          original: productData.data?.original_price || null,
          discount: productData.data?.discount_percentage ? `${productData.data.discount_percentage}%` : null
        },
        rating: {
          average: parseFloat(productData.data?.rating) || 0,
          count: parseInt(productData.data?.reviewCount) || 0
        },
        availability: productData.data?.availability || "N/A",
        images: productData.data?.images || [],
        features: productData.data?.features || [],
        description: productData.data?.description || "N/A",
        asin: productData.data?.asin || "N/A",
        reviews: Array.isArray(reviewsData) ? reviewsData.slice(0, 50) : [],
        analysis: {
          sentiment: {
            positive: Math.floor(Math.random() * 40) + 40, // Mock data for now
            neutral: Math.floor(Math.random() * 30) + 20,
            negative: Math.floor(Math.random() * 20) + 10
          },
          keyInsights: [
            "Most customers are satisfied with the product quality",
            "Delivery time is generally as expected",
            "Value for money is considered good by majority"
          ],
          pros: [
            "Good build quality",
            "Fast shipping",
            "Reasonable price"
          ],
          cons: [
            "Some packaging issues reported",
            "Limited color options"
          ]
        },
        lastUpdated: new Date().toISOString()
      };

      console.log("Scraping completed successfully");
      return NextResponse.json(combinedData);
    } catch (error: any) {
      console.error("Scraping failed:", error.message);

      // Handle specific error types
      if (error.message === 'RATE_LIMITED') {
        return NextResponse.json({
          error: 'Rate limit exceeded. Please try again later.',
          details: 'The scraping service is currently rate limited. Please wait a few minutes before trying again.'
        }, { status: 429 });
      }

      if (error.message.includes('timed out')) {
        return NextResponse.json({
          error: 'Request timed out',
          details: 'The scraping process took too long. Please try again.'
        }, { status: 408 });
      }

      return NextResponse.json({
        error: 'Failed to process request',
        details: error.message
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Request processing error:", error.message);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
