
import { useState } from 'react';
import { sampleVoices } from '@/utils/audioUtils';
import { Voice } from '@/types';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Lock } from 'lucide-react';

interface VoiceSelectorProps {
  onSelect: (voiceId: string) => void;
  selectedVoiceId: string;
  isLoggedIn?: boolean;
}

const VoiceSelector = ({ onSelect, selectedVoiceId, isLoggedIn = false }: VoiceSelectorProps) => {
  const [currentGender, setCurrentGender] = useState<'male' | 'female' | 'all'>('all');
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);

  const filteredVoices = currentGender === 'all' 
    ? sampleVoices 
    : sampleVoices.filter(voice => voice.gender === currentGender);

  const playPreview = (voice: Voice) => {
    if (voice.premium && !isLoggedIn) return;
    
    setPreviewingVoiceId(voice.id);
    
    // In a real app, this would play an audio preview
    setTimeout(() => {
      setPreviewingVoiceId(null);
    }, 3000);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Select Voice</h3>
        
        <div className="flex p-1 bg-secondary rounded-lg">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentGender === 'all' ? 'bg-white text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
            onClick={() => setCurrentGender('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentGender === 'male' ? 'bg-white text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
            onClick={() => setCurrentGender('male')}
          >
            Male
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              currentGender === 'female' ? 'bg-white text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
            }`}
            onClick={() => setCurrentGender('female')}
          >
            Female
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVoices.map((voice) => (
          <div
            key={voice.id}
            className={`p-4 rounded-lg border transition-all ${
              selectedVoiceId === voice.id
                ? 'border-primary/50 bg-primary/5'
                : 'border-border bg-card hover:border-primary/30'
            } ${voice.premium && !isLoggedIn ? 'opacity-80' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">{voice.name}</h4>
                  {voice.premium && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gold-light text-gold-dark">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/70 mt-1">{voice.description}</p>
              </div>
              <Volume2 className="h-5 w-5 text-primary/70" />
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => playPreview(voice)}
                disabled={voice.premium && !isLoggedIn || previewingVoiceId === voice.id}
              >
                {previewingVoiceId === voice.id ? (
                  <span className="flex items-center">
                    Playing<span className="ml-1 animate-pulse">...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    {voice.premium && !isLoggedIn ? <Lock size={14} /> : <Play size={14} />}
                    Preview
                  </span>
                )}
              </Button>
              
              <Button
                size="sm"
                className="flex-1"
                onClick={() => onSelect(voice.id)}
                disabled={voice.premium && !isLoggedIn}
                variant={selectedVoiceId === voice.id ? "default" : "secondary"}
              >
                {selectedVoiceId === voice.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {!isLoggedIn && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg text-sm text-center">
          Upgrade to access all premium voices. <a href="/pricing" className="text-primary hover:underline">View plans</a>
        </div>
      )}
    </div>
  );
};

export default VoiceSelector;
