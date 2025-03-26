
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User,
  Volume2
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism py-4 px-6 animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Volume2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">VoiceStudio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-foreground/80 hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/voices" className="text-foreground/80 hover:text-primary transition-colors">
            Voices
          </Link>
          
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/login">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glassmorphism p-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-foreground/80 hover:text-primary transition-colors p-2" 
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/pricing" 
              className="text-foreground/80 hover:text-primary transition-colors p-2" 
              onClick={toggleMenu}
            >
              Pricing
            </Link>
            <Link 
              to="/voices" 
              className="text-foreground/80 hover:text-primary transition-colors p-2" 
              onClick={toggleMenu}
            >
              Voices
            </Link>
            
            {isLoggedIn ? (
              <Link to="/dashboard" onClick={toggleMenu}>
                <Button className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link to="/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/login" onClick={toggleMenu}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
