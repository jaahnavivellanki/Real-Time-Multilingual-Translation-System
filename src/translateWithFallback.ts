/**
 * Translation utility with fallback system
 * Tries multiple API endpoints in order and falls back to the next if one fails
 */

interface TranslationResponse {
  translatedText: string;
}

interface MyMemoryResponse {
  responseStatus: number;
  responseData?: {
    translatedText: string;
  };
}

const API_ENDPOINTS = [
  {
    url: 'https://libretranslate.de/translate',
    name: 'LibreTranslate DE',
    timeout: 8000,
  },
  {
    url: 'https://translate.astian.org/translate',
    name: 'Astian Translate',
    timeout: 8000,
  },
  {
    url: 'https://api.mymemory.translated.net/get',
    name: 'MyMemory',
    timeout: 8000,
    isMyMemory: true,
  },
];

/**
 * Normalizes API response to standard format
 */
function normalizeResponse(
  data: any,
  isMyMemory: boolean = false
): TranslationResponse {
  if (isMyMemory) {
    const translated = data?.responseData?.translatedText ?? '';
    return { translatedText: translated };
  }
  const translated = data?.translatedText ?? '';
  return { translatedText: translated };
}

/**
 * Translates text using fallback system
 * Tries each API in order until one succeeds
 */
export async function translateWithFallback(
  text: string,
  source: string,
  target: string
): Promise<string> {
  const trimmedText = text.trim();
  if (!trimmedText) {
    throw new Error('Text cannot be empty');
  }

  let lastError: Error | null = null;

  for (const endpoint of API_ENDPOINTS) {
    try {
      const result = await translateWithTimeout(
        trimmedText,
        source,
        target,
        endpoint
      );
      return result.translatedText;
    } catch (error) {
      lastError = error as Error;
      // Continue to next endpoint on failure
      continue;
    }
  }

  // All endpoints failed
  throw new Error(
    lastError?.message ||
      'Translation service temporarily unavailable. Please try again later.'
  );
}

/**
 * Translates with a specific endpoint and timeout
 */
async function translateWithTimeout(
  text: string,
  source: string,
  target: string,
  endpoint: (typeof API_ENDPOINTS)[0]
): Promise<TranslationResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), endpoint.timeout);

  try {
    let requestBody: any;
    let headers: any = { 'Content-Type': 'application/json' };

    if (endpoint.isMyMemory) {
      // MyMemory uses different parameter format
      const params = new URLSearchParams({
        q: text,
        langpair: `${source}|${target}`,
      });
      const url = `${endpoint.url}?${params.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`${endpoint.name} request failed: ${response.status}`);
      }

      const data: MyMemoryResponse = await response.json();

      if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
        throw new Error(`${endpoint.name} returned no translation`);
      }

      return normalizeResponse(data, true);
    } else {
      // LibreTranslate and Astian use same format
      requestBody = {
        q: text,
        source,
        target,
        format: 'text',
      };

      const response = await fetch(endpoint.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`${endpoint.name} request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.translatedText) {
        throw new Error(`${endpoint.name} returned no translation`);
      }

      return normalizeResponse(data);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(`${endpoint.name} request timeout`);
      }
      throw error;
    }
    throw new Error(`${endpoint.name} request failed`);
  } finally {
    clearTimeout(timeoutId);
  }
}
