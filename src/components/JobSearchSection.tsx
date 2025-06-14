
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const JobSearchSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <span className="text-primary font-semibold text-lg mb-4 block">
          #1 Platzsuche erhalten
        </span>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          Kitaplatz-Suche in einfach
        </h2>

        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Finde den perfekten Kitaplatz für dein Kind
              </h3>
              <p className="text-gray-600 mb-6">
                Nutze unsere intelligente Suchfunktion, um Kitas in deiner Nähe zu finden, 
                die zu deinen Bedürfnissen und Wünschen passen.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Über 2800+ Kitas in ganz Berlin
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Detaillierte Profile und Bewertungen
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  Direkte Kontaktmöglichkeiten
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center text-white text-6xl transform rotate-3 shadow-2xl">
                🔍
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl animate-bounce">
                ⭐
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200/50">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-2xl"
            >
              Jetzt Kitaplatz finden
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearchSection;
