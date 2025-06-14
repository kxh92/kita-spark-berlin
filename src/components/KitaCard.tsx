
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Users, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Kita {
  id: string;
  name: string;
  description: string;
  address: string;
  bezirk: string;
  phone?: string;
  email?: string;
  capacity?: number;
  age_min?: number;
  age_max?: number;
  features?: string[];
  image_url?: string;
}

interface KitaCardProps {
  kita: Kita;
}

const KitaCard = ({ kita }: KitaCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if kita is favorited
  const { data: isFavorited } = useQuery({
    queryKey: ['favorite', kita.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('kita_id', kita.id)
        .single();
      return !!data;
    },
    enabled: !!user
  });

  // Toggle favorite
  const favoriteMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      
      if (isFavorited) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('kita_id', kita.id);
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, kita_id: kita.id });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorite', kita.id] });
      toast({
        title: isFavorited ? 'Aus Favoriten entfernt' : 'Zu Favoriten hinzugefügt',
        description: `${kita.name} wurde ${isFavorited ? 'entfernt' : 'hinzugefügt'}.`
      });
    },
    onError: () => {
      toast({
        title: 'Fehler',
        description: 'Bitte melden Sie sich an, um Favoriten zu verwalten.',
        variant: 'destructive'
      });
    }
  });

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3">
          <img
            src={kita.image_url || '/placeholder.svg'}
            alt={kita.name}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        {/* Content */}
        <CardContent className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                <Link 
                  to={`/kita/${kita.id}`}
                  className="hover:text-primary transition-colors"
                >
                  {kita.name}
                </Link>
              </h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {kita.address}
              </div>
              <Badge variant="secondary">{kita.bezirk}</Badge>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => favoriteMutation.mutate()}
              className={isFavorited ? 'text-red-500' : 'text-gray-400'}
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
            </Button>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {kita.description}
          </p>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {kita.capacity && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {kita.capacity} Plätze
              </div>
            )}
            {kita.age_min !== undefined && kita.age_max !== undefined && (
              <div>
                Alter: {kita.age_min}-{kita.age_max} Jahre
              </div>
            )}
            {kita.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {kita.phone}
              </div>
            )}
          </div>

          {/* Features */}
          {kita.features && kita.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {kita.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {kita.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{kita.features.length - 3} weitere
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link to={`/kita/${kita.id}`}>
                Details ansehen
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/apply/${kita.id}`}>
                Bewerben
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default KitaCard;
