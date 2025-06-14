
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, FileText, Star, MapPin, Calendar, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  // Fetch user's favorites
  const { data: favorites } = useQuery({
    queryKey: ['userFavorites', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          created_at,
          kitas (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch user's applications
  const { data: applications } = useQuery({
    queryKey: ['userApplications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          kitas (name, image_url, address, bezirk)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  // Fetch user's reviews
  const { data: reviews } = useQuery({
    queryKey: ['userReviews', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          kitas (name, image_url)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 text-center py-12">
          <p className="text-gray-600 mb-4">
            Sie müssen angemeldet sein, um Ihr Dashboard zu sehen.
          </p>
          <Button asChild>
            <Link to="/auth">Jetzt anmelden</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Ausstehend</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">Angenommen</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Abgelehnt</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mein Dashboard
            </h1>
            <p className="text-gray-600">
              Verwalten Sie Ihre Favoriten, Bewerbungen und Bewertungen
            </p>
          </div>

          <Tabs defaultValue="favorites" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Favoriten ({favorites?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Bewerbungen ({applications?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Bewertungen ({reviews?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-4">
              {favorites && favorites.length > 0 ? (
                favorites.map((favorite: any) => (
                  <Card key={favorite.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={favorite.kitas.image_url || '/placeholder.svg'}
                          alt={favorite.kitas.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            <Link 
                              to={`/kita/${favorite.kitas.id}`}
                              className="hover:text-primary"
                            >
                              {favorite.kitas.name}
                            </Link>
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {favorite.kitas.address}
                          </div>
                          <Badge variant="secondary" className="mt-1">
                            {favorite.kitas.bezirk}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild>
                            <Link to={`/kita/${favorite.kitas.id}`}>
                              Details
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link to={`/apply/${favorite.kitas.id}`}>
                              Bewerben
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Sie haben noch keine Favoriten gespeichert.
                    </p>
                    <Button asChild>
                      <Link to="/search">Kitas entdecken</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              {applications && applications.length > 0 ? (
                applications.map((application: any) => (
                  <Card key={application.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={application.kitas.image_url || '/placeholder.svg'}
                          alt={application.kitas.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">
                              {application.kitas.name}
                            </h3>
                            {getStatusBadge(application.status)}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {application.kitas.address}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Kind: {application.child_name}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              Gewünschter Start: {new Date(application.preferred_start_date).toLocaleDateString('de-DE')}
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Eingereicht am {new Date(application.created_at).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Sie haben noch keine Bewerbungen eingereicht.
                    </p>
                    <Button asChild>
                      <Link to="/search">Kitas finden</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((review: any) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.kitas.image_url || '/placeholder.svg'}
                          alt={review.kitas.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">
                              {review.kitas.name}
                            </h3>
                            {renderStars(review.rating)}
                          </div>
                          {review.title && (
                            <h4 className="font-medium mb-2">{review.title}</h4>
                          )}
                          {review.content && (
                            <p className="text-gray-600 mb-2">{review.content}</p>
                          )}
                          <p className="text-xs text-gray-500">
                            Bewertet am {new Date(review.created_at).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Sie haben noch keine Bewertungen geschrieben.
                    </p>
                    <Button asChild>
                      <Link to="/search">Kitas bewerten</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
