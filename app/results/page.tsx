"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Utility function to format currency in Indian Rupees
const formatPrice = (price: string | number) => {
  if (!price || price === "N/A") return "N/A";
  
  // Extract numeric value from price string
  let numericPrice = typeof price === 'string' ? 
    parseFloat(price.replace(/[^0-9.]/g, '')) : price;
  
  if (isNaN(numericPrice)) return "N/A";
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};

// Utility function to format compact numbers
const formatCompactPrice = (price: number) => {
  if (isNaN(price)) return "N/A";
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(price);
};

export default function ResultsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const reviewData = localStorage.getItem("reviewData");
    if (reviewData) {
      try {
        const parsedData = JSON.parse(reviewData);
        setData(parsedData);
      } catch (error) {
        console.error("Error parsing review data:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Analysis Data Found</h2>
          <p className="text-gray-600 mb-4">Please analyze a product first.</p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number = 0) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));

  // Fallbacks for missing nested fields
  const rating = data?.rating?.average ?? 0;
  const ratingCount = data?.rating?.count ?? 0;
  const positive = data?.analysis?.sentiment?.positive ?? 0;
  const neutral = data?.analysis?.sentiment?.neutral ?? 0;
  const negative = data?.analysis?.sentiment?.negative ?? 0;
  const keyInsights = data?.analysis?.keyInsights ?? [];
  const pros = data?.analysis?.pros ?? [];
  const cons = data?.analysis?.cons ?? [];
  const priceCurrent = data?.price?.current ?? "N/A";
  const priceOriginal = data?.price?.original ?? "N/A";
  const priceDiscount = data?.price?.discount;
  const competitor = data?.competitorAnalysis ?? {};
  const reviews = data?.reviews ?? {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Product Analysis Results</h1>
          </div>
          <Badge variant="outline">
            Updated: {new Date(data?.lastUpdated ?? Date.now()).toLocaleDateString()}
          </Badge>
        </div>

        {/* Product Overview */}
        <Card className="p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{data?.title ?? "N/A"}</h2>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating}/5 ({ratingCount} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">{formatPrice(priceCurrent)}</span>
                {priceOriginal && priceOriginal !== 'N/A' && (
                  <span className="text-lg text-gray-500 line-through">{formatPrice(priceOriginal)}</span>
                )}
                {priceDiscount && (
                  <Badge className="bg-red-100 text-red-800">{priceDiscount} OFF</Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <a href={data?.productUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                <Button className="w-full">View on Amazon</Button>
              </a>
            </div>
          </div>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Sentiment Analysis</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{positive}%</div>
              <div className="text-sm text-gray-600">Positive</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{neutral}%</div>
              <div className="text-sm text-gray-600">Neutral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{negative}%</div>
              <div className="text-sm text-gray-600">Negative</div>
            </div>
          </div>
          <div className="space-y-2">
            {keyInsights.map((insight: string, idx: number) => (
              <div key={idx} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Price History */}
        {data?.price?.history && (
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Price History</h3>
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatCompactPrice(data.price.comparison?.lowest) || 'N/A'}</div>
                <div className="text-sm text-gray-600">Lowest Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatCompactPrice(data.price.comparison?.average) || 'N/A'}</div>
                <div className="text-sm text-gray-600">Average Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{formatCompactPrice(data.price.comparison?.highest) || 'N/A'}</div>
                <div className="text-sm text-gray-600">Highest Price</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${data.price.comparison?.trend === 'increasing' ? 'text-red-600' : 'text-green-600'}`}>
                  {data.price.comparison?.trend === 'increasing' ? (
                    <TrendingUp className="w-6 h-6 mx-auto" />
                  ) : (
                    <TrendingDown className="w-6 h-6 mx-auto" />
                  )}
                </div>
                <div className="text-sm text-gray-600">Price Trend</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Recent Price Changes:</h4>
              {data.price.history.slice(-5).map((entry: any, idx: number) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{entry.date}</span>
                  <span className="font-medium">{formatPrice(entry.price)}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-green-600">Pros</h3>
            <div className="space-y-2">
              {pros.map((p: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{p}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-red-600">Cons</h3>
            <div className="space-y-2">
              {cons.map((c: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2">
                  <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Product Features */}
        {data?.features && data.features.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {data.features.slice(0, 10).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Product Images */}
        {data?.images && data.images.length > 0 && (
          <Card className="p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Product Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.images.slice(0, 8).map((image: string, idx: number) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`Product image ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Other sections like Price, Reviews, Recommendations, Product Details */}
        {/* You can add optional chaining for all nested fields here similarly */}
      </div>
    </div>
  );
}
