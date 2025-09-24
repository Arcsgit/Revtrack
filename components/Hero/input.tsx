"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Input = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const router = useRouter();

  // Get URL from query params if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlFromParams = urlParams.get("url");
    if (urlFromParams) {
      setUrl(decodeURIComponent(urlFromParams));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Amazon URLs
    const isValidAmazonUrl = (url: string): boolean => {
      try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        return hostname.includes("amazon") || hostname.includes("amzn");
      } catch {
        return false;
      }
    };

    if (!isValidAmazonUrl(url)) {
      alert("Only Amazon links are allowed");
      return;
    }

    setLoading(true);
    setEstimatedTime(15); // Estimated 15 seconds
    setProgress("Initializing analysis...");
    
    // Progress simulation
    const progressSteps = [
      { text: "Analyzing product page...", time: 2000 },
      { text: "Extracting product details...", time: 4000 },
      { text: "Scraping customer reviews...", time: 6000 },
      { text: "Processing price data...", time: 8000 },
      { text: "Generating insights...", time: 10000 },
      { text: "Finalizing results...", time: 12000 }
    ];
    
    const startTime = Date.now();
    progressSteps.forEach((step, index) => {
      setTimeout(() => {
        if (loading) {
          setProgress(step.text);
          const elapsed = Math.floor((Date.now() - startTime) / 1000);
          setEstimatedTime(Math.max(15 - elapsed, 0));
        }
      }, step.time);
    });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      localStorage.setItem("reviewData", JSON.stringify(data));
      setProgress("Analysis complete! Redirecting...");
      router.push("/results");
    } catch (error: any) {
      console.error("Error:", error);
      setProgress("Analysis failed");
      alert("Failed to analyze product:\n" + error.message);
    } finally {
      setLoading(false);
      setProgress("");
      setEstimatedTime(0);
    }
  };

  return (
    <StyledWrapper>
      <div className="input-wrapper w-80 md:w-[600px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row items-center justify-between w-full"
        >
          <input
            name="url"
            className="input w-full"
            placeholder="https://amazon.com/product-name/dp/..."
            id="url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="Subscribe-btn h-10 w-36"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-gray-800 rounded-full"></div>
                <span>Analyzing</span>
              </div>
            ) : (
              "Analyze"
            )}
          </button>
        </form>
        
        {/* Progress Indicator */}
        {loading && (
          <div className="mt-4 text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-sm mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-gray-800 rounded-full"></div>
                <span className="text-gray-800 font-medium">{progress}</span>
              </div>
              {estimatedTime > 0 && (
                <div className="text-sm text-gray-600">
                  Estimated time remaining: ~{estimatedTime}s
                </div>
              )}
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.max(10, (15 - estimatedTime) * 6.67)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-wrapper {
    height: 45px;
    border-radius: 20px;
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: #292524;
  }

  .input {
    height: 100%;
    border: none;
    outline: none;
    padding-left: 15px;
    background-color: #292524;
    color: white;
    font-size: 1em;
    font-family: var(--font-poppins), sans-serif;
    font-weight: 400;
  }

  .input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #292524 inset;
    -webkit-text-fill-color: #ffffff;
  }

  .Subscribe-btn {
    border: none;
    border-radius: 15px;
    color: black;
    cursor: pointer;
    background-color: #ffffff;
    font-weight: 600;
    font-family: var(--font-poppins), sans-serif;
    font-size: 0.95em;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }

  .Subscribe-btn:hover {
    background-color: #333;
    color: white;
  }

  .Subscribe-btn:active {
    transform: scale(0.95);
  }
`;

export default Input;
