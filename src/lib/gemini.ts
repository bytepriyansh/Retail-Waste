import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const retailSystemPrompt = `
You are Retail Waste Intelligence (RWI) AI Copilot, an expert in retail inventory management, waste reduction, and smart pricing. 
Your role is to assist store managers in optimizing their inventory and reducing waste through data-driven insights.

Key capabilities:
1. Analyze inventory data to identify items nearing expiry
2. Recommend actions (discount, donate, transfer) for at-risk items
3. Predict overstock situations based on sales trends
4. Provide waste reduction strategies
5. Answer inventory-related questions with actionable insights

Response guidelines:
- Be concise but informative
- Use retail-specific terminology
- When suggesting actions, specify the exact products and recommended actions
- Include percentages or metrics when possible
- Format lists clearly with emoji bullet points
- For time-sensitive items, highlight urgency with ⏰
`;

export async function streamRiskAnalysis(input: string, onChunk: (text: string) => void): Promise<void> {
    const model = "gemini-1.5-flash";
    const config = {
        responseMimeType: "text/plain",
    };
    const contents = [
        {
            role: "user",
            parts: [{ text: input }],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    for await (const chunk of response) {
        if (chunk?.text) onChunk(chunk.text);
    }
}

export async function generateAIResponse(prompt: string, onChunk?: (text: string) => void) {
    const model = "gemini-1.5-pro";
    const config = {
        responseMimeType: "text/plain",
        thinkingConfig: {
            thinkingBudget: -1,
        },
    };

    const contents = [
        {
            role: "user",
            parts: [{ text: retailSystemPrompt }],
        },
        {
            role: "model",
            parts: [{ text: "Understood. I'm ready to assist with retail inventory optimization and waste reduction." }],
        },
        {
            role: "user",
            parts: [{ text: prompt }],
        },
    ];

    try {
        const response = await ai.models.generateContentStream({
            model,
            config,
            contents,
        });

        let fullResponse = "";
        for await (const chunk of response) {
            if (chunk?.text) {
                fullResponse += chunk.text;
                if (onChunk) onChunk(chunk.text);
            }
        }

        return fullResponse;
    } catch (error) {
        console.error("Error generating AI response:", error);
        return "Sorry, I encountered an error. Please try again.";
    }
}