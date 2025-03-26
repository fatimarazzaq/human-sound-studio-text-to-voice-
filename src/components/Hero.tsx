
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-gradient min-h-[85vh] flex items-center justify-center px-6 py-24 animate-fade-in">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium animate-slide-up">
            Transform Text into Natural Human Voice
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up" style={{ animationDelay: '100ms' }}>
            <span className="text-gradient">Premium Human Voices</span> for Your Content
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            Convert your text to natural-sounding voices that are indistinguishable from human speech. Choose from our collection of authentic male and female voices.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Link to="/converter">
              <Button size="lg" className="relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Try Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 button-shimmer opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </Link>
            
            <Link to="/voices">
              <Button variant="outline" size="lg">
                Explore Voices
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 glassmorphism rounded-xl p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <p className="text-sm text-foreground/70 mb-4">Trusted by content creators worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {/* Placeholder logos would go here */}
              <div className="h-6 w-24 bg-foreground/10 rounded animate-pulse-light"></div>
              <div className="h-6 w-28 bg-foreground/10 rounded animate-pulse-light"></div>
              <div className="h-6 w-20 bg-foreground/10 rounded animate-pulse-light"></div>
              <div className="h-6 w-32 bg-foreground/10 rounded animate-pulse-light"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
