const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function fetchOpenAICompletions(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 0.7,
    });

    const recipeResponse = JSON.parse(completion.choices[0].message.content);
    return recipeResponse;
  } catch (error) {
    console.error("Error fetching data from OpenAI API:", error);
    throw new Error("Error fetching data from OpenAI API.");
  }
}

module.exports = {
  fetchOpenAICompletions,
};