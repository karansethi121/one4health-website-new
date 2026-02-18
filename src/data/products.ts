import type { Product, Testimonial, FAQ } from '@/types';

export const mainProduct: Product = {
  id: 'ashwagandha-gummies-ksm66',
  name: 'Ashwagandha Gummies',
  subtitle: 'KSM-66® Ashwagandha Gummies',
  description: 'Clinically studied KSM-66® Ashwagandha with Vitamin D2 and BioPerine® to support your body\'s stress response, promote relaxation, and help maintain daily balance.',
  price: 1299,
  originalPrice: 1599,
  image: '/images/product_transparent.png',
  images: [
    '/images/product_transparent.png',
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
    'Enhanced absorption with BioPerine®',
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
      name: 'BioPerine® (Black Pepper Extract)',
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
    name: 'Maya',
    role: 'Designer',
    quote: 'I feel more balanced throughout my workday. This has become an essential part of my evening routine.',
    image: '/images/testimonial_maya.jpg',
  },
  {
    id: '2',
    name: 'Jon',
    role: 'Developer',
    quote: 'Tastes like candy, helps me unwind. Finally, a supplement I actually look forward to taking.',
    image: '/images/testimonial_jon.jpg',
  },
  {
    id: '3',
    name: 'Riley',
    role: 'Founder',
    quote: 'My evening ritual in 30 seconds. As a founder, stress is constant. This helps me stay grounded.',
    image: '/images/testimonial_riley.jpg',
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
    question: 'What does BioPerine® do?',
    answer: 'BioPerine® is a patented black pepper extract that enhances nutrient absorption by up to 30%. This means your body can better utilize the ashwagandha and Vitamin D2 in each serving, making the formula more effective.',
  },
  {
    question: 'How long until I notice changes?',
    answer: 'Everyone\'s body is different. Many people report feeling more balanced within the first week, with optimal support typically experienced after 2-4 weeks of consistent daily use. Consistency is key—take your two gummies at the same time each day.',
  },
  {
    question: 'Are these gummies sugar-free?',
    answer: 'Yes! Our gummies are completely sugar-free. We use natural sweeteners to create a delicious berry flavor without the sugar crash. They\'re also vegan, gluten-free, and contain no artificial dyes or flavors.',
  },
  {
    question: 'Can I take these with other supplements?',
    answer: 'Generally yes, but we recommend consulting with your healthcare provider before combining supplements, especially if you\'re taking medications or have existing health conditions.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day satisfaction guarantee. If you\'re not completely happy with your purchase, contact us for a full refund—no questions asked.',
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
