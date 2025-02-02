require("dotenv").config();
const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_KEY = process.env.OPENAI_API_KEY;

// Chatbot Route
router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Check if the message is an image generation request.
    if (userMessage.toLowerCase().includes("generate image")) {
      // Remove the trigger phrase from the prompt.
      const prompt = userMessage.replace(/generate image/i, "").trim();

      const imageResponse = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      return res.json({
        image: imageResponse.data.data[0].url,
      });
    } else {
      // For text generation using chat completions, include a system message.
      const chatResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // Change to "gpt-4" if you have access
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage }
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      return res.json({
        reply: chatResponse.data.choices[0].message.content,
      });
    }
  } catch (error) {
    // Handle OpenAI API quota error
    if (error.response && error.response.status === 429) {
      console.error("OpenAI API quota exceeded:", error.response.data);
      return res.status(429).json({ 
        message: "You have exceeded your OpenAI API quota. Please check your billing details." 
      });
    }
    
    // Log detailed error info for debugging
    console.error("Chatbot error:", error.response ? error.response.data : error.message);
    res.status(500).json({ 
      message: "Error processing request", 
      error: error.response ? error.response.data : error.message 
    });
  }
});

module.exports = router;
