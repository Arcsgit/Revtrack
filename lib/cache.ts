// Simple in-memory cache for product analysis results
// This will help avoid re-scraping the same products repeatedly

interface CacheEntry {
  data: any;
  timestamp: number;
  url: string;
}

class SimpleCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  private readonly MAX_ENTRIES = 50; // Maximum number of cached entries

  // Generate cache key from URL
  private getCacheKey(url: string): string {
    try {
      const urlObj = new URL(url);
      // Use the product ID (ASIN) as the cache key
      const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
      return asinMatch ? asinMatch[1] : urlObj.pathname;
    } catch {
      return url;
    }
  }

  // Check if cache entry is still valid
  private isValid(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp < this.CACHE_DURATION;
  }

  // Clean up expired entries
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp >= this.CACHE_DURATION) {
        this.cache.delete(key);
      }
    }
  }

  // Get cached result if available and valid
  get(url: string): any | null {
    const key = this.getCacheKey(url);
    const entry = this.cache.get(key);
    
    if (entry && this.isValid(entry)) {
      console.log(`Cache hit for ${key}`);
      return entry.data;
    }
    
    if (entry) {
      // Remove expired entry
      this.cache.delete(key);
    }
    
    return null;
  }

  // Store result in cache
  set(url: string, data: any): void {
    const key = this.getCacheKey(url);
    
    // Clean up old entries if cache is getting too large
    if (this.cache.size >= this.MAX_ENTRIES) {
      this.cleanup();
      
      // If still too large, remove oldest entries
      if (this.cache.size >= this.MAX_ENTRIES) {
        const oldestKeys = Array.from(this.cache.entries())
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .slice(0, 10)
          .map(([key]) => key);
          
        oldestKeys.forEach(k => this.cache.delete(k));
      }
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      url
    });
    
    console.log(`Cached result for ${key}`);
  }

  // Get cache stats
  getStats(): { size: number; keys: string[] } {
    this.cleanup(); // Clean up first
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
    console.log('Cache cleared');
  }
}

// Export a singleton instance
export const productCache = new SimpleCache();