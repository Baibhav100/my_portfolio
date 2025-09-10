"use client";

import React, { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "Hello! I'm an AI assistant. I can answer questions about Baibhav&apos;s professional background and skills. What would you like to know?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
        
        // Revised handling for projects to retrieve all project data.
        if (lowerCaseQuery.includes('project') || lowerCaseQuery.includes('what have you done')) {
            const startIndex = knowledgeBase.indexOf("Projects");
            const endIndex = knowledgeBase.indexOf("Education");

            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const projects = knowledgeBase.slice(startIndex + 1, endIndex);
                return projects.join(' ');
            }
        }
        
        // Handling for Education to retrieve all education data.
        if (lowerCaseQuery.includes('education') || lowerCaseQuery.includes('degree')) {
            const startIndex = knowledgeBase.indexOf("Education");
            const endIndex = knowledgeBase.indexOf("Courses and Certifications");

            if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                const education = knowledgeBase.slice(startIndex + 1, endIndex);
                return education.join(' ');
            }
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
        const apiKey = "AIzaSyASPgRRDdUz4BD9ILUtJtKDBdd731q4Ps4";
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
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-80 h-96 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/20 transition-all duration-300 transform scale-100 opacity-100">
                    <header className="p-4 bg-gradient-to-r from-purple-800 to-purple-400/70 text-white text-center rounded-t-2xl flex justify-between items-center border-b border-white/20">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <h1 className="text-md">Baibhav&apos;s AI Assistant</h1>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors duration-200 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>

                    <div id="chat-window" className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-white/8 to-transparent">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}>
                                <div className={`p-3 rounded-2xl max-w-[80%] ${msg.sender === 'AI' ? 'bg-purple-500 text-white backdrop-blur-sm' : 'bg-purple-300 text-gray-600 backdrop-blur-sm'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-2xl bg-white/20 text-gray-800 backdrop-blur-sm flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-3 border-t border-white/20 bg-white/5 backdrop-blur-sm flex items-center gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 p-2 bg-white backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 placeholder-gray-600"
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="bg-gradient-to-r from-purple-800 to-purple-600/80 text-white p-2 rounded-xl hover:to-purple-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                        </button>
                    </form>
                </div>
            ) : (
                <div className="relative inline-flex items-center">
                    {/* Snackbar */}
                    <div className="absolute left-[-120px] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap
                        before:content-[''] before:absolute before:top-1/2 before:-right-2 before:-translate-y-1/2
                        before:border-y-8 before:border-y-transparent before:border-l-8 before:border-l-gray-800 animate-bounce">
                        Talk with me!
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-4 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-full shadow-lg hover:to-purple-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm border border-white/20"
                    >
                        <img
                            src="images/Profile.png"
                            alt="icon"
                            className="w-7 h-7 object-contain"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AIChatWidget;
