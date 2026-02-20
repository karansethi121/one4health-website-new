import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Star, Users, Sparkles, X, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
    setIsReviewModalOpen(false);
    toast.success('Thank you for your review!');
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/product_hands.webp"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sage-50 via-sage-50/95 to-sage-50" />
      </div>

      <div className="section-container relative z-10">
        {/* Title */}
        <div className="testimonials-title text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-sage-100 rounded-xl mb-4">
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-sage-700" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-charcoal-900 leading-tight mb-4">
            {reviews.length > 0 ? 'What our customers say' : 'Be among the first'}
          </h2>
          <p className="text-base lg:text-lg text-charcoal-500 max-w-xl mx-auto">
            {reviews.length > 0 
              ? `Join ${reviews.length} happy customers who've made One4Health part of their daily ritual.`
              : "We're just getting started. Join our founding customers and help shape the One4Health story."}
          </p>
        </div>

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10">
            {reviews.map((review) => (
              <div key={review.id} className="testimonial-card bg-white rounded-2xl p-5 lg:p-6 shadow-soft">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-sunshine-400 text-sunshine-400' : 'text-charcoal-200'}`}
                    />
                  ))}
                </div>
                <p className="text-charcoal-700 text-sm mb-4">"{review.comment}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-charcoal-900 text-sm">{review.name}</p>
                  <p className="text-xs text-charcoal-400">{review.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Coming Soon / Add Review Card */}
        <div className="testimonial-card max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-center shadow-soft">
            {/* Empty State Illustration */}
            <div className="flex justify-center mb-5">
              <div className="relative">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-sage-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 lg:w-10 lg:h-10 text-sage-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 lg:w-8 lg:h-8 bg-sunshine-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-sunshine-600" />
                </div>
              </div>
            </div>

            <h3 className="text-lg lg:text-xl font-semibold text-charcoal-900 mb-2">
              {reviews.length > 0 ? 'Share your experience' : 'Reviews Coming Soon'}
            </h3>
            <p className="text-charcoal-500 mb-5 max-w-md mx-auto text-sm">
              {reviews.length > 0 
                ? 'Help others discover One4Health by sharing your story.'
                : "We're excited to hear from our first customers. Be the one to share your experience with One4Health!"}
            </p>

            {/* Add Review Button */}
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-2 bg-sage-700 hover:bg-sage-800 text-white font-semibold px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 text-sm"
            >
              <Star className="w-4 h-4" />
              Add a Review
            </button>

            {/* Benefits reminder */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 bg-sage-50 px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5 text-sage-500" />
                30-day guarantee
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 bg-sage-50 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-sage-500" />
                Share your feedback
              </span>
            </div>
          </div>
        </div>

        {/* Early Adopter CTA */}
        <div className="testimonials-title mt-8 lg:mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-sage-700 text-white rounded-full px-4 py-2.5">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium text-sm">Launch Special: 15% Off First Order</span>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center hover:bg-sage-200 transition-colors"
            >
              <X className="w-4 h-4 text-sage-700" />
            </button>
            
            <h3 className="text-xl font-semibold text-charcoal-900 mb-1">Write a Review</h3>
            <p className="text-sm text-charcoal-500 mb-5">Share your experience with One4Health</p>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= newReview.rating ? 'fill-sunshine-400 text-sunshine-400' : 'text-charcoal-200'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full px-4 py-3 bg-sage-50 border border-sage-200 rounded-xl text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-sage-500 text-sm resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-sage-700 hover:bg-sage-800 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
