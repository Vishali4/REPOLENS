import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, Check, Terminal } from 'lucide-react';
import { useRepository } from '../context/RepositoryContext';
import { defaultAIResponse } from '../data/mockData';

const suggestedPrompts = [
  'Explain this repository',
  'How does the backend work?',
  'Explain the architecture',
  'Find potential issues',
  'What technologies are used?',
];

export default function AIChat() {
  const { repoData } = useRepository();
  const aiResponses = repoData?.aiResponses || {};
  const repoName = repoData?.repository?.full_name || 'repository';

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am **RepoLens AI**. I have indexed the structure, code distribution, and architecture for **${repoName}**. \n\nHow can I help you understand this codebase today?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend = input) => {
    const text = textToSend.trim();
    if (!text || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate realistic AI response from active repository context
    setTimeout(() => {
      const responseContent = aiResponses[text] || defaultAIResponse;

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-card-main border border-border-subtle rounded-2xl flex flex-col h-[650px] overflow-hidden hover:border-purple-primary/40 transition-all duration-300">
      {/* Chat Header */}
      <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-background-secondary/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-primary/20 border border-purple-primary/30 flex items-center justify-center text-purple-bright shadow-glow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-main flex items-center gap-1.5">
              <span>RepoLens AI Assistant</span>
              <span className="text-[10px] font-semibold text-purple-bright bg-purple-primary/15 px-2 py-0.5 rounded-full border border-purple-primary/25">
                Model: Gemini Context
              </span>
            </h3>
            <p className="text-xs text-text-muted">Repository knowledge base loaded</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          <span className="text-[11px] font-mono">Ready</span>
        </div>
      </div>

      {/* Suggested Prompts Bar */}
      <div className="px-4 py-2.5 bg-background-main/80 border-b border-border-subtle/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <Sparkles className="w-3.5 h-3.5 text-purple-bright flex-shrink-0" />
        <span className="text-[11px] text-text-muted font-medium flex-shrink-0">Suggestions:</span>
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 text-xs px-2.5 py-1 rounded-lg bg-card-main hover:bg-card-hover border border-border-subtle hover:border-purple-primary/40 text-text-secondary hover:text-purple-light transition-all font-sans"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-purple-bright/20 border border-purple-bright/40 text-purple-light'
                    : 'bg-card-main border border-border-subtle text-purple-bright'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div className="relative group">
                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-purple-primary text-white rounded-tr-none'
                      : 'bg-background-secondary border border-border-subtle text-text-main rounded-tl-none whitespace-pre-line font-sans'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Footer and copy action */}
                <div className={`mt-1 flex items-center gap-2 text-[10px] text-text-muted ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="opacity-0 group-hover:opacity-100 hover:text-purple-light transition-opacity flex items-center gap-0.5"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-status-success" />
                          <span className="text-status-success">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-8 h-8 rounded-xl bg-card-main border border-border-subtle flex items-center justify-center text-purple-bright">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-background-secondary border border-border-subtle rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-bright animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-purple-bright animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-purple-bright animate-bounce" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-background-secondary/80 border-t border-border-subtle"
      >
        <div className="relative flex items-center bg-card-main border border-border-subtle rounded-xl p-1.5 focus-within:border-purple-bright/70 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask RepoLens about this repository..."
            className="w-full bg-transparent text-xs sm:text-sm text-text-main placeholder-text-muted px-3 py-1.5 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-2.5 rounded-lg text-white font-medium transition-all ${
              input.trim() && !isTyping
                ? 'purple-glow-btn cursor-pointer'
                : 'bg-border-subtle text-text-muted cursor-not-allowed opacity-50'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
