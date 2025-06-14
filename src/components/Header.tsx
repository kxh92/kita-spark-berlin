
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Heart, FileText } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-gray-800">Kita</span>
            <span className="text-primary">Finder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/search" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Kita-Vergleich
            </a>
            <a href="/search" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Bezirke
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Für Träger
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Über uns
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-700 hover:text-primary"
                >
                  <Heart size={18} className="mr-1" />
                  Dashboard
                </Button>
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={18} />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleAuthClick}
                  className="text-gray-700 hover:text-primary"
                >
                  <LogOut size={18} className="mr-1" />
                  Abmelden
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-primary"
                  onClick={handleAuthClick}
                >
                  Login
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary-600 text-white"
                  onClick={handleAuthClick}
                >
                  Registrieren
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200/20">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="/search" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Kita-Vergleich
              </a>
              <a href="/search" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Bezirke
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Für Träger
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Über uns
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/20">
                {user ? (
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="text-gray-700 hover:text-primary justify-start"
                      onClick={() => navigate('/dashboard')}
                    >
                      <Heart size={18} className="mr-1" />
                      Dashboard
                    </Button>
                    <div className="flex items-center space-x-2 text-gray-700 text-sm px-3">
                      <User size={18} />
                      <span>{user.email}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-gray-700 hover:text-primary justify-start"
                      onClick={handleAuthClick}
                    >
                      <LogOut size={18} className="mr-1" />
                      Abmelden
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="text-gray-700 hover:text-primary justify-start"
                      onClick={handleAuthClick}
                    >
                      Login
                    </Button>
                    <Button 
                      className="bg-primary hover:bg-primary-600 text-white justify-start"
                      onClick={handleAuthClick}
                    >
                      Registrieren
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
