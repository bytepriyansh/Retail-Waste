"use client";

import { Navbar } from "@/components/Navbar";
import { useState, useRef, useEffect } from "react";
import { generateAIResponse, streamRiskAnalysis } from "@/lib/gemini";
import { Send, Sparkles, AlertTriangle, Percent, Truck, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Message = {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
};

const promptSuggestions = [
  {
    title: "Expiry Risk Analysis",
    prompt: "Analyze current inventory for items at risk of spoilage in the next 48 hours",
    icon: <AlertTriangle className="w-4 h-4 mr-2" />,
    useStreaming: true,
  },
  {
    title: "Discount Recommendations",
    prompt: "Which items should we discount today to prevent waste?",
    icon: <Percent className="w-4 h-4 mr-2" />,
  },
  {
    title: "Transfer Suggestions",
    prompt: "Are there any items we should transfer to other stores?",
    icon: <Truck className="w-4 h-4 mr-2" />,
  },
  {
    title: "Donation Candidates",
    prompt: "What items should we consider donating soon?",
    icon: <Gift className="w-4 h-4 mr-2" />,
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Retail Waste Intelligence Copilot. How can I help with inventory optimization today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "", isStreaming: true }]);

    try {
      let responseText = "";

      await generateAIResponse(input, (chunk) => {
        responseText += chunk;
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.isStreaming) {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: responseText },
            ];
          }
          return prev;
        });
      });

      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.isStreaming) {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, isStreaming: false },
          ];
        }
        return prev;
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.filter(msg => !msg.isStreaming),
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRiskAnalysis = async (prompt: string) => {
    setInput(prompt);
    const userMessage = { role: "user" as const, content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "", isStreaming: true }]);

    try {
      let responseText = "";
      await streamRiskAnalysis(prompt, (chunk) => {
        responseText += chunk;
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.isStreaming) {
            return [
              ...prev.slice(0, -1),
              { ...lastMessage, content: responseText },
            ];
          }
          return prev;
        });
      });

      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage?.isStreaming) {
          return [
            ...prev.slice(0, -1),
            { ...lastMessage, isStreaming: false },
          ];
        }
        return prev;
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev.filter(msg => !msg.isStreaming),
        { role: "assistant", content: "Sorry, I encountered an error during risk analysis." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSuggestion = async (suggestion: typeof promptSuggestions[0]) => {
    setInput(suggestion.prompt);
    if (suggestion.useStreaming) {
      await handleRiskAnalysis(suggestion.prompt);
    } else {
      const fakeEvent = { preventDefault: () => { } } as React.FormEvent;
      await handleSubmit(fakeEvent);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-emerald-500" />
                  <span>AI Logistics Copilot</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[60vh] overflow-y-auto mb-4 space-y-4 pr-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${message.role === "user"
                          ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100"
                          : "bg-gray-100 dark:bg-gray-800"
                          } ${message.isStreaming ? "animate-pulse" : ""}`}
                      >

                          {message.content ? (
                            message.content.split("\n").map((paragraph, i) => (
                              <p key={i} className="mb-2 last:mb-0">
                                {paragraph}
                              </p>
                            ))
                          ) : message.isStreaming ? (
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                            </div>
                          ) : null}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about inventory, waste reduction, or smart pricing..."
                    className="flex-1 min-h-[60px]"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-80 space-y-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Smart Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {promptSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3 whitespace-normal"
                      onClick={() => handlePromptSuggestion(suggestion)}
                      disabled={isLoading}
                    >
                      <span className="flex items-center">
                        {suggestion.icon}
                        {suggestion.title}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Apply Discount
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark for Donation
                  </Button>
                  <Button variant="outline" size="sm">
                    Transfer Items
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
