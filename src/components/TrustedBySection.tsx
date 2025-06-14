
const TrustedBySection = () => {
  const organizations = [
    { name: "Kita Trägerverband", logo: "🏛️" },
    { name: "Kita Sonnenblume", logo: "🌻" },
    { name: "Kleine Entdecker", logo: "🔍" },
    { name: "Regenbogen Kita", logo: "🌈" },
    { name: "Kinderland", logo: "🎨" },
    { name: "Montessori Berlin", logo: "📚" },
    { name: "Waldkita Spandau", logo: "🌲" },
    { name: "KitaVis", logo: "👁️" },
    { name: "Sprungbrett", logo: "🤸" },
    { name: "Little Giants", logo: "👶" },
    { name: "Kinderparadies", logo: "🎠" },
    { name: "Traumkita", logo: "💭" }
  ];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">
            Vertraut von hunderten Kitas und Trägern
          </h2>
          
          {/* Logo Grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-8 items-center opacity-60">
            {organizations.map((org, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-4 hover:opacity-80 transition-opacity"
              >
                <div className="text-2xl mb-2">{org.logo}</div>
                <div className="text-xs text-gray-600 text-center font-medium">
                  {org.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/20 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-2xl">⭐</span>
                ))}
              </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-800 mb-8 leading-relaxed">
              "Tolle Plattform, super unkompliziert und überschaubar. Erfüllt ihren Zweck voll und ganz. 
              Cooles Design."
            </blockquote>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold mr-4">
                K
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Karina Isaakjan</div>
                <div className="text-gray-600">Local Guide • vor einer Woche</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
