
import { Star, MapPin, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedKitasSection = () => {
  const kitas = [
    {
      id: 1,
      name: "Kita Sonnenzwerge",
      carrier: "Soziale Dienste Bürgermeister Reuter gGmbH",
      rating: 4.2,
      reviews: 15,
      address: "Kreuzberg",
      employees: 25,
      facilities: 8,
      payScale: "Angelehnt an TV-L",
      image: "👶",
      description: "Eine liebevolle Kita mit modernen pädagogischen Ansätzen"
    },
    {
      id: 2,
      name: "Kindergarten City",
      carrier: "Stadt Berlin",
      rating: 5.0,
      reviews: 32,
      address: "Mitte",
      employees: 1700,
      facilities: 58,
      payScale: "TV-L S",
      image: "🏫",
      description: "Große Kita-Einrichtung mit vielfältigen Angeboten"
    },
    {
      id: 3,
      name: "Kindergarten NordOst",
      carrier: "KiGaNO gGmbH",
      rating: 4.8,
      reviews: 28,
      address: "Pankow",
      employees: 2350,
      facilities: 80,
      payScale: "Vergütung nach TV-L Berlin",
      image: "🌟",
      description: "Innovative Bildungskonzepte in naturnaher Umgebung"
    },
    {
      id: 4,
      name: "Rubin e.V.",
      carrier: "Rubin Bildungswerk e.V.",
      rating: 4.5,
      reviews: 19,
      address: "Neukölln",
      employees: 45,
      facilities: 6,
      payScale: "Haustarif",
      image: "💎",
      description: "Familiäre Atmosphäre mit interkulturellem Schwerpunkt"
    },
    {
      id: 5,
      name: "Träger Evangelische Kirchengemeinde",
      carrier: "Petrus-Giessensdorf",
      rating: 4.3,
      reviews: 12,
      address: "Steglitz",
      employees: 30,
      facilities: 2,
      payScale: "TV-EKBO",
      image: "⛪",
      description: "Christlich geprägte Erziehung in ruhiger Lage"
    },
    {
      id: 6,
      name: "Kita Regenbogen",
      carrier: "Freier Träger Berlin e.V.",
      rating: 4.7,
      reviews: 24,
      address: "Charlottenburg",
      employees: 18,
      facilities: 1,
      payScale: "Angelehnt an TV-L",
      image: "🌈",
      description: "Kreative Förderung mit musikalischem Schwerpunkt"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-lg mb-4 block">
            Träger & Kita Infos auf einen Blick
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Entdecke über 2800+ Berliner Kitas & Träger
          </h2>
        </div>

        {/* Kita Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Alle Kitas", "Bewegungspädagogik", "Waldorf", "Situationsorientiert", "Pikler", "Montessori", "Bilingual"].map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              className={`rounded-full px-6 py-2 ${
                index === 0 
                  ? "bg-primary hover:bg-primary-600 text-white" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Kita Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {kitas.map((kita, index) => (
            <div 
              key={kita.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-2xl">
                  {kita.image}
                </div>
                <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  {kita.rating}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{kita.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{kita.carrier}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{kita.address}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span>{kita.employees} Mitarbeiter</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{kita.payScale}</span>
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-6">{kita.description}</p>

              <Button className="w-full bg-primary hover:bg-primary-600 text-white rounded-2xl">
                Kita-Profil ansehen
              </Button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-2xl"
          >
            Alle ansehen
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedKitasSection;
