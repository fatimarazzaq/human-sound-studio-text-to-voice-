
import { Voice, AudioConversion } from '@/types';

// Sample voices - these would be replaced with actual voices from an API
export const sampleVoices: Voice[] = [
  {
    id: 'male-1',
    name: 'James',
    gender: 'male',
    description: 'Deep and authoritative male voice with a warm tone.',
  },
  {
    id: 'male-2',
    name: 'Michael',
    gender: 'male',
    description: 'Clear and professional male voice with a neutral accent.',
    premium: true,
  },
  {
    id: 'male-3',
    name: 'Robert',
    gender: 'male',
    description: 'Smooth and engaging male voice with a slight British accent.',
    premium: true,
  },
  {
    id: 'female-1',
    name: 'Emma',
    gender: 'female',
    description: 'Friendly and articulate female voice with a warm tone.',
  },
  {
    id: 'female-2',
    name: 'Sophia',
    gender: 'female',
    description: 'Clear and professional female voice with a neutral accent.',
    premium: true,
  },
  {
    id: 'female-3',
    name: 'Olivia',
    gender: 'female',
    description: 'Smooth and engaging female voice with a slight British accent.',
    premium: true,
  },
];

// This is a placeholder for the actual text-to-speech API
export const convertTextToSpeech = async (
  text: string,
  voiceId: string
): Promise<AudioConversion> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const conversion: AudioConversion = {
        id: Math.random().toString(36).substring(2, 11),
        text,
        voiceId,
        // In a real app, this would be a URL to the audio file
        audioUrl: 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-0.mp3',
        status: 'completed',
        createdAt: new Date(),
      };
      resolve(conversion);
    }, 2000);
  });
};

// Dummy function to get a user's conversions
export const getUserConversions = async (): Promise<AudioConversion[]> => {
  // This would be a call to your backend
  return [
    {
      id: '1',
      text: 'Welcome to our text-to-speech converter. Try it out now!',
      voiceId: 'female-1',
      audioUrl: 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '2',
      text: 'This is a sample of our premium voices. Subscribe to access all voices.',
      voiceId: 'male-2',
      audioUrl: 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-2.mp3',
      status: 'completed',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
    },
  ];
};

// Pricing plans
export const pricingPlans = [
  {
    id: 'silver',
    name: 'Silver',
    price: 9.99,
    description: 'Perfect for occasional use',
    features: [
      'Up to 10,000 characters per month',
      'Access to basic voices',
      'Standard conversion speed',
      'MP3 downloads',
    ],
    charactersPerMonth: 10000,
    class: 'plan-silver',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 19.99,
    description: 'Great for regular content creators',
    features: [
      'Up to 50,000 characters per month',
      'Access to all voices',
      'Priority conversion speed',
      'MP3 and WAV downloads',
      'Voice customization options',
    ],
    recommended: true,
    charactersPerMonth: 50000,
    class: 'plan-gold',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 39.99,
    description: 'For professional content production',
    features: [
      'Unlimited characters',
      'Access to all voices',
      'Highest priority conversion',
      'All audio formats',
      'Advanced voice customization',
      'Commercial license',
    ],
    charactersPerMonth: Infinity,
    class: 'plan-diamond',
  },
];
