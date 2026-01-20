import React, { useState, useRef, useEffect } from "react";
import AppLayout from "../../Layouts/AppLayout";
import {
    Send,
    Bot,
    User,
    Plus,
    Trash2,
    Paperclip,
    Sparkles,
    Building2,
    FileText,
    Search,
    ChevronLeft,
    ChevronRight,
    Zap,
    Image as ImageIcon,
    Mic,
} from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "ai";
    timestamp: Date;
    isTyping?: boolean;
}

interface ChatSession {
    id: number;
    title: string;
    date: string; // Grouping key
}

const mockHistory: ChatSession[] = [
    { id: 1, title: "Property Analysis - 123 Maple", date: "Today" },
    { id: 2, title: "Lease Agreement Draft", date: "Yesterday" },
    { id: 3, title: "Market Trends Q3", date: "Previous 7 Days" },
    { id: 4, title: "Email to Prospect", date: "Previous 7 Days" },
];

const initialMessages: Message[] = [
    {
        id: 1,
        text: "Hello! I'm your Real Estate AI Assistant. \n\nI can help you with:\n• Analyzing property metrics (ROI, Cap Rate)\n• Drafting listings and agreements\n• Researching local market trends\n\nHow can I support your business today?",
        sender: "ai",
        timestamp: new Date(),
    },
];

const suggestedPrompts = [
    {
        icon: <Building2 size={18} className="text-blue-500" />,
        label: "Analyze Deal",
        prompt: "Analyze the potential ROI for a property listing at...",
    },
    {
        icon: <FileText size={18} className="text-orange-500" />,
        label: "Draft Listing",
        prompt: "Write a compelling property description for a 3-bed...",
    },
    {
        icon: <Search size={18} className="text-purple-500" />,
        label: "Market Research",
        prompt: "What are the current rental trends in...",
    },
    {
        icon: <Sparkles size={18} className="text-green-500" />,
        label: "Improve Description",
        prompt: "Rewrite this property description to be more engaging...",
    },
];

export default function ChatGPTAssistant() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (text: string = inputValue) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: text,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        // Simulate AI Response
        setTimeout(() => {
            setIsTyping(false);
            const aiResponse: Message = {
                id: Date.now() + 1,
                text: "I'm analyzing that for you. As an AI assistant specialized in real estate, I can pull data from our internal database and external market sources to give you a comprehensive answer.\n\n(This is a verified mock response for the improved interface.)",
                sender: "ai",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const adjustTextareaHeight = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    };

    // Group history by date
    const groupedHistory = mockHistory.reduce(
        (acc, session) => {
            if (!acc[session.date]) acc[session.date] = [];
            acc[session.date].push(session);
            return acc;
        },
        {} as Record<string, ChatSession[]>,
    );

    return (
        <AppLayout title="AI Assistant">
            <div className="flex w-full bg-white font-sans text-slate-800 overflow-hidden h-[calc(100vh-64px)] relative">
                {/* Sidebar */}
                <aside
                    className={`${
                        sidebarOpen
                            ? "w-[280px] translate-x-0"
                            : "w-0 -translate-x-full opacity-0"
                    } bg-[#F9F9F9] flex-shrink-0 transition-all duration-300 ease-in-out border-r border-gray-200 flex flex-col absolute md:relative z-20 h-full`}
                >
                    <div className="p-4 flex items-center justify-between">
                        <button
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-lg transition-all shadow-sm text-sm font-medium"
                            onClick={() => setMessages(initialMessages)}
                        >
                            <Plus size={18} />
                            New Chat
                        </button>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-2 p-2 text-gray-400 hover:bg-gray-200 rounded-lg md:hidden"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
                        {Object.entries(groupedHistory).map(
                            ([date, sessions]) => (
                                <div key={date}>
                                    <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                        {" "}
                                        {date}{" "}
                                    </div>
                                    <div className="space-y-1">
                                        {sessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="group relative flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all truncate"
                                            >
                                                <span className="truncate flex-1">
                                                    {" "}
                                                    {session.title}{" "}
                                                </span>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 flex gap-1 bg-white/50 backdrop-blur-sm pl-2">
                                                    <button className="p-1 text-gray-400 hover:text-red-500 rounded">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-[#F9F9F9]">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 cursor-pointer hover:shadow-md transition-all">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm">
                                <Zap size={16} fill="currentColor" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="text-sm font-semibold text-slate-800">
                                    {" "}
                                    Pro Plan{" "}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                    {" "}
                                    Get GPT - 4 & Analysis{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col min-w-0 bg-white relative h-full">
                    {/* Top Bar (Mobile Toggle + Model Selector) */}
                    <div className="absolute top-0 left-0 right-0 z-10 px-4 py-3 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-3 pointer-events-auto">
                            {!sidebarOpen && (
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors bg-white/50 backdrop-blur-md border border-gray-100 shadow-sm"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            )}
                        </div>
                        {/* Removed Header Title */}
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto pt-16 pb-32">
                        <div className="max-w-6xl mx-auto px-2 sm:px-4 flex flex-col gap-6">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {/* AI Avatar */}
                                    {msg.sender === "ai" && (
                                        <div className="w-8 h-8 rounded-lg bg-teal-600 flex-shrink-0 flex items-center justify-center shadow-sm mt-1">
                                            <Bot
                                                size={18}
                                                className="text-white"
                                            />
                                        </div>
                                    )}

                                    {/* Message Bubble */}
                                    <div
                                        className={`relative max-w-[85%] sm:max-w-[75%] px-5 py-3.5 text-[15px] leading-7 shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-slate-100 text-slate-800 rounded-2xl rounded-tr-sm"
                                                : "bg-white border border-gray-100 text-slate-800 rounded-2xl rounded-tl-sm shadow-sm"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">
                                            {" "}
                                            {msg.text}{" "}
                                        </p>
                                    </div>

                                    {/* User Avatar */}
                                    {msg.sender === "user" && (
                                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex-shrink-0 flex items-center justify-center shadow-sm mt-1 text-white">
                                            <User size={18} />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-4 justify-start animate-fade-in">
                                    <div className="w-8 h-8 rounded-lg bg-teal-600 flex-shrink-0 flex items-center justify-center shadow-sm">
                                        <Bot size={18} className="text-white" />
                                    </div>
                                    <div className="flex gap-1 items-center h-8 px-2">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-0">
                                            {" "}
                                        </span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100">
                                            {" "}
                                        </span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200">
                                            {" "}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Bottom Input Area (Floating) */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-10 px-4">
                        <div className="max-w-5xl mx-auto">
                            {/* Suggested Prompts (Only show if new chat) */}
                            {messages.length === 1 && !isTyping && (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 animate-fade-in-up">
                                    {suggestedPrompts.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                handleSendMessage(item.prompt)
                                            }
                                            className="flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left group"
                                        >
                                            <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-white transition-colors w-fit">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-gray-700 mb-0.5">
                                                    {" "}
                                                    {item.label}{" "}
                                                </div>
                                                <div className="text-[10px] text-gray-400 line-clamp-2 leading-tight">
                                                    {" "}
                                                    {item.prompt}{" "}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input Box */}
                            <div className="relative bg-white border border-gray-300 rounded-2xl shadow-lg focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all overflow-hidden flex flex-col">
                                <textarea
                                    ref={textareaRef}
                                    value={inputValue}
                                    onChange={adjustTextareaHeight}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask anything about properties, market data, or contracts..."
                                    className="w-full max-h-[200px] min-h-[56px] py-4 pl-4 pr-14 bg-transparent border-none resize-none text-[15px] focus:ring-0 placeholder-gray-400"
                                    rows={1}
                                />

                                <div className="flex items-center justify-between px-3 pb-3">
                                    <div className="flex items-center gap-1">
                                        <button
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Attach file"
                                        >
                                            <Paperclip size={18} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Upload Image"
                                        >
                                            <ImageIcon size={18} />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Voice Input"
                                        >
                                            <Mic size={18} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputValue.trim()}
                                        className={`p-2 rounded-lg transition-all ${
                                            inputValue.trim()
                                                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                                                : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                        }`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                <p className="text-[11px] text-gray-400">
                                    AI can make mistakes.Verify important real
                                    estate data.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
