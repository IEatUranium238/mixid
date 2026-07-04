interface Settings {
  randomBlockSize?: number;
  customBlockFiller?: string;
  noSpecialCharsInBlockFiller?: boolean;
  encrypt?: boolean;
}

/**
* Generate a Mixid string
* @param data Data to blend in with randomness
* @param settings Mixid settings
* @returns Mixid string
*/
export async function generateMixid(
  data: any[],
  settings?: Settings,
): Promise<string> {
  const useEncryption = settings?.encrypt ?? true;
  const randomBlockSize = settings?.randomBlockSize ?? 16;
  const chars =
    settings?.customBlockFiller ??
    (settings?.noSpecialCharsInBlockFiller
      ? "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789"
      : "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#$%^&*()_+-=~`./\\\'\"");

  // Check if any data was given
  if (data.length === 0) {
    throw new Error("Mixid - supply atleast 1 peice of data to blend!");
  }

  // Arrow function to generate random characters
  const genRandomChars = () => {
    return Array.from(
      { length: randomBlockSize },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
  };

  // Generate raw string
  let raw: string = "";

  for (let i = 0; i < data.length; i++) {
    raw += data[i] + genRandomChars();
  }

  // Return raw string if set not to use encryption.
  if (!useEncryption) {
    return raw;
  }

  // Encrypt data
  const encoder = new TextEncoder();
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(raw));

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
