import { Tag, Truck, Clock, Leaf } from 'lucide-react';

export function PromoMarquee() {
    const promoMessages = [
        { text: "SAVE 20% OFF WITH CODE:", highlight: "HEALTH20", Icon: Tag },
        { text: "FREE SHIPPING ON ORDERS OVER", highlight: "₹999", Icon: Truck },
        { text: "LIMITED TIME OFFER", highlight: "ENDS SUNDAY", Icon: Clock },
        { text: "NATURE BLESSED,", highlight: "SCIENCE BACKED", Icon: Leaf },
    ];

    const PromoContent = () => (
        <div className="flex shrink-0 items-center gap-16 pr-16 bg-sage-800">
            {promoMessages.map((msg, i) => (
                <span key={i} className="flex items-center gap-3">
                    <msg.Icon className="w-4 h-4 text-sunshine-400" />
                    <span className="flex items-center gap-2">
                        {msg.text} <span className="text-sunshine-300">{msg.highlight}</span>
                    </span>
                </span>
            ))}
            {/* Duplicate for density if needed, or just map again */}
            {promoMessages.map((msg, i) => (
                <span key={`dup-${i}`} className="flex items-center gap-3">
                    <msg.Icon className="w-4 h-4 text-sunshine-400" />
                    <span className="flex items-center gap-2">
                        {msg.text} <span className="text-sunshine-300">{msg.highlight}</span>
                    </span>
                </span>
            ))}
        </div>
    );

    return (
        <div className="w-full bg-sage-800 text-white overflow-hidden whitespace-nowrap py-2 text-[10px] lg:text-xs font-bold tracking-wider border-b border-sage-700 relative z-30">
            <div className="flex w-max animate-marquee">
                <PromoContent />
                <PromoContent />
            </div>
        </div>
    );
}
