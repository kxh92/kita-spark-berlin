
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-gray-800">Kita</span>
            <span className="text-primary">Finder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Kita-Vergleich
            </a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
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
            <Button variant="ghost" className="text-gray-700 hover:text-primary">
              Login
            </Button>
            <Button className="bg-primary hover:bg-primary-600 text-white">
              Registrieren
            </Button>
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
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Kita-Vergleich
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Bezirke
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Für Träger
              </a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors font-medium">
                Über uns
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/20">
                <Button variant="ghost" className="text-gray-700 hover:text-primary justify-start">
                  Login
                </Button>
                <Button className="bg-primary hover:bg-primary-600 text-white justify-start">
                  Registrieren
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
