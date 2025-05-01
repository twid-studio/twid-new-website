export function useLanguageContent(contentObject, currentLang) {
  // Validate inputs
  if (!contentObject || typeof contentObject !== 'object') {
    console.warn('Invalid content object provided to useLanguageContent');
    return null;
  }
  
  // Normalize language code
  const lang = currentLang?.toLowerCase();
  
  // Primary language: Ukrainian
  if (lang === 'ua' && contentObject.ua !== undefined) {
    return contentObject.ua;
  }
  
  // Secondary language: English
  if (lang === 'en' && contentObject.en !== undefined) {
    return contentObject.en;
  }
  
  // Fallback logic - if requested language not available
  if (contentObject.ua !== undefined) {
    return contentObject.ua; // Default to Ukrainian if available
  }
  
  if (contentObject.en !== undefined) {
    return contentObject.en; // Fallback to English if Ukrainian not available
  }
  
  // Last resort - return any first value if neither ua nor en available
  const availableKeys = Object.keys(contentObject);
  if (availableKeys.length > 0) {
    console.warn(`Neither 'ua' nor 'en' found in content, using '${availableKeys[0]}'`);
    return contentObject[availableKeys[0]];
  }
  
  return null;
}