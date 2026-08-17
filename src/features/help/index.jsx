import React, { useState } from 'react';
import {
  MdSearch,
  MdKeyboardArrowDown,
  MdOutlineEmail,
  MdOutlineChat,
  MdOutlinePhoneInTalk,
  MdCheckCircle,
  MdClose,
} from 'react-icons/md';
import { helpCategories } from './data/helpData';

const HelpView = () => {
  const [activeCategoryId, setActiveCategoryId] = useState('general-issues');
  const [openFaqIds, setOpenFaqIds] = useState(['gen-1']); // First FAQ open by default
  const [searchQuery, setSearchQuery] = useState('');
  const [supportModal, setSupportModal] = useState(null); // 'email' | 'chat' | 'emergency' | null

  const activeCategory = helpCategories.find(
    (cat) => cat.id === activeCategoryId
  ) || helpCategories[0];

  const toggleFaq = (faqId) => {
    setOpenFaqIds((prev) =>
      prev.includes(faqId)
        ? prev.filter((id) => id !== faqId)
        : [...prev, faqId]
    );
  };

  // Filter FAQs across all categories when search query is entered
  const isSearching = searchQuery.trim().length > 0;
  const filteredFaqs = isSearching
    ? helpCategories.flatMap((cat) =>
        cat.faqs
          .filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((faq) => ({ ...faq, categoryTitle: cat.title }))
      )
    : [];

  const handleActionClick = (actionName) => {
    if (actionName.includes('EMAIL')) {
      setSupportModal('email');
    } else if (actionName.includes('CHAT')) {
      setSupportModal('chat');
    } else if (actionName.includes('CALL') || actionName.includes('SAFETY')) {
      setSupportModal('emergency');
    } else {
      alert(`Initiated action: ${actionName}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20">
      {/* 1. Header Banner (Dark Teal Slate Background) */}
      <div className="bg-[#37718e] text-white pt-24 pb-20 px-4 sm:px-8 lg:px-16 transition-all">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Help & Support
            </h1>
            <p className="text-slate-200 text-sm sm:text-base mt-2 font-medium">
              Let's take a step ahead and help you better.
            </p>
          </div>

          {/* Search Box inside Header */}
          <div className="relative w-full md:w-80">
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-2xl text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help, orders, refund..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-slate-300 text-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
              >
                <MdClose className="text-lg" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Help Center Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/70 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* LEFT SIDEBAR (Category Menu) */}
          <div className="w-full md:w-80 bg-[#edf1f7] shrink-0 border-b md:border-b-0 md:border-r border-slate-200/80 py-4 md:py-8">
            <div className="px-6 mb-4 hidden md:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Help Categories
              </span>
            </div>

            {/* Sidebar List */}
            <div className="flex md:flex-col overflow-x-auto no-scrollbar md:overflow-visible">
              {helpCategories.map((category) => {
                const isActive = activeCategoryId === category.id && !isSearching;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategoryId(category.id);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-6 py-4 text-xs sm:text-sm font-semibold transition-all shrink-0 md:shrink border-b md:border-b-0 ${
                      isActive
                        ? 'bg-white text-slate-900 font-extrabold shadow-xs border-l-4 border-slate-900 md:border-l-4 md:border-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL (FAQ List / Search Results) */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 bg-white">
            {isSearching ? (
              /* Search Results View */
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-xs text-slate-400 mb-6">
                  Found {filteredFaqs.length} matching result{filteredFaqs.length === 1 ? '' : 's'}
                </p>

                {filteredFaqs.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <p className="text-base font-semibold text-slate-600">No results found</p>
                    <p className="text-xs mt-1">Try searching for terms like "refund", "partner", "money", or "delivery".</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredFaqs.map((faq) => {
                      const isOpen = openFaqIds.includes(faq.id);
                      return (
                        <div key={faq.id} className="py-4">
                          <div
                            onClick={() => toggleFaq(faq.id)}
                            className="flex items-center justify-between gap-4 cursor-pointer group"
                          >
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">
                                {faq.categoryTitle}
                              </span>
                              <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-slate-900 mt-1">
                                {faq.question}
                              </h3>
                            </div>
                            <MdKeyboardArrowDown
                              className={`text-2xl text-slate-400 transition-transform duration-200 shrink-0 ${
                                isOpen ? 'rotate-180 text-emerald-600' : ''
                              }`}
                            />
                          </div>

                          {isOpen && (
                            <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                              <p>{faq.answer}</p>
                              {faq.action && (
                                <button
                                  onClick={() => handleActionClick(faq.action)}
                                  className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                                >
                                  {faq.action}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Standard Category View */
              <div>
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {activeCategory.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeCategory.description}
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {activeCategory.faqs.map((faq) => {
                    const isOpen = openFaqIds.includes(faq.id);
                    return (
                      <div key={faq.id} className="py-4 sm:py-5">
                        <div
                          onClick={() => toggleFaq(faq.id)}
                          className="flex items-center justify-between gap-4 cursor-pointer group"
                        >
                          <h3 className="text-sm sm:text-base font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                            {faq.question}
                          </h3>
                          <MdKeyboardArrowDown
                            className={`text-2xl text-slate-400 transition-transform duration-200 shrink-0 ${
                              isOpen ? 'rotate-180 text-emerald-600' : ''
                            }`}
                          />
                        </div>

                        {isOpen && (
                          <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100/80 animate-in fade-in duration-150">
                            <p>{faq.answer}</p>

                            {faq.action && (
                              <button
                                onClick={() => handleActionClick(faq.action)}
                                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                              >
                                {faq.action}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Direct Contact Support Cards Banner */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 text-2xl">
              <MdOutlineChat />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">Live Chat Support</h4>
              <p className="text-xs text-slate-500 mt-1">Chat with our 24x7 support agents for instant resolution.</p>
              <button
                onClick={() => setSupportModal('chat')}
                className="mt-3 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
              >
                Start Chat →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-2xl">
              <MdOutlineEmail />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">Email Support</h4>
              <p className="text-xs text-slate-500 mt-1">Write to us at support@deveats.com for detailed queries.</p>
              <button
                onClick={() => setSupportModal('email')}
                className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-700 underline cursor-pointer"
              >
                Send Email →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 text-2xl">
              <MdOutlinePhoneInTalk />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-base">Safety Helpline</h4>
              <p className="text-xs text-slate-500 mt-1">24x7 emergency phone support for safety incidents.</p>
              <button
                onClick={() => setSupportModal('emergency')}
                className="mt-3 text-xs font-bold text-rose-600 hover:text-rose-700 underline cursor-pointer"
              >
                1800-888-SAFETY →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Support Contact Modal */}
      {supportModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSupportModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <MdClose className="text-2xl" />
            </button>

            {supportModal === 'chat' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <MdOutlineChat />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Live Support Chat</h3>
                <p className="text-xs text-slate-500 mt-2 mb-6">
                  Connecting to a Dev-Eats support representative... Average wait time &lt; 1 minute.
                </p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-600 mb-6 text-left">
                  <span className="font-bold text-emerald-700">Bot:</span> Hello! How can we assist you with your order today?
                </div>
                <button
                  onClick={() => setSupportModal(null)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors"
                >
                  Close Chat Window
                </button>
              </div>
            )}

            {supportModal === 'email' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Email Support</h3>
                <p className="text-xs text-slate-500 mb-4">Send a ticket directly to support@deveats.com</p>

                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    defaultValue="user@deveats.com"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <textarea
                    rows={3}
                    placeholder="Describe your issue or query..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                  <button
                    onClick={() => {
                      alert('Your support email has been sent successfully!');
                      setSupportModal(null);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors mt-2"
                  >
                    Send Ticket
                  </button>
                </div>
              </div>
            )}

            {supportModal === 'emergency' && (
              <div className="text-center">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <MdOutlinePhoneInTalk />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Safety Emergency Helpline</h3>
                <p className="text-xs text-slate-500 mt-2 mb-6">
                  For urgent safety incidents, food contamination, or emergency situations, call our toll-free hotline:
                </p>
                <div className="text-2xl font-black text-rose-600 bg-rose-50 py-3 rounded-xl border border-rose-100 mb-6 tracking-wider">
                  1800-888-SAFETY
                </div>
                <button
                  onClick={() => setSupportModal(null)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpView;
