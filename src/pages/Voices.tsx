
import Navbar from '@/components/Navbar';
import { sampleVoices, playVoicePreview } from '@/utils/audioUtils';
import { Button } from '@/components/ui/button';
import { Volume2, Play, Lock, Square } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const Voices = () => {
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
  
  const handlePlayPreview = (voiceId: string, isPremium: boolean = false) => {
    // For demo purposes, allow playing premium voices on the voices page
    setPreviewingVoiceId(voiceId);
    playVoicePreview(voiceId);
    
    // Set a timeout to reset the state if the audio doesn't play or end properly
    setTimeout(() => {
      setPreviewingVoiceId(prev => prev === voiceId ? null : prev);
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Our Premium Voices</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Explore our collection of natural-sounding, human voices for your audio content.
            </p>
          </div>
          
          <div className="flex justify-center mb-10">
            <div className="flex p-1 bg-secondary rounded-lg">
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentGender === 'all' ? 'bg-white text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setCurrentGender('all')}
              >
                All Voices
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentGender === 'male' ? 'bg-white text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setCurrentGender('male')}
              >
                Male Voices
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentGender === 'female' ? 'bg-white text-primary shadow-sm' : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setCurrentGender('female')}
              >
                Female Voices
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVoices.map((voice) => (
              <div
                key={voice.id}
                className="glassmorphism rounded-xl p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-medium">{voice.name}</h3>
                      {voice.premium && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gold-light text-gold-dark">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 mt-1">{voice.gender === 'male' ? 'Male Voice' : 'Female Voice'}</p>
                  </div>
                  <Volume2 className="h-6 w-6 text-primary" />
                </div>
                
                <p className="mb-6">{voice.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="space-x-1">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className="inline-block h-1.5 w-1.5 rounded-full bg-primary"></span>
                      ))}
                    </div>
                    <div className="ml-2 text-xs text-foreground/70">Sample waveform</div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => previewingVoiceId === voice.id ? handleStopPreview() : handlePlayPreview(voice.id, voice.premium)}
                  >
                    {previewingVoiceId === voice.id ? (
                      <span className="flex items-center gap-1">
                        <Square size={14} /> Stop
                      </span>
                    ) : (
                      <>
                        <Play size={14} />
                        Preview
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 glassmorphism rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Want to Use These Voices?</h2>
            <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
              Get access to all premium voices with our subscription plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/pricing">View Plans</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/converter">Try For Free</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Voices;
