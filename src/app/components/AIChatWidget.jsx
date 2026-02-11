"use client";

import React, { useState, useRef, useEffect } from 'react';
import { knowledgeBase } from '../../data/knowledgeBase';

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "Hello! I'm an AI assistant. I can answer questions about Baibhav's professional background and skills. What would you like to know?" }
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

    // Simplified retrieval: Just join the whole KB as context.
    const retrieveInformation = () => {
        return knowledgeBase.join('\n');
    };

    // Purely local matching system to replace LLM
    const findLocalAnswer = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const queryWords = lowerCaseQuery.split(/[\s,?.!]+/).filter(word => word.length > 2);

        // Priority 1: Direct identity/contact matches
        if (lowerCaseQuery.includes('name') || lowerCaseQuery.includes('who are you')) {
            return "My name is Baibhav Rajkumar.";
        }
        if (lowerCaseQuery.includes('contact') || lowerCaseQuery.includes('email') || lowerCaseQuery.includes('phone') || lowerCaseQuery.includes('mobile')) {
            return "You can reach Baibhav at baibhavrajkumar1999@gmail.com or (+91) 7086041934.";
        }

        // Priority 2: Broad Keyword Matching with Context
        let matchingIndices = new Set();

        knowledgeBase.forEach((item, index) => {
            const itemLower = item.toLowerCase();
            if (queryWords.some(word => itemLower.includes(word))) {
                matchingIndices.add(index);
                // If it's a short header (like "Education" or "Projects"), include the next items
                if (item.length < 20) {
                    for (let i = 1; i <= 3; i++) {
                        if (index + i < knowledgeBase.length) matchingIndices.add(index + i);
                    }
                }
            }
        });

        if (matchingIndices.size > 0) {
            const result = Array.from(matchingIndices)
                .sort((a, b) => a - b)
                .map(index => knowledgeBase[index])
                .filter(item => item.length > 5) // Filter out very short remnants
                .slice(0, 6); // Cap the response length

            return result.join('\n\n');
        }

        // Priority 3: Category based fallback (Slightly broader)
        if (lowerCaseQuery.includes('skill') || lowerCaseQuery.includes('tech') || lowerCaseQuery.includes('stack')) {
            return "Knowledge Base: " + knowledgeBase.find(i => i.includes("React.js, Next.js"));
        }
        if (lowerCaseQuery.includes('project') || lowerCaseQuery.includes('work') || lowerCaseQuery.includes('experience')) {
            return "Baibhav has 3+ years of experience. Notable projects: Vision-Based PC Automation, Speech to Action System, YouTube Clone, and Dating App mockup.";
        }
        if (lowerCaseQuery.includes('education') || lowerCaseQuery.includes('college') || lowerCaseQuery.includes('study')) {
            return "Baibhav holds an MCA from USTM (2023) and a BCA from K C Das Commerce College (2021).";
        }

        return "I couldn't find a direct match. Baibhav specializes in Fullstack Development (React/Next.js/Node.js) and AI/ML. Try asking about his specific projects, education, or skills!";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === '' || isLoading) return;

        const newUserMessage = { sender: 'user', text: userInput };
        setMessages(prevMessages => [...prevMessages, newUserMessage]);

        setIsLoading(true);

        // Simulate a small delay for "thinking" effect
        setTimeout(() => {
            const localAnswer = findLocalAnswer(userInput);
            const botResponse = { sender: 'AI', text: localAnswer };
            setMessages(prevMessages => [...prevMessages, botResponse]);
            setIsLoading(false);
            setUserInput('');
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-80 h-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/20 transition-all duration-300 transform scale-100 opacity-100">
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

                    <div id="chat-window" className="flex-1 p-4 overflow-y-auto space-y-6 bg-gray-50/50 dark:bg-[#0f1115]/50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.sender === 'AI' ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`flex items-end gap-2 ${msg.sender === 'AI' ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Avatar/Icon Indicator */}
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${msg.sender === 'AI'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-emerald-500 text-white'
                                        }`}>
                                        {msg.sender === 'AI' ? 'AI' : 'U'}
                                    </div>

                                    {/* Message Bubble */}
                                    <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm transition-all hover:shadow-md ${msg.sender === 'AI'
                                        ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 rounded-bl-sm'
                                        : 'bg-gradient-to-br from-purple-700 to-indigo-600 text-white rounded-br-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                                <span className="mt-1 text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider font-medium px-8">
                                    {msg.sender === 'AI' ? 'Assistant' : 'You'}
                                </span>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex flex-col items-start animate-pulse">
                                <div className="flex items-end gap-2">
                                    <div className="w-6 h-6 rounded-full bg-purple-600/50 flex items-center justify-center text-[10px] text-white font-bold shrink-0">AI</div>
                                    <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-bl-sm flex space-x-1.5">
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 flex items-center gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
                            src="/images/profile.png"
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
