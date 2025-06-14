
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-2xl font-bold mb-4">
              <span className="text-gray-800">Kita</span>
              <span className="text-primary">Finder</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <span className="w-6 h-6 bg-red-500 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">
                  🇩🇪
                </span>
                <div>
                  <div className="font-semibold">Made in Germany</div>
                  <div className="text-sm text-gray-600">Sitz in Berlin</div>
                </div>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="w-6 h-6 bg-blue-600 rounded mr-3 flex items-center justify-center text-white text-xs">
                  🇪🇺
                </span>
                <div>
                  <div className="font-semibold">DSGVO-konform</div>
                  <div className="text-sm text-gray-600">In Europa gehostet</div>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ressourcen</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">KitaFinder-Magazin</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kita-Vergleich</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Einrichtungen</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">Login</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Für Träger</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Stellen veröffentlichen</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Platzangebote erstellen</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Datenschutzerklärung</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie-Einstellungen</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AGB's</a></li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t border-gray-200/50">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Häufig gestellte Fragen</h3>
          <div className="space-y-4">
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-primary transition-colors font-medium">
                Was kostet KitaFinder?
                <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-3 text-gray-600 pl-0">
                KitaFinder ist für Eltern komplett kostenlos. Wir finanzieren uns über Träger und Kitas, die ihre Einrichtungen auf unserer Plattform präsentieren.
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-primary transition-colors font-medium">
                Was unterscheidet KitaFinder von klassischen Kita-Portalen?
                <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-3 text-gray-600 pl-0">
                KitaFinder bietet nicht nur eine Suche, sondern auch detaillierte Vergleichsmöglichkeiten, echte Bewertungen von Eltern und direkte Kontaktmöglichkeiten zu den Kitas.
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer text-gray-700 hover:text-primary transition-colors font-medium">
                Welche Unterstützung und Beratung kann ich von KitaFinder erhalten?
                <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-3 text-gray-600 pl-0">
                Unser Support-Team hilft dir bei der Suche nach der passenden Kita und berät dich zu allen Fragen rund um die Kitaplatz-Suche in Berlin.
              </div>
            </details>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200/50 text-center text-gray-600">
          <p>© 2025 KitaFinder Berlin - Made in Berlin</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
