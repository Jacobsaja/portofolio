/**
 * Utilities for experimental UI effects
 */

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:"<>?~`-=[]\\;\',./'

/**
 * Decrypt text effect for React components
 * Returns a scrambled version of the text that gradually resolves to the original text
 * based on the progress parameter (0 to 1).
 */
export function getDecryptedText(originalText, progress) {
  if (progress >= 1) return originalText;
  if (progress <= 0) return originalText.split('').map(char => char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
  
  let result = '';
  const resolveIndex = Math.floor(progress * originalText.length);
  
  for (let i = 0; i < originalText.length; i++) {
    if (i < resolveIndex || originalText[i] === ' ') {
      result += originalText[i];
    } else {
      result += CHARS[Math.floor(Math.random() * CHARS.length)];
    }
  }
  
  return result;
}
