"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { knowledgeEntries, greetingPatterns, thankPatterns } from '../../data/knowledgeBase';

// ─── Local RAG Engine ───
// Scores each knowledge entry against the user query using keyword matching,
// then returns the top-ranked responses as natural-sounding answers.

// Stopwords — common function words that should not influence scoring
const STOPWORDS = new Set([
    'what', 'is', 'are', 'was', 'were', 'the', 'a', 'an', 'do', 'does', 'did',
    'how', 'can', 'could', 'would', 'should', 'will', 'may', 'might',
    'your', 'you', 'his', 'her', 'my', 'our', 'their', 'its',
    'me', 'him', 'them', 'us', 'we', 'he', 'she', 'it', 'they',
    'have', 'has', 'had', 'been', 'be', 'being',
    'this', 'that', 'these', 'those', 'which', 'who', 'whom',
    'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'up', 'out',
    'and', 'or', 'but', 'not', 'no', 'so', 'if', 'then', 'than',
    'very', 'just', 'also', 'some', 'any', 'all', 'more', 'most', 'other',
    'please', 'tell', 'know', 'about', 'like', 'get', 'got', 'give', 'want',
]);

const tokenize = (text) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s/+#.]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 1 && !STOPWORDS.has(w));
};

const scoreEntry = (queryTokens, entry) => {
    let score = 0;
    const queryJoined = queryTokens.join(' ');

    for (const keyword of entry.keywords) {
        const kwTokens = tokenize(keyword);

        // Exact phrase match (highest weight)
        if (queryJoined.includes(keyword.toLowerCase())) {
            score += 10;
            continue;
        }

        // Individual token matches
        for (const kwToken of kwTokens) {
            for (const qToken of queryTokens) {
                if (qToken === kwToken) {
                    score += 5; // exact word match
                } else if (qToken.length > 3 && kwToken.includes(qToken)) {
                    score += 2; // partial match (query token inside keyword)
                } else if (kwToken.length > 3 && qToken.includes(kwToken)) {
                    score += 2; // partial match (keyword token inside query)
                }
            }
        }
    }

    return score;
};

const retrieveAnswer = (query) => {
    const queryLower = query.toLowerCase().trim();
    const queryTokens = tokenize(query);

    // Word boundary check helper — prevents "hi" matching inside "his"
    const hasWord = (text, word) => new RegExp(`\\b${word}\\b`, 'i').test(text);

    // ─── Handle greetings ───
    const isGreeting = greetingPatterns.some(g => hasWord(queryLower, g)) || hasWord(queryLower, 'hi');
    if (isGreeting && queryTokens.length <= 4) {
        return "Hey there! 👋 I'm Baibhav. Ask me about my skills, projects, work experience, education, or anything else you'd like to know!";
    }

    // ─── Handle thank you ───
    if (thankPatterns.some(t => queryLower.includes(t)) && queryTokens.length <= 6) {
        return "Glad I could help! 😊 Feel free to ask me anything else about my work or how to get in touch.";
    }

    // ─── Score all entries ───
    const scoredEntries = knowledgeEntries
        .map(entry => ({ ...entry, score: scoreEntry(queryTokens, entry) }))
        .filter(entry => entry.score > 0)
        .sort((a, b) => b.score - a.score);

    if (scoredEntries.length === 0) {
        return "Hmm, I'm not sure about that one. Try asking me about my skills, projects, work experience, education, or certifications!";
    }

    // ─── Build response ───
    const topEntry = scoredEntries[0];

    // If the top match is very strong and specific, return just that
    if (topEntry.score >= 10) {
        // Check if there's a second high-scoring entry from a different category
        const secondEntry = scoredEntries.find(
            (e, i) => i > 0 && e.score >= 5 && e.category !== topEntry.category
        );

        if (secondEntry) {
            return `${topEntry.response}\n\n───\n\n${secondEntry.response}`;
        }
        return topEntry.response;
    }

    // If moderate match, return top 1-2 results
    if (topEntry.score >= 4) {
        const secondEntry = scoredEntries.find(
            (e, i) => i > 0 && e.score >= 3 && e.id !== topEntry.id
        );

        if (secondEntry) {
            return `${topEntry.response}\n\n───\n\n${secondEntry.response}`;
        }
        return topEntry.response;
    }

    // Weak match — return with a caveat
    return `${topEntry.response}\n\nFeel free to ask me more specifically about my skills, projects, experience, or education!`;
};


// ─── Chat Widget Component ───

const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "Hey there! 👋 I'm Baibhav. Ask me about my skills, projects, work experience, education, or how to get in touch!" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (userInput.trim() === '' || isLoading) return;

        const newUserMessage = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = userInput;
        setUserInput('');
        setIsLoading(true);

        // Simulate a natural thinking delay
        setTimeout(() => {
            const answer = retrieveAnswer(currentInput);
            setMessages(prev => [...prev, { sender: 'AI', text: answer }]);
            setIsLoading(false);
        }, 500 + Math.random() * 400);
    };

    // ─── Format message text with line breaks and bullet points ───
    const formatMessage = (text) => {
        return text.split('\n').map((line, i) => {
            if (line.trim() === '───') {
                return <hr key={i} className="my-3 border-gray-200 dark:border-gray-700" />;
            }
            if (line.startsWith('•')) {
                return (
                    <div key={i} className="flex items-start gap-2 py-0.5">
                        <span className="text-purple-400 mt-0.5 shrink-0">•</span>
                        <span>{line.slice(1).trim()}</span>
                    </div>
                );
            }
            if (/^\d+\./.test(line.trim())) {
                return (
                    <div key={i} className="py-1 font-medium">
                        {line}
                    </div>
                );
            }
            if (line.trim() === '') {
                return <div key={i} className="h-1" />;
            }
            return <div key={i} className="py-0.5">{line}</div>;
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-[340px] sm:w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/20 transition-all duration-300 transform scale-100 opacity-100">
                    <header className="p-4 bg-gradient-to-r from-purple-800 to-purple-400/70 text-white text-center rounded-t-2xl flex justify-between items-center border-b border-white/20">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <h1 className="text-md font-medium">Baibhav&apos;s AI Assistant</h1>
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
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${msg.sender === 'AI'
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-emerald-500 text-white'
                                        }`}>
                                        {msg.sender === 'AI' ? 'AI' : 'U'}
                                    </div>
                                    <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm transition-all hover:shadow-md ${msg.sender === 'AI'
                                        ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 rounded-bl-sm'
                                        : 'bg-gradient-to-br from-purple-700 to-indigo-600 text-white rounded-br-sm'
                                        }`}>
                                        {msg.sender === 'AI' ? formatMessage(msg.text) : msg.text}
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

                    {/* Quick suggestion chips */}
                    {messages.length <= 1 && (
                        <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                            {["What are your skills?", "Tell me about your projects", "Work experience?", "How to contact you?"].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => {
                                        setUserInput(suggestion);
                                        // Auto-send
                                        const answer = retrieveAnswer(suggestion);
                                        setMessages(prev => [
                                            ...prev,
                                            { sender: 'user', text: suggestion },
                                            { sender: 'AI', text: answer }
                                        ]);
                                    }}
                                    className="text-xs px-3 py-1.5 rounded-full border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-white/20 bg-gray-50 dark:bg-white/5 flex items-center gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask about skills, projects, experience..."
                            className="flex-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
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
                        <Sparkles className="w-7 h-7 text-white fill-white/20" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AIChatWidget;
