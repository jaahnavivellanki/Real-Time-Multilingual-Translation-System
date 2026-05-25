/**
 * Translation processing layer for smart, context-aware translations
 * Handles pre-processing (greeting detection), name preservation, and post-processing
 */

// Greeting mappings for different target languages
const GREETING_MAPPINGS: Record<string, Record<string, string>> = {
  hi: {
    'hello': 'नमस्ते',
    'hi': 'नमस्ते',
    'hey': 'नमस्ते',
    'good morning': 'सुप्रभात',
    'good afternoon': 'नमस्ते',
    'good evening': 'शुभ संध्या',
    'good night': 'शुभ रात्रि',
    'goodbye': 'अलविदा',
    'bye': 'अलविदा',
  },
  es: {
    'hello': 'hola',
    'hi': 'hola',
    'hey': '¡hey!',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good evening': 'buenas noches',
    'goodbye': 'adiós',
    'bye': 'adiós',
  },
  fr: {
    'hello': 'bonjour',
    'hi': 'salut',
    'hey': 'hey',
    'good morning': 'bonjour',
    'good afternoon': 'bonjour',
    'good evening': 'bonsoir',
    'goodbye': 'au revoir',
    'bye': 'au revoir',
  },
  de: {
    'hello': 'hallo',
    'hi': 'hi',
    'hey': 'hey',
    'good morning': 'guten morgen',
    'good afternoon': 'guten tag',
    'good evening': 'guten abend',
    'goodbye': 'auf wiedersehen',
    'bye': 'auf wiedersehen',
  },
};

// Common literal translations that should be corrected
const TRANSLATION_CORRECTIONS: Record<string, Record<string, string>> = {
  hi: {
    'हैलो': 'नमस्ते',
    'हाय': 'नमस्ते',
    'अलविदा': 'अलविदा', // Keep as is
  },
};

/**
 * Detects if a word is likely a proper name (capitalized in English)
 */
function isProbablyName(word: string): boolean {
  // Words that are capitalized and not at sentence start are likely names
  return word.length > 0 && word[0] === word[0].toUpperCase() && word.length > 1;
}

/**
 * Extracts proper names from text
 */
function extractNames(text: string): string[] {
  const words = text.split(/\s+/);
  const names: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    // Consider it a name if:
    // 1. It's capitalized
    // 2. It's not at the start of a sentence (or not first word)
    // 3. It's not a known common word
    if (
      word.length > 0 &&
      /^[A-Z]/.test(word) &&
      (i > 0 || text.split(/\s+/).length === 1) &&
      !['The', 'A', 'An', 'And', 'Or', 'But'].includes(word)
    ) {
      // Clean punctuation
      const cleanName = word.replace(/[.,!?;:]/g, '');
      if (cleanName.length > 0) {
        names.push(cleanName);
      }
    }
  }

  return names;
}

/**
 * Pre-processes text for better translation
 * Replaces greetings with their natural equivalents in the target language
 */
export function preprocessText(
  text: string,
  targetLanguage: string
): { processedText: string; replacements: Map<string, string> } {
  let processedText = text;
  const replacements = new Map<string, string>();

  // Get greetings for target language
  const greetings = GREETING_MAPPINGS[targetLanguage];
  if (!greetings) {
    return { processedText, replacements };
  }

  // Replace greetings (case-insensitive)
  Object.entries(greetings).forEach(([greeting, replacement]) => {
    const regex = new RegExp(`\\b${greeting}\\b`, 'gi');
    const matches = processedText.match(regex);

    if (matches) {
      processedText = processedText.replace(regex, replacement);
      // Store the original for tracking
      replacements.set(greeting.toLowerCase(), replacement);
    }
  });

  return { processedText, replacements };
}

/**
 * Post-processes translated text for better quality
 * Fixes common literal translations and formatting issues
 */
export function postprocessText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string
): string {
  let processedText = text;

  // Apply translation corrections if available
  const corrections = TRANSLATION_CORRECTIONS[targetLanguage];
  if (corrections) {
    Object.entries(corrections).forEach(([incorrect, correct]) => {
      const regex = new RegExp(`\\b${incorrect}\\b`, 'g');
      processedText = processedText.replace(regex, correct);
    });
  }

  // Clean up extra spaces
  processedText = processedText.replace(/\s+/g, ' ').trim();

  // Fix spacing around punctuation (if any)
  processedText = processedText.replace(/\s+([.,!?;:])/g, '$1');

  return processedText;
}

/**
 * Creates a placeholder for names to protect them during translation
 */
function replaceNamesWithPlaceholders(
  text: string
): { text: string; nameMap: Map<string, string> } {
  const nameMap = new Map<string, string>();
  let processedText = text;
  let placeholderIndex = 0;

  const names = extractNames(text);

  names.forEach((name) => {
    const placeholder = `__NAME_${placeholderIndex}__`;
    const regex = new RegExp(`\\b${name}\\b`, 'g');
    processedText = processedText.replace(regex, placeholder);
    nameMap.set(placeholder, name);
    placeholderIndex++;
  });

  return { text: processedText, nameMap };
}

/**
 * Restores names from placeholders
 */
function restoreNamesFromPlaceholders(
  text: string,
  nameMap: Map<string, string>
): string {
  let processedText = text;

  nameMap.forEach((name, placeholder) => {
    const regex = new RegExp(placeholder, 'g');
    processedText = processedText.replace(regex, name);
  });

  return processedText;
}

/**
 * Main function to apply all processing layers
 * Used when source and target languages are different (especially for greetings)
 */
export function shouldApplySmartProcessing(
  sourceLanguage: string,
  targetLanguage: string
): boolean {
  // Apply smart processing for these language pairs
  const smartProcessingPairs = [
    'en-hi', // English to Hindi
    'en-es', // English to Spanish
    'en-fr', // English to French
    'en-de', // English to German
  ];

  const pair = `${sourceLanguage}-${targetLanguage}`.toLowerCase();
  return smartProcessingPairs.includes(pair);
}

/**
 * Comprehensive translation preparation
 * Combines greeting replacement and name protection
 */
export function prepareSpeechForTranslation(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
): {
  processedText: string;
  nameMap: Map<string, string>;
  replacements: Map<string, string>;
} {
  // Only apply smart processing for supported language pairs
  if (!shouldApplySmartProcessing(sourceLanguage, targetLanguage)) {
    return {
      processedText: text,
      nameMap: new Map(),
      replacements: new Map(),
    };
  }

  // Step 1: Replace greetings with natural equivalents
  const { processedText: greetingProcessed, replacements } = preprocessText(
    text,
    targetLanguage
  );

  // Step 2: Protect names from translation (only if no greetings were replaced)
  // If greetings were replaced, we're already sending preprocessed text
  const { text: nameProtected, nameMap } = replaceNamesWithPlaceholders(
    greetingProcessed
  );

  return {
    processedText: nameProtected,
    nameMap,
    replacements,
  };
}

/**
 * Post-processes translation result
 * Restores names and applies corrections
 */
export function postprocessTranslationResult(
  translatedText: string,
  nameMap: Map<string, string>,
  targetLanguage: string,
  sourceLanguage: string
): string {
  // Step 1: Restore names
  let result = restoreNamesFromPlaceholders(translatedText, nameMap);

  // Step 2: Apply post-processing corrections
  result = postprocessText(result, targetLanguage, sourceLanguage);

  return result;
}
