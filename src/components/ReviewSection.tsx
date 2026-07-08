import React, { useState } from 'react';
import { REVIEWS } from '../data';
import { Star, Heart, Award, ShieldCheck, Quote } from 'lucide-react';

export default function ReviewSection() {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  // Custom new review inputs
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleHelpful = (id: string) => {
    setReviewsList(prev => prev.map(rev => {
      if (rev.id === id) {
        return { ...rev, helpfulCount: rev.helpfulCount + 1 };
      }
      return rev;
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRevItem = {
      id: `rev_${Date.now()}`,
      userName: newName,
      userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150', // Default avatar
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      helpfulCount: 0
    };

    setReviewsList([newRevItem, ...reviewsList]);
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
    setShowForm(false);
  };

  return (
    <section id="reviews-section" className="bg-white py-16 border-t border-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-green-600 bg-green-50 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100 uppercase tracking-widest">
            Loved By Locals
          </span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mt-3">
            What Foodies In Bangalore Say
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1.5">
            Real customer comments about our legendary 100% fresh meat rolls. Serving Bangalore since 2021!
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-950 text-white rounded-3xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 h-44 w-44 bg-green-800 rounded-full blur-2xl opacity-40" />
            
            <div className="relative z-10">
              <Quote className="h-10 w-10 text-green-400 opacity-60 mb-4" />
              <p className="text-lg font-bold text-green-100 leading-relaxed italic">
                "Our motto has always been absolute transparency. For 5+ years, we have parsed through multiple meat vendors to strictly partner only with certified local farms delivering zero-frozen premium meat every single morning."
              </p>
            </div>
            
            <div className="mt-8 relative z-10 flex items-center space-x-3 border-t border-white/10 pt-4">
              <div className="bg-green-600 h-10 w-10 rounded-full flex items-center justify-center font-extrabold text-sm text-white">
                FI
              </div>
              <div>
                <p className="text-sm font-extrabold">Executive Chef, Foodie In Bangalore</p>
                <p className="text-xs text-green-300">ESTD 2021 • Certified Premium Rolls</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex items-start space-x-4">
              <div className="bg-green-100 text-green-800 p-3 rounded-xl shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">100% Halal Fresh Meat</h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Sourced daily at 5:00 AM, cooked fresh over authentic hot charcoal clay-ovens.</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex items-start space-x-4">
              <div className="bg-green-100 text-green-800 p-3 rounded-xl shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-sm">5 Years of Consistent Quality</h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Over 500,000 satisfied roll lovers in Bengaluru across our 4 flagship outlets.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-green-600 hover:bg-green-700 text-white text-xs font-extrabold uppercase tracking-widest px-6 py-3 rounded-xl cursor-pointer shadow-md shadow-green-600/10"
              >
                {showForm ? 'Cancel Review' : 'Write a Review'}
              </button>
            </div>
          </div>
        </div>

        {/* Customer review form */}
        {showForm && (
          <div className="bg-green-50/50 border border-green-100 rounded-3xl p-6 mb-12 max-w-xl mx-auto animate-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-lg text-green-950 mb-4">Share Your Foodie Experience</h3>
            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full text-xs font-bold p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Star Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full text-xs font-bold p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Your Comments</label>
                <textarea
                  required
                  placeholder="What makes our rolls special? How did you like the fresh meat quality?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full text-xs font-medium p-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold uppercase tracking-widest py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Submit My Review
              </button>
            </form>
          </div>
        )}

        {/* Review submitted alert success */}
        {isSuccess && (
          <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold text-sm mb-6 max-w-md mx-auto">
            🎉 Review shared successfully! Thank you for supporting local taste!
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewsList.map((rev, index) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* User Info header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={rev.userImage}
                      alt={rev.userName}
                      className="h-10 w-10 rounded-full object-cover border-2 border-green-50"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-gray-800">{rev.userName}</h4>
                      <p className="text-[10px] text-gray-400 font-medium">{rev.date}</p>
                    </div>
                  </div>

                  {/* Stars block */}
                  <div className="flex items-center space-x-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(rev.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Comment body */}
                <p className="text-xs text-gray-600 font-medium leading-relaxed mt-4">
                  {rev.comment}
                </p>
              </div>

              {/* Useful helpful counter footer */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50 text-[11px] font-bold text-gray-400">
                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-[10px]">
                  Verified Foodie Customer
                </span>
                
                <button
                  type="button"
                  onClick={() => handleHelpful(rev.id)}
                  className="flex items-center space-x-1.5 hover:text-green-600 transition-colors"
                >
                  <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400 shrink-0" />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
