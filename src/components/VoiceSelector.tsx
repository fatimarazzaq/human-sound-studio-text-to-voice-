
import { useState, useEffect } from 'react';
import { sampleVoices, playVoicePreview } from '@/utils/audioUtils';
import { Voice } from '@/types';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceSelectorProps {
  onSelect: (voiceId: string) => void;
  selectedVoiceId: string;
  isLoggedIn?: boolean;
}

const VoiceSelector = ({ onSelect, selectedVoiceId, isLoggedIn = false }: VoiceSelectorProps) => {
  const [currentGender, setCurrentGender] = useState<'male' | 'female' | 'all'>('all');
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredVoices = currentGender === 'all' 
    ? sampleVoices 
    : sampleVoices.filter(voice => voice.gender === currentGender);

  useEffect(() => {
    // Listen for audio ended event to reset the previewing state
    const handleAudioEnded = () => {
      setPreviewingVoiceId(null);
    };

    const audio = document.getElementById('voice-preview-audio') as HTMLAudioElement;
    if (audio) {
      audio.addEventListener('ended', handleAudioEnded);
    }

    return () => {
      const audio = document.getElementById('voice-preview-audio') as HTMLAudioElement;
      if (audio) {
        audio.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, [previewingVoiceId]);

  const handlePlayPreview = (voice: Voice) => {
    // All voices are now free
    setPreviewingVoiceId(voice.id);
    playVoicePreview(voice.id);
    
    // Set a timeout to reset the state if the audio doesn't play or end properly
    setTimeout(() => {
      setPreviewingVoiceId(prev => prev === voice.id ? null : prev);
    }, 10000); // 10 seconds as a safety
  };

  const handleStopPreview = () => {
    const audio = document.getElementById('voice-preview-audio') as HTMLAudioElement;
    if (audio) {
      audio.pause();
      audio.remove();
    }
    setPreviewingVoiceId(null);
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
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">{voice.name}</h4>
                </div>
                <p className="text-sm text-foreground/70 mt-1">{voice.description}</p>
              </div>
              <Volume2 className="h-5 w-5 text-primary/70" />
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={`flex-1 voice-preview-button ${previewingVoiceId === voice.id ? 'playing' : ''}`}
                onClick={() => previewingVoiceId === voice.id ? handleStopPreview() : handlePlayPreview(voice)}
              >
                {previewingVoiceId === voice.id ? (
                  <span className="flex items-center gap-1">
                    <Square size={14} /> 
                    Stop
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Play size={14} />
                    Preview
                  </span>
                )}
              </Button>
              
              <Button
                size="sm"
                className="flex-1"
                onClick={() => onSelect(voice.id)}
                variant={selectedVoiceId === voice.id ? "default" : "secondary"}
              >
                {selectedVoiceId === voice.id ? 'Selected' : 'Select'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceSelector;
