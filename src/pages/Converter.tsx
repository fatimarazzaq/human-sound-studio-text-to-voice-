
import Navbar from '@/components/Navbar';
import TextToAudioConverter from '@/components/TextToAudioConverter';

const Converter = () => {
  // Free tier character limit
  const freeCharacterLimit = 500;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Text to Audio Converter</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Transform your text into natural-sounding speech with our premium human voices.
            </p>
          </div>
          
          <TextToAudioConverter 
            isLoggedIn={false}
            charactersLimit={freeCharacterLimit}
            charactersLeft={freeCharacterLimit}
          />
        </div>
      </main>
    </div>
  );
};

export default Converter;
