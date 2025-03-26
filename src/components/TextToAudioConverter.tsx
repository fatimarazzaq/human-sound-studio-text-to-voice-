
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Download, AlertCircle } from 'lucide-react';
import VoiceSelector from './VoiceSelector';
import AudioPlayer from './AudioPlayer';
import { convertTextToSpeech, sampleVoices } from '@/utils/audioUtils';
import { AudioConversion } from '@/types';

interface TextToAudioConverterProps {
  isLoggedIn?: boolean;
  charactersLimit?: number;
  charactersLeft?: number;
}

const TextToAudioConverter = ({ 
  isLoggedIn = false, 
  charactersLimit = 500,
  charactersLeft = 500 
}: TextToAudioConverterProps) => {
  const [text, setText] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState(sampleVoices[0].id);
  const [isConverting, setIsConverting] = useState(false);
  const [conversion, setConversion] = useState<AudioConversion | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    // Clear any previous errors
    if (error) setError(null);
  };

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoiceId(voiceId);
  };

  const handleConvert = async () => {
    if (!text.trim()) {
      setError('Please enter some text to convert');
      return;
    }

    if (text.length > charactersLeft) {
      setError(`You've exceeded your character limit (${charactersLeft} characters left)`);
      return;
    }

    try {
      setIsConverting(true);
      setError(null);
      
      const result = await convertTextToSpeech(text, selectedVoiceId);
      setConversion(result);
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!conversion?.audioUrl) return;
    
    const link = document.createElement('a');
    link.href = conversion.audioUrl;
    link.download = `voicestudio_${conversion.id}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectedVoice = sampleVoices.find(voice => voice.id === selectedVoiceId);
  const characterCount = text.length;
  const isOverLimit = characterCount > charactersLeft;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glassmorphism rounded-xl p-6 animate-fade-in">
        <h2 className="text-xl font-semibold mb-6">Convert Text to Audio</h2>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="text-input" className="text-sm font-medium">
                Enter Text
              </label>
              <span className={`text-xs ${isOverLimit ? 'text-destructive' : 'text-foreground/70'}`}>
                {characterCount}/{charactersLeft} characters
              </span>
            </div>
            
            <Textarea
              id="text-input"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={handleTextChange}
              className={`min-h-[150px] focus:input-focus-ring ${isOverLimit ? 'border-destructive' : ''}`}
            />
            
            {!isLoggedIn && characterCount >= charactersLimit * 0.8 && (
              <p className="mt-2 text-xs text-foreground/70">
                Almost at the free limit. <a href="/pricing" className="text-primary hover:underline">Upgrade</a> for more characters.
              </p>
            )}
          </div>
          
          <VoiceSelector
            onSelect={handleVoiceSelect}
            selectedVoiceId={selectedVoiceId}
            isLoggedIn={isLoggedIn}
          />
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              onClick={handleConvert}
              disabled={isConverting || !text.trim() || isOverLimit}
              className="flex items-center gap-2"
            >
              {isConverting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> 
                  Converting...
                </>
              ) : (
                'Convert to Audio'
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {conversion && conversion.audioUrl && (
        <div className="mt-8 animate-slide-up">
          <h3 className="text-lg font-medium mb-3">Your Audio</h3>
          
          <div className="space-y-4">
            <AudioPlayer 
              audioUrl={conversion.audioUrl} 
              title={`${text.substring(0, 30)}${text.length > 30 ? '...' : ''}`}
            />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-foreground/70">
                  Voice: <span className="font-medium text-foreground">{selectedVoice?.name}</span>
                </p>
                <p className="text-xs text-foreground/60">
                  Created: {conversion.createdAt.toLocaleString()}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" /> Download MP3
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToAudioConverter;
