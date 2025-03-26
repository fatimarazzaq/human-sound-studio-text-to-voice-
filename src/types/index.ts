
export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  description: string;
  previewUrl?: string;
  premium?: boolean;
}

export interface AudioConversion {
  id: string;
  text: string;
  voiceId: string;
  audioUrl?: string;
  status: 'processing' | 'completed' | 'failed';
  createdAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  charactersPerMonth: number;
  class: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  plan: 'free' | 'silver' | 'gold' | 'diamond';
  charactersLeft: number;
  totalCharactersUsed: number;
}
