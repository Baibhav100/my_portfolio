"use client";

import React, { useState } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';

const Page = () => {
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "Hello! I'm an AI assistant. I can answer questions about Baibhav's professional background and skills. What would you like to know?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // This function tokenizes the input and searches for matches
    const retrieveInformation = (query) => {
        const lowerCaseQuery = query.toLowerCase();

        // Special handling for specific queries that require a full context.
        if (lowerCaseQuery.includes('name') || lowerCaseQuery.includes('who are you')) {
            return "Baibhav Rajkumar";
        }
        if (lowerCaseQuery.includes('phone') || lowerCaseQuery.includes('contact')) {
            return "You can reach Baibhav at: * **Email:** bhaibhav60@gmail.com * **Mobile:** (+91) 8486128114";
        }
        if (lowerCaseQuery.includes('skills')) {
            return "Key Skills: React.js, Next.js, Redux, JavaScript, HTML, CSS, Tailwind, Bootstrap, Node.js, Express.js, REST APIs, MySQL, MongoDB, PHP, Git, Docker, Jenkins, CI/CD, Postman, AWS (EC2, S3), Firebase, Heroku, C, C++, Python, Jest.";
        }

        // A more robust way to check for a general match
        const queryWords = lowerCaseQuery.split(/\s+/).filter(word => word.length > 2);
        
        let bestMatch = null;
        let highestScore = 0;

        knowledgeBase.forEach(item => {
            const itemWords = item.toLowerCase().split(/\s+/).filter(word => word.length > 2);
            const score = queryWords.filter(word => itemWords.some(itemWord => itemWord.includes(word))).length;
            
            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        });

        if (bestMatch && highestScore > 0) {
            return bestMatch;
        } else {
            return "I couldn't find information on that topic in my knowledge base.";
        }
    };

    // This function calls the Gemini API to generate a response.
    const generateContent = async (prompt) => {
        const apiKey = "AIzaSyASPgRRDdUz4BD9ILUtJtKDBdd731q4Ps4"; // <-- Paste your API key here
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Create a prompt that tells the LLM what to do.
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: {
                parts: [{ 
                    text: `You are an AI assistant for a resume. Answer the user's question using only the provided context. If the answer is not in the context, say that you don't have information on that topic. Be concise and friendly.`
                }]
            },
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            console.error("API response error:", result);
            return "Sorry, I am unable to generate a response at this time.";
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === '' || isLoading) return;

        const newUserMessage = { sender: 'user', text: userInput };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        
        setIsLoading(true);

        // **Step 1: Retrieve relevant information.**
        const retrievedInfo = retrieveInformation(userInput);
        
        // **Step 2: Augment and generate.**
        // Combine the user's query with the retrieved information to create a prompt.
        const augmentedPrompt = `User's query: ${userInput}\n\nContext from resume: ${retrievedInfo}`;
        
        try {
            const llmResponse = await generateContent(augmentedPrompt);
            const botResponse = { sender: 'AI', text: llmResponse };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        } catch (error) {
            console.error("Failed to fetch from LLM:", error);
            const errorResponse = { sender: 'AI', text: "Sorry, I am having trouble connecting right now. Please try again later." };
            setMessages(prevMessages => [...prevMessages, errorResponse]);
        } finally {
            setUserInput('');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex flex-col h-[80vh] overflow-hidden">
                <header className="p-4 bg-gray-800 text-white text-center rounded-t-xl">
                    <h1 className="text-2xl font-bold">Baibhav's AI Assistant</h1>
                </header>

                <div id="chat-window" className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}>
                            <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'AI' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="p-3 rounded-lg bg-gray-200 text-gray-800">
                                Typing...
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
