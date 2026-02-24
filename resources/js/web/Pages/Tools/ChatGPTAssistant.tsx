import { useState, useRef, useEffect } from "react";
import AppLayout from "../../Layouts/AppLayout";
import {
    Send,
    Bot,
    Plus,
    Trash2,
    Paperclip,
    Sparkles,
    Building2,
    FileText,
    Search,
    ChevronLeft,
    Menu,
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
    date: string;
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

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, []);

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

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

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

    const adjustTextareaHeight = (e: React.ChangeEvent<any>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    };

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
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-sm z-20 xl:hidden"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`${
                        sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } absolute xl:relative z-30 w-[280px] h-full bg-[#F9F9F9] shrink-0 transition-transform duration-300 ease-in-out border-r border-gray-200 flex flex-col`}
                >
                    <div className="p-4 flex items-center justify-between">
                        <button
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2.5 rounded-xl transition-all shadow-sm text-sm font-medium"
                            onClick={() => {
                                setMessages(initialMessages);
                                if (window.innerWidth < 1280)
                                    setSidebarOpen(false);
                            }}
                        >
                            <Plus size={18} />
                            New Chat
                        </button>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-2 p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 rounded-lg xl:hidden transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
                        {Object.entries(groupedHistory).map(
                            ([date, sessions]) => (
                                <div key={date}>
                                    <div className="px-3 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                        {date}
                                    </div>
                                    <div className="space-y-1">
                                        {sessions.map((session) => (
                                            <div
                                                key={session.id}
                                                className="group flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded-lg cursor-pointer transition-all"
                                            >
                                                <span className="truncate flex-1 font-medium">
                                                    {session.title}
                                                </span>
                                                <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:bg-red-50 shrink-0 ml-2 shadow-sm border border-gray-100">
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-200 bg-[#F9F9F9]">
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200/50 cursor-pointer hover:shadow-md transition-all group">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                <Zap size={16} fill="currentColor" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-slate-800 truncate">
                                    Pro Plan
                                </div>
                                <div className="text-[11px] text-slate-600 truncate font-semibold">
                                    Get GPT-4 & Analysis
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Areas */}
                <main className="flex-1 flex flex-col min-w-0 bg-white relative h-full">
                    {/* Top Header */}
                    <header className="shrink-0 flex items-center px-4 py-3 border-b border-gray-100 bg-white/90 backdrop-blur-md z-10 sticky top-0 justify-between shadow-sm">
                        <div className="flex items-center gap-2 sm:gap-3">
                            {!sidebarOpen && (
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors"
                                >
                                    <Menu size={22} />
                                </button>
                            )}
                            <h2 className="text-[15px] sm:text-base font-semibold text-gray-800 flex items-center gap-2">
                                <Bot size={20} className="text-blue-600" />
                                Real Estate AI
                            </h2>
                        </div>
                    </header>

                    {/* Messages Scroll Area */}
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth bg-gray-50/50">
                        <div className="max-w-3xl mx-auto flex flex-col gap-6">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 sm:gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.sender === "ai" && (
                                        <div className="w-8 h-8 rounded-xl bg-teal-600 shrink-0 flex items-center justify-center shadow-sm mt-1">
                                            <Bot
                                                size={18}
                                                className="text-white"
                                            />
                                        </div>
                                    )}

                                    <div
                                        className={`relative max-w-[90%] sm:max-w-[75%] px-4 sm:px-5 py-3.5 text-[14px] sm:text-[15px] leading-relaxed shadow-sm ${
                                            msg.sender === "user"
                                                ? "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tr-sm"
                                                : "bg-[#FFFFFF] border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm shadow-sm"
                                        }`}
                                    >
                                        <p className="whitespace-pre-wrap">
                                            {msg.text}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3 sm:gap-4 justify-start animate-fade-in mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-teal-600 shrink-0 flex items-center justify-center shadow-sm">
                                        <Bot size={18} className="text-white" />
                                    </div>
                                    <div className="flex gap-1.5 items-center h-10 px-4 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-2" />
                        </div>
                    </div>

                    {/* Bottom Input Area */}
                    <div className="shrink-0 bg-white border-t border-gray-100 pt-3 pb-3 sm:pb-5 px-3 sm:px-4 z-10 w-full mb-[env(safe-area-inset-bottom)]">
                        <div className="max-w-3xl mx-auto flex flex-col gap-3">
                            {/* Suggested Prompts */}
                            {messages.length === 1 && !isTyping && (
                                <div className="flex overflow-x-auto hide-scrollbar sm:grid sm:grid-cols-2 gap-2 sm:gap-3 pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth pr-6 sm:pr-0">
                                    {suggestedPrompts.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                handleSendMessage(item.prompt)
                                            }
                                            className="shrink-0 w-[240px] sm:w-auto flex flex-col gap-2.5 p-3.5 sm:p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all text-left group"
                                        >
                                            <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors w-fit border border-gray-100">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <div className="text-[13px] font-bold text-gray-800 mb-1">
                                                    {item.label}
                                                </div>
                                                <div className="text-[12px] text-gray-500 line-clamp-2 leading-snug">
                                                    {item.prompt}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Input Box */}
                            <div className="relative bg-white border border-gray-300 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all flex flex-col">
                                <textarea
                                    ref={textareaRef}
                                    value={inputValue}
                                    onChange={adjustTextareaHeight}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask about properties, markets, contracts..."
                                    className="w-full max-h-[150px] min-h-[52px] py-3.5 pl-4 pr-12 bg-transparent border-none resize-none text-[15px] focus:ring-0 placeholder-gray-400"
                                    rows={1}
                                />
                                <div className="flex items-center justify-between px-2 pb-2">
                                    <div className="flex items-center text-gray-400 gap-1">
                                        <button
                                            className="p-2 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                                            title="Attach file"
                                        >
                                            <Paperclip size={18} />
                                        </button>
                                        <button
                                            className="p-2 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors hidden sm:block"
                                            title="Upload Image"
                                        >
                                            <ImageIcon size={18} />
                                        </button>
                                        <button
                                            className="p-2 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                                            title="Voice Input"
                                        >
                                            <Mic size={18} />
                                        </button>
                                    </div>
                                    <div className="ml-auto p-1">
                                        <button
                                            onClick={() => handleSendMessage()}
                                            disabled={!inputValue.trim()}
                                            className={`p-2 rounded-xl transition-all flex items-center justify-center ${
                                                inputValue.trim()
                                                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md transform hover:scale-105"
                                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                        >
                                            <Send
                                                size={18}
                                                className={
                                                    inputValue.trim()
                                                        ? "translate-x-0.5 -translate-y-[1px]"
                                                        : ""
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center pt-1">
                                <p className="text-[11px] text-gray-400">
                                    AI can make mistakes. Verify important real
                                    estate data.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* Global style for hiding scrollbars if not existing in app css */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </AppLayout>
    );
}
