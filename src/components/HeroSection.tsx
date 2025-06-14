
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Users } from "lucide-react";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBezirk, setSelectedBezirk] = useState('');
  const navigate = useNavigate();

  const bezirke = [
    'Mitte', 'Friedrichshain-Kreuzberg', 'Pankow', 'Charlottenburg-Wilmersdorf',
    'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schöneberg', 'Neukölln',
    'Treptow-Köpenick', 'Marzahn-Hellersdorf', 'Lichtenberg', 'Reinickendorf'
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedBezirk) params.set('bezirk', selectedBezirk);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-primary-50 via-white to-primary-100 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        {/* Notification Banner */}
        <div className="bg-primary-100/50 backdrop-blur-sm border border-primary-200/30 rounded-2xl p-4 mb-12 text-center animate-fade-in">
          <p className="text-primary-800 font-medium">
            Hilf monatlich 30.000+ Eltern, indem du jetzt deine{" "}
            <span className="font-semibold underline cursor-pointer hover:text-primary-700">
              Kita-Erfahrung teilst
            </span>{" "}
            👶
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="mb-6">
              <span className="text-primary font-semibold text-lg">8000+ Kitas vergleichen, Platzangebote finden, Jobs finden</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Deine Plattform für{" "}
              <span className="text-primary">Kitasuche</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Kita-Plätze, Platzangebote & Kita-Vergleich. Finde alle Infos auf einen Blick und 100% kostenlos.
            </p>

            {/* Search Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20 mb-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Input
                    placeholder="Kita-Name oder Stichwort..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200/50 bg-white/50 h-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Search className="absolute left-3 top-3 h-6 w-6 text-gray-400" />
                </div>
                
                <Select value={selectedBezirk} onValueChange={setSelectedBezirk}>
                  <SelectTrigger className="border-gray-200/50 bg-white/50 h-12">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <SelectValue placeholder="Bezirk wählen" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {bezirke.map((bezirk) => (
                      <SelectItem key={bezirk} value={bezirk}>
                        {bezirk}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  className="bg-primary hover:bg-primary-600 text-white h-12 font-semibold"
                  onClick={handleSearch}
                >
                  Kitas vergleichen →
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-600 text-white font-semibold text-lg px-8 py-3 rounded-2xl"
                onClick={handleSearch}
              >
                Kitas vergleichen →
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-lg px-8 py-3 rounded-2xl"
                onClick={() => navigate('/search')}
              >
                Platzangebote erhalten →
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-200/50">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">4.8 von 5 Sternen</span>
                  </div>
                  <div className="text-gray-600">160+ Bewertungen</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Card */}
          <div className="animate-scale-in">
            <div className="relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl transform rotate-3"></div>
              
              {/* Main Card */}
              <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Offen für Platzangebote
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Kita Sonnenschein</h3>
                    <p className="text-gray-600">Pädagogin aus Berlin mit 5 Jahren Berufserfahrung</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span>10969 Berlin, Kreuzberg</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 mr-3 text-primary" />
                    <span>Berufserfahrung: 5 Jahre</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Kurzübersicht</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Bevorzugte Arbeitszeit</span>
                      <div className="font-medium">30 Stunden/Woche</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Verfügbar</span>
                      <div className="font-medium">Ab 01.10.24</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 rounded-2xl">
                  Kita-Profil ansehen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
