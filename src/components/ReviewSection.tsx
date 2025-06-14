
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ReviewSectionProps {
  kitaId: string;
}

interface Review {
  id: string;
  rating: number;
  title?: string;
  content?: string;
  created_at: string;
  user_id: string;
}

const ReviewSection = ({ kitaId }: ReviewSectionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    content: ''
  });

  // Fetch reviews
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', kitaId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('kita_id', kitaId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Review[];
    }
  });

  // Check if user has already reviewed
  const { data: userReview } = useQuery({
    queryKey: ['userReview', kitaId, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('kita_id', kitaId)
        .eq('user_id', user.id)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!user
  });

  // Submit review
  const submitReview = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          kita_id: kitaId,
          user_id: user.id,
          rating: formData.rating,
          title: formData.title,
          content: formData.content
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', kitaId] });
      queryClient.invalidateQueries({ queryKey: ['userReview', kitaId, user?.id] });
      setShowForm(false);
      setFormData({ rating: 5, title: '', content: '' });
      toast({
        title: 'Bewertung eingereicht',
        description: 'Ihre Bewertung wurde erfolgreich gespeichert.'
      });
    },
    onError: () => {
      toast({
        title: 'Fehler',
        description: 'Bewertung konnte nicht gespeichert werden.',
        variant: 'destructive'
      });
    }
  });

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Bewertungen</CardTitle>
            {reviews && reviews.length > 0 && (
              <div className="flex items-center mt-2">
                {renderStars(Math.round(averageRating))}
                <span className="ml-2 text-sm text-gray-600">
                  {averageRating.toFixed(1)} von 5 ({reviews.length} Bewertungen)
                </span>
              </div>
            )}
          </div>
          {user && !userReview && (
            <Button onClick={() => setShowForm(!showForm)}>
              Bewertung schreiben
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Review Form */}
        {showForm && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label>Bewertung</Label>
                  <div className="mt-1">
                    {renderStars(formData.rating, true, (rating) => 
                      setFormData({ ...formData, rating })
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="title">Titel (optional)</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Kurzer Titel für Ihre Bewertung"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Bewertung</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Teilen Sie Ihre Erfahrungen mit dieser Kita..."
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => submitReview.mutate()}
                    disabled={submitReview.isPending}
                  >
                    Bewertung abgeben
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Abbrechen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User's existing review */}
        {userReview && (
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Ihre Bewertung</span>
                {renderStars(userReview.rating)}
              </div>
              {userReview.title && (
                <h4 className="font-medium mb-2">{userReview.title}</h4>
              )}
              {userReview.content && (
                <p className="text-gray-600">{userReview.content}</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        {isLoading ? (
          <div>Bewertungen werden geladen...</div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.filter(review => review.user_id !== user?.id).map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString('de-DE')}
                    </span>
                    {renderStars(review.rating)}
                  </div>
                  {review.title && (
                    <h4 className="font-medium mb-2">{review.title}</h4>
                  )}
                  {review.content && (
                    <p className="text-gray-600">{review.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Noch keine Bewertungen vorhanden. Seien Sie der Erste!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
