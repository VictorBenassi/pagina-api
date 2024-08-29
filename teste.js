// The following was placed here for relevance but should be added to imports.
// To generate content, use this import path for GoogleGenerativeAI.
// Note that this is a different import path than what you use for the File API.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  // Choose a Gemini model.
  model: "gemini-1.5-pro",
});

// Upload file ...

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: "Describe how this product might be manufactured." },
  ]);

// Output the generated text to the console
console.log(result.response.text())