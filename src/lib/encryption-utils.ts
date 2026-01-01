// Simple substitution cipher implementation for Encryptz
// Each encryption language will have its own unique substitution mapping

// Generate a unique substitution mapping based on the encryption ID
function generateSubstitutionMap(encryptionId: string): { encryptMap: Map<string, string>, decryptMap: Map<string, string> } {
  // Create a deterministic seed based on the encryption ID
  let seed = 0;
  for (let i = 0; i < encryptionId.length; i++) {
    seed = (seed * 31 + encryptionId.charCodeAt(i)) % 1000000;
  }
  
  // Create character sets for substitution
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>? ';
  const charArray = chars.split('');
  
  // Shuffle the array using the seed
  const shuffledChars = [...charArray];
  for (let i = shuffledChars.length - 1; i > 0; i--) {
    // Simple pseudo-random number generator using the seed
    seed = (seed * 9301 + 49297) % 233280;
    const r = (seed / 233280) * (i + 1);
    const j = Math.floor(r);
    [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];
  }
  
  // Create the substitution maps
  const encryptMap = new Map<string, string>();
  const decryptMap = new Map<string, string>();
  
  for (let i = 0; i < charArray.length; i++) {
    encryptMap.set(charArray[i], shuffledChars[i]);
    decryptMap.set(shuffledChars[i], charArray[i]);
  }
  
  return { encryptMap, decryptMap };
}

export function encryptText(text: string, encryptionId: string): string {
  const { encryptMap } = generateSubstitutionMap(encryptionId);
  return text.split('').map(char => encryptMap.get(char) || char).join('');
}

export function decryptText(text: string, encryptionId: string): string {
  const { decryptMap } = generateSubstitutionMap(encryptionId);
  return text.split('').map(char => decryptMap.get(char) || char).join('');
}

// Validate that the encrypted text can be decrypted with this encryption
export function validateDecryption(text: string, encryptionId: string): boolean {
  try {
    const decrypted = decryptText(text, encryptionId);
    const reEncrypted = encryptText(decrypted, encryptionId);
    // The re-encrypted text should match the original encrypted text
    return reEncrypted === text;
  } catch {
    return false;
  }
}