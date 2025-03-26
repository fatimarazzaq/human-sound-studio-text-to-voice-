
import { Voice, AudioConversion } from '@/types';

// Updated voices with rich descriptions highlighting quality, emotional range, and accent details
// Now with working audio preview URLs
export const sampleVoices: Voice[] = [
  {
    id: 'male-1',
    name: 'James',
    gender: 'male',
    description: 'Clear and articulate British English male voice with a warm, conversational tone. Excellent for storytelling with subtle emotional inflections.',
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/56/En-Matthew_6-9-13_male.ogg',
  },
  {
    id: 'male-2',
    name: 'Michael',
    gender: 'male',
    description: 'Crisp, professional American English male voice with a calm, authoritative presence. Perfect for explanations with natural-sounding emphasis.',
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/En-US-California-NewYork.ogg',
  },
  {
    id: 'male-3',
    name: 'Robert',
    gender: 'male',
    description: 'Smooth and engaging British English male voice with excellent diction and emotional range. Ideal for narrative content requiring nuanced expression.',
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/En-uk-welcome_to_wikipedia.ogg',
  },
  {
    id: 'female-1',
    name: 'Emma',
    gender: 'female',
    description: 'Youthful 24-year-old British English female voice with crystal clear pronunciation. Conveys a friendly, conversational style with natural emotional depth.',
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/En-uk-welcome.ogg',
  },
  {
    id: 'female-2',
    name: 'Sophia',
    gender: 'female',
    description: '23-year-old American English female voice with exceptional clarity and a soothing, confident tone. Perfect for engaging presentations with authentic emotional qualities.',
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/En-us-washington.ogg',
  },
  {
    id: 'female-3',
    name: 'Olivia',
    gender: 'female',
    description: '25-year-old British English female voice with a melodic quality and excellent diction. Delivers content with natural pacing and subtle emotional inflections.',
    previewUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/En-uk-oxford.ogg',
  },
];

// Updated text-to-speech API to use different voices for each selection
export const convertTextToSpeech = async (
  text: string,
  voiceId: string
): Promise<AudioConversion> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Find the selected voice to use its specific audio
      const selectedVoice = sampleVoices.find(v => v.id === voiceId);
      
      // Different demo audio based on voice selection
      let demoAudioUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/56/En-Matthew_6-9-13_male.ogg'; // default
      
      if (selectedVoice) {
        demoAudioUrl = selectedVoice.previewUrl || demoAudioUrl;
      }
      
      const conversion: AudioConversion = {
        id: Math.random().toString(36).substring(2, 11),
        text,
        voiceId,
        audioUrl: demoAudioUrl,
        status: 'completed',
        createdAt: new Date(),
      };
      resolve(conversion);
    }, 2000);
  });
};

// Function to play a voice preview - fixed to handle errors better
export const playVoicePreview = (voiceId: string): void => {
  const voice = sampleVoices.find(v => v.id === voiceId);
  if (!voice || !voice.previewUrl) return;
  
  // Stop any currently playing audio
  const existingAudio = document.getElementById('voice-preview-audio') as HTMLAudioElement;
  if (existingAudio) {
    existingAudio.pause();
    existingAudio.remove();
  }
  
  // Create and play new audio
  const audio = new Audio(voice.previewUrl);
  audio.id = 'voice-preview-audio';
  document.body.appendChild(audio);
  
  // Add a class to indicate playing state on the component
  audio.addEventListener('ended', () => {
    const previewButtons = document.querySelectorAll('.voice-preview-button');
    previewButtons.forEach(button => {
      button.classList.remove('playing');
    });
    audio.remove();
  });
  
  // Add better error handling for audio playback
  audio.addEventListener('error', (e) => {
    console.error('Error playing audio preview:', e);
    const previewButtons = document.querySelectorAll('.voice-preview-button');
    previewButtons.forEach(button => {
      button.classList.remove('playing');
    });
  });
  
  audio.play().catch(error => {
    console.error('Error playing audio preview:', error);
  });
};

// Dummy function to get a user's conversions - updated to use different voices
export const getUserConversions = async (): Promise<AudioConversion[]> => {
  // This would be a call to your backend
  return [
    {
      id: '1',
      text: 'Welcome to our text-to-speech converter. Try it out now!',
      voiceId: 'female-1',
      audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/16/En-uk-welcome.ogg',
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: '2',
      text: 'This is a sample of our voices. All voices are free to use.',
      voiceId: 'male-2',
      audioUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/En-US-California-NewYork.ogg',
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
