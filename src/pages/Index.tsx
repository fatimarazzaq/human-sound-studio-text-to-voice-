
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PricingPlans from '@/components/PricingPlans';
import { ArrowRight, Volume2, Headphones, DownloadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Convert your text to natural-sounding audio in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glassmorphism rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">1. Enter Your Text</h3>
                <p className="text-foreground/70">
                  Type or paste your text into our editor. Format it exactly how you want it to sound.
                </p>
              </div>
              
              <div className="glassmorphism rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">2. Choose a Voice</h3>
                <p className="text-foreground/70">
                  Select from our collection of premium male and female voices that sound completely natural.
                </p>
              </div>
              
              <div className="glassmorphism rounded-xl p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <DownloadCloud className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">3. Download Audio</h3>
                <p className="text-foreground/70">
                  Preview your audio and when you're satisfied, download it in high-quality format.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/converter">
                <Button size="lg" className="group">
                  Try It Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-20 px-6 bg-secondary/50">
          <PricingPlans />
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="glassmorphism rounded-xl p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Join thousands of content creators, businesses, and developers who use our human-like voices.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/login">
                    <Button size="lg" className="w-full sm:w-auto">
                      Create Account
                    </Button>
                  </Link>
                  
                  <Link to="/converter">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Try For Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/30 py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Volume2 className="h-5 w-5 text-primary" />
                <span className="font-bold text-lg">VoiceStudio</span>
              </div>
              <p className="text-sm text-foreground/70">
                Premium text-to-speech conversion with natural-sounding human voices.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Voices</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Tutorials</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">About</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-sm text-foreground/70 hover:text-primary">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} VoiceStudio. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-foreground/60 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              
              <a href="#" className="text-foreground/60 hover:text-primary">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
