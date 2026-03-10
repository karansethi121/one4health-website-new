import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { gsap } from 'gsap';
import { LucideMail, LucideCheckCircle2, LucideArrowRight, LucideLeaf, LucideSparkles, LucideHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

// High-end Gummy SVG Component
const GummyIcon: React.FC<{ color: string; size: string; className?: string }> = ({ color, size, className }) => (
    <svg
        viewBox="0 0 100 100"
        className={`${size} ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id={`grad-${color}`} cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} />
            </radialGradient>
        </defs>
        <rect
            x="20" y="20" width="60" height="60"
            rx="20"
            fill={`url(#grad-${color})`}
            className="drop-shadow-xl"
        />
        <rect
            x="25" y="25" width="20" height="10"
            rx="5"
            fill="white"
            fillOpacity="0.3"
        />
    </svg>
);

export const ComingSoonPage: React.FC = () => {
    useDocumentTitle('Coming Soon | One4Health™', false);

    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const gummiesContainerRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        // Apply scroll-friendly class to body
        document.body.classList.add('coming-soon-mode');

        const ctx = gsap.context(() => {
            // Entrance Animations
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo(cardRef.current,
                { scale: 0.95, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 1.5 }
            )
                .fromTo(logoRef.current,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=1"
                )
                .fromTo(contentRef.current?.children || [],
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
                    "-=0.7"
                )
                .fromTo(infoRef.current?.children || [],
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                    "-=0.5"
                );

            // Gummy Animations
            if (gummiesContainerRef.current) {
                const gummies = gummiesContainerRef.current.children;
                Array.from(gummies).forEach((gummy) => {
                    gsap.set(gummy, {
                        x: gsap.utils.random(0, window.innerWidth),
                        y: gsap.utils.random(-200, -100),
                        rotation: gsap.utils.random(0, 360),
                        opacity: gsap.utils.random(0.3, 0.6)
                    });

                    gsap.to(gummy, {
                        y: window.innerHeight + 200,
                        x: `+=${gsap.utils.random(-100, 100)}`,
                        rotation: `+=${gsap.utils.random(360, 720)}`,
                        duration: gsap.utils.random(15, 25),
                        repeat: -1,
                        ease: "none",
                        delay: gsap.utils.random(0, 15)
                    });

                    gsap.to(gummy, {
                        x: `+=${gsap.utils.random(-50, 50)}`,
                        duration: gsap.utils.random(3, 5),
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });
                });
            }
        }, containerRef);

        return () => {
            ctx.revert();
            document.body.classList.remove('coming-soon-mode');
        };
    }, []);

    const onSubmit = async (data: FormValues) => {
        try {
            // Real Email Integration using Shopify's native Contact Form endpoint
            // This securely sends an email to the store owner's Shopify admin email without needing 3rd party apps.
            // On localhost, it simulates the request to avoid CORS errors during active development.
            const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

            if (isLocal) {
                console.log('[Dev Mode] Simulated Waitlist Signup for:', data.email);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                try {
                    const formData = new URLSearchParams();
                    formData.append('form_type', 'contact');
                    formData.append('utf8', '✓');
                    formData.append('contact[email]', data.email);
                    formData.append('contact[tags]', 'newsletter, waitlist_coming_soon');
                    formData.append('contact[body]', 'Early Access Waitlist Signup from Coming Soon Page');

                    const response = await fetch('/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'text/html'
                        },
                        body: formData.toString()
                    });

                    if (!response.ok) {
                        console.error('Shopify contact submission failed (Admin notification). status:', response.status);
                    }
                } catch (e) {
                    console.error('Failed to submit to Shopify /contact endpoint:', e);
                    // Do not throw here. We want to ensure the customer still gets their EmailJS "Thank You" email.
                }
            }

            // ---------------------------------------------------------
            // 2. Real Customer Email Automation using EmailJS
            // This sends the "Thank You" email directly to the customer.
            // ---------------------------------------------------------

            // TODO: REPLACE THESE PLACEHOLDERS WITH YOUR ACTUAL EMAILJS KEYS
            const EMAILJS_SERVICE_ID = 'service_3xkrkk9';
            const EMAILJS_TEMPLATE_ID = 'template_18vaeqv'; // Added real template ID
            const EMAILJS_PUBLIC_KEY = 'g5a4Avnc7hq96Qu6X';

            const templateParams = {
                to_email: data.email, // The customer's email
                message: "Thank you for joining the One4Health waitlist!"
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );
            console.log('Customer Thank You email sent successfully via EmailJS');

            toast.success('You\'re on the list! Check your inbox for a welcome note.', {
                description: 'We\'ve successfully received your email.',
                duration: 5000,
            });
            reset();
        } catch (error: any) {
            console.error('Email submission error:', error);
            const errorMessage = error instanceof Error ? error.message : (error?.text || JSON.stringify(error));
            toast.error(`Error: ${errorMessage}. Please try again.`);
        }
    };

    const gummyColors = ['#9BB88E', '#FF8F75', '#FFD555', '#BCA0FF'];

    return (
        <div
            ref={containerRef}
            className="relative min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden flex items-start lg:items-center justify-center bg-sage-50 px-4 sm:px-6 lg:p-12 mb-20"
        >
            {/* Animated Gummy Background */}
            <div ref={gummiesContainerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40">
                {[...Array(20)].map((_, i) => (
                    <GummyIcon
                        key={i}
                        color={gummyColors[i % gummyColors.length]}
                        size="w-12 h-12 md:w-16 md:h-16"
                        className="absolute"
                    />
                ))}
            </div>

            {/* Glossy Backdrop Overlay */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] z-[1]" />

            <main className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row gap-10 lg:gap-20 items-center px-4 pt-0 pb-20 lg:py-0">
                {/* Left Side: Brand Story & Info */}
                <div ref={infoRef} className="flex-1 text-center lg:text-left space-y-1 lg:space-y-2 max-w-xl -mt-8 sm:-mt-12 lg:mt-0">
                    <div ref={logoRef} className="inline-block transform-gpu animate-bounce-subtle">
                        <img
                            src="/images/logo_new.webp"
                            alt="One4Health™"
                            width="288"
                            height="288"
                            fetchPriority="high"
                            loading="eager"
                            className="h-44 sm:h-56 lg:h-72 w-auto object-contain transition-transform duration-700 hover:scale-110 drop-shadow-2xl"
                        />
                    </div>

                    <div className="space-y-4 lg:space-y-6">
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold font-heading text-sage-900 leading-[1.1] tracking-tight">
                            Honest Wellness, <br className="hidden lg:block" />
                            <span className="text-charcoal-700 relative inline-block">
                                Reimagined.
                                <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-sunshine-300/40 rounded-full scale-x-0 origin-left animate-expand-x" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }} />
                            </span>
                        </h2>
                        <p className="text-sage-800 text-base sm:text-lg lg:text-2xl leading-relaxed opacity-80 font-medium max-w-lg mx-auto lg:mx-0">
                            Simplifying daily rituals with <span className="text-sage-600 font-bold underline decoration-sunshine-300 decoration-2 underline-offset-4">100% natural</span>, science-backed formulas.
                        </p>
                    </div>

                    {/* Fun Staggered Badges */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-6 lg:pt-8">
                        {[
                            { icon: LucideLeaf, text: "Natural", bg: "bg-sage-100", color: "text-sage-700", animation: "hover:animate-wiggle" },
                            { icon: LucideSparkles, text: "Science", bg: "bg-coral-100", color: "text-coral-700", animation: "hover:animate-pop" },
                            { icon: LucideHeart, text: "Pure", bg: "bg-sunshine-100", color: "text-sunshine-700", animation: "hover:animate-wiggle" },
                            { icon: LucideCheckCircle2, text: "Clean", bg: "bg-lavender-100", color: "text-lavender-700", animation: "hover:animate-pop" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 ${item.bg} ${item.color} rounded-full shadow-fun font-black text-sm lg:text-lg transition-transform hover:-translate-y-1 cursor-pointer ${item.animation}`}
                            >
                                <item.icon className="w-4 h-4 lg:w-6 lg:h-6" />
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Notification Card */}
                <div
                    ref={cardRef}
                    className="flex-1 w-full max-w-md lg:translate-y-4"
                >
                    <div className="backdrop-blur-[40px] bg-white/40 border border-white/80 rounded-[3rem] lg:rounded-[4rem] p-8 sm:p-12 lg:p-16 shadow-fun relative overflow-hidden group">
                        {/* Ambient inner glow */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 bg-sunshine-200/30 blur-3xl rounded-full animate-pulse" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-sage-200/30 blur-3xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

                        <div ref={contentRef} className="relative z-10 text-center space-y-8 lg:space-y-10">
                            <div className="inline-flex px-5 py-2 bg-sage-900 text-white rounded-full text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase shadow-2xl">
                                Coming Soon
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-charcoal-900 leading-tight">
                                    Join our <br />Early List
                                </h1>
                                <p className="text-charcoal-600 text-sm sm:text-base opacity-80">
                                    Be the first to know when One4Health™ launches and get exclusive early access.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-sage-500 transition-colors group-focus-within:text-sage-700">
                                        <LucideMail className="w-5 h-5 lg:w-6 lg:h-6" />
                                    </div>
                                    <Input
                                        {...register('email')}
                                        type="email"
                                        placeholder="you@email.com"
                                        className={`pl-12 lg:pl-14 py-6 lg:py-8 rounded-2xl lg:rounded-3xl border-white/80 bg-white/90 focus:ring-sage-400 focus:border-sage-400 text-base lg:text-xl transition-all shadow-inner hover:bg-white ${errors.email ? 'border-coral-400 ring-coral-400/10' : ''}`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="text-xs lg:text-sm text-coral-600 font-bold animate-in fade-in slide-in-from-top-1">
                                        {errors.email.message}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-7 lg:py-10 rounded-2xl lg:rounded-3xl bg-sage-900 hover:bg-black text-white font-bold text-base lg:text-xl shadow-2xl shadow-sage-900/20 transition-all active:scale-95 group overflow-hidden relative"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isSubmitting ? 'Syncing...' : 'Notify Me'}
                                        {!isSubmitting && <LucideArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-sage-800 to-sage-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </form>

                            <div className="flex items-center justify-center gap-2 text-sage-500 text-[10px] lg:text-xs font-bold pt-2 uppercase tracking-tight">
                                <LucideCheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-sage-600" />
                                <span>One4Health™: No fluff. No spam.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Text */}
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center z-10 px-4">
                <p className="text-sage-400 text-[8px] sm:text-[10px] tracking-[0.3em] uppercase font-bold leading-relaxed">
                    &copy; 2024 ONE4HEALTH™ | NATURE'S WISDOM, MODERN SCIENCE.
                </p>
            </div>
        </div>
    );
};
