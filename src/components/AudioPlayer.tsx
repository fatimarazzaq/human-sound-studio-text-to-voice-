
import { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Download,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
  allowDownload?: boolean;
}

const AudioPlayer = ({ audioUrl, title, allowDownload = true }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setIsLoading(false);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    });
    
    audio.addEventListener('error', () => {
      setIsLoading(false);
      // Handle error state here
    });
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audio.pause();
      audio.remove();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateTime);
    }
    
    setIsPlaying(!isPlaying);
  };

  const updateTime = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    animationRef.current = requestAnimationFrame(updateTime);
  };

  const handleTimeChange = (newTime: number[]) => {
    if (!audioRef.current) return;
    
    const time = newTime[0];
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    if (!audioRef.current) return;
    
    const volume = newVolume[0];
    audioRef.current.volume = volume;
    setVolume(volume);
    
    if (volume === 0) {
      setIsMuted(true);
      audioRef.current.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = title ? `${title.replace(/\s+/g, '_')}.mp3` : 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glassmorphism rounded-lg p-4 w-full">
      {title && <h3 className="text-sm font-medium mb-2 truncate">{title}</h3>}
      
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          disabled={isLoading}
          className="h-10 w-10 flex-shrink-0"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <div className="flex-1 flex flex-col gap-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.01}
            onValueChange={handleTimeChange}
            disabled={isLoading}
            className="w-full"
          />
          
          <div className="flex justify-between text-xs text-foreground/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            disabled={isLoading}
            className="h-8 w-8"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <div className="w-16 hidden sm:block">
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              disabled={isLoading}
            />
          </div>
          
          {allowDownload && (
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadAudio}
              disabled={isLoading}
              className="h-8 w-8"
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
