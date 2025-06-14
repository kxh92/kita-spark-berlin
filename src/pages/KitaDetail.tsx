
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import ReviewSection from '@/components/ReviewSection';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Globe, Users, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const KitaDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: kita, isLoading, error } = useQuery({
    queryKey: ['kita', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('kitas')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !kita) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 text-center py-12">
          <p className="text-red-600">Kita nicht gefunden</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/search">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Suche
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardContent className="p-0">
                  <img
                    src={kita.image_url || '/placeholder.svg'}
                    alt={kita.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {kita.name}
                        </h1>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-5 w-5 mr-2" />
                          {kita.address}
                        </div>
                        <Badge variant="secondary" className="text-sm">
                          {kita.bezirk}
                        </Badge>
                      </div>
                      <Button asChild>
                        <Link to={`/apply/${kita.id}`}>
                          Jetzt bewerben
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Über die Kita</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {kita.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              {kita.features && kita.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ausstattung & Besonderheiten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {kita.features.map((feature) => (
                        <Badge key={feature} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews */}
              <ReviewSection kitaId={kita.id} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Kontakt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {kita.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      <a href={`tel:${kita.phone}`} className="hover:text-primary">
                        {kita.phone}
                      </a>
                    </div>
                  )}
                  {kita.email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      <a href={`mailto:${kita.email}`} className="hover:text-primary">
                        {kita.email}
                      </a>
                    </div>
                  )}
                  {kita.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-3 text-gray-400" />
                      <a 
                        href={kita.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        Website besuchen
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Facts */}
              <Card>
                <CardHeader>
                  <CardTitle>Eckdaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {kita.capacity && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-3 text-gray-400" />
                        <span>Kapazität</span>
                      </div>
                      <span className="font-medium">{kita.capacity} Plätze</span>
                    </div>
                  )}
                  {kita.age_min !== undefined && kita.age_max !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-3 text-gray-400" />
                        <span>Altersgruppe</span>
                      </div>
                      <span className="font-medium">
                        {kita.age_min}-{kita.age_max} Jahre
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktionen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to={`/apply/${kita.id}`}>
                      Bewerbung einreichen
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Zu Favoriten hinzufügen
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitaDetail;
