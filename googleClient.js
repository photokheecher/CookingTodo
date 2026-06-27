import dotenv from 'dotenv';

dotenv.config();

const modelId = process.env.GOOGLE_MODEL_ID || 'gemini-flash-latest';
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error('Missing GOOGLE_API_KEY environment variable.');
}

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelId)}:generateContent`;

export async function generateCookingPlan(prompt) {
  const body = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API request failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const json = await response.json();
  const output = json.candidates?.[0]?.content?.parts?.[0]?.text || json.candidates?.[0]?.output || json.output || JSON.stringify(json, null, 2);
  return output;
}
