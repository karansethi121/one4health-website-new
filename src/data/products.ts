import type { Product, Testimonial, FAQ } from '@/types';
import { MAIN_PRODUCT_HANDLE, MAIN_PRODUCT_TITLE, getPackConfig } from '@/lib/productPricing';

const singlePack = getPackConfig(1);

export const mainProduct: Product = {
  id: MAIN_PRODUCT_HANDLE,
  name: MAIN_PRODUCT_TITLE,
  subtitle: 'KSM-66® Ashwagandha Gummies',
  description: 'Clinically studied KSM-66® Ashwagandha with Vitamin D2 and black pepper extract to support your body\'s stress response, promote relaxation, and help maintain daily balance.',
  price: singlePack.totalPrice,
  originalPrice: singlePack.originalTotalPrice,
  image: '/images/shop-v2.png',
  images: [
    '/images/img1.png',
    '/images/img2.png',
    '/images/img3.png',
    '/images/img4.png',
    '/images/img5.png',
    '/images/img6.png'
  ],
  badge: 'New Launch',
  inStock: true,
  quantity: 100,
  packageSize: '30 Gummies',
  servingSize: '2 Gummies',
  supplyDuration: '15-Day Supply',
  benefits: [
    'Supports a healthy stress response',
    'Promotes relaxation and calm',
    'Helps maintain daily balance',
    'Supports mood and well-being',
    'Enhanced absorption with black pepper extract',
    '100% Allergen Free (No Soy, Gluten, Nuts, Gelatin, Milk)',
  ],
  ingredients: [
    {
      name: 'Ashwagandha (KSM-66®)',
      amount: '150 mg',
      dailyAmount: '300 mg',
      description: 'Full-spectrum root extract supports stress response and promotes calm',
    },
    {
      name: 'Vitamin D2',
      amount: '200 IU',
      dailyAmount: '400 IU',
      description: 'Supports mood balance and healthy immune function',
    },
    {
      name: 'Black Pepper Extract',
      amount: '5 mg',
      dailyAmount: '10 mg',
      description: 'Enhances nutrient absorption by up to 30%',
    },
  ],
  howToUse: [
    'Take 2 gummies daily, preferably in the evening',
    'Consistency is key—take at the same time each day',
    'Allow 2-4 weeks for optimal support',
  ],
  whoItsFor: [
    'Busy professionals managing work stress',
    'Students facing academic pressure',
    'Anyone seeking to support their stress response',
    'People looking to promote relaxation',
    'Those wanting to maintain daily balance',
  ],
  whoShouldAvoid: [
    'Pregnant or nursing women (consult your doctor)',
    'Individuals with autoimmune conditions',
    'Those taking sedative medications',
    'People with known allergies to ashwagandha',
  ],
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya',
    role: '',
    quote: 'Sleep has genuinely improved. Was sceptical but now I take it every night without fail.',
    image: '',
  },
  {
    id: '2',
    name: 'Rahul',
    role: '',
    quote: 'Tastes nothing like a supplement. My kids thought it was candy lol. Works great for stress.',
    image: '',
  },
  {
    id: '3',
    name: 'Ananya',
    role: '',
    quote: 'Been using it for 2 months. Feel way calmer, especially during exam season.',
    image: '',
  },
];

export const faqs: FAQ[] = [
  {
    question: 'What does Ashwagandha support?',
    answer: 'Ashwagandha is an adaptogenic herb that has been traditionally used to support the body\'s stress response, promote relaxation, and help maintain overall balance. Our KSM-66® formula is clinically studied to support these functions.',
  },
  {
    question: 'Why KSM-66® specifically?',
    answer: 'KSM-66® is the most clinically studied ashwagandha root extract available. It\'s a full-spectrum extract (meaning it uses only the root, not leaves) and is backed by 24+ clinical studies demonstrating its efficacy in supporting stress response and promoting calm.',
  },
  {
    question: 'Why is Vitamin D2 included?',
    answer: 'Vitamin D2 supports mood balance and healthy immune function. Many people, especially those with indoor lifestyles, may not get enough Vitamin D. We\'ve included 400 IU per daily serving to complement the stress-supporting benefits of ashwagandha.',
  },
  {
    question: 'What does black pepper extract do?',
    answer: 'Black pepper extract enhances nutrient absorption by up to 30%. This means your body can better utilize the ashwagandha and Vitamin D2 in each serving, making the formula more effective.',
  },
  {
    question: 'How long until I notice changes?',
    answer: 'Everyone\'s body is different. Many people report feeling more balanced within the first week, with optimal support typically experienced after 2-4 weeks of consistent daily use. Consistency is key—take your two gummies at the same time each day.',
  },
  {
    question: 'Are these gummies sugar-free?',
    answer: 'Yes! Our gummies are completely sugar-free. We use natural sweeteners to create a delicious strawberry flavor without the sugar crash. They\'re also vegan, gluten-free, and contain no artificial dyes or flavors.',
  },
  {
    question: 'Can I take these with other supplements?',
    answer: 'Generally yes, but we recommend consulting with your healthcare provider before combining supplements, especially if you\'re taking medications or have existing health conditions.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 15-day satisfaction guarantee. If you\'re not completely happy with your purchase, contact us for a full refund—no questions asked.',
  },
];

export const shippingFAQs: FAQ[] = [
  {
    question: 'How long does shipping take?',
    answer: 'Orders are processed within 1-2 business days. Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout.',
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on all orders across India, with no minimum purchase required.',
  },
  {
    question: 'Can I track my order?',
    answer: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email and SMS to monitor your delivery.',
  },
];
