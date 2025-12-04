// Simple in-memory cache for API requests
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cachedFetch = async (url) => {
  const now = Date.now();
  
  // Check if we have a valid cached response
  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (now - timestamp < CACHE_DURATION) {
      // console.log(`✅ Cache hit for ${url}`);
      return data;
    }
  }
  
  // Fetch fresh data
  // console.log(`🌐 Fetching ${url}`);
  const response = await fetch(url);
  const data = await response.json();
  
  // Store in cache
  cache.set(url, { data, timestamp: now });
  
  return data;
};
