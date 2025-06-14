
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Apply = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    childName: '',
    childBirthDate: '',
    preferredStartDate: '',
    parentName: '',
    parentPhone: '',
    parentEmail: user?.email || '',
    message: ''
  });

  // Fetch kita details
  const { data: kita, isLoading } = useQuery({
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

  // Submit application
  const submitApplication = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          kita_id: id!,
          child_name: formData.childName,
          child_birth_date: formData.childBirthDate,
          preferred_start_date: formData.preferredStartDate,
          parent_name: formData.parentName,
          parent_phone: formData.parentPhone,
          parent_email: formData.parentEmail,
          message: formData.message
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: 'Bewerbung eingereicht',
        description: 'Ihre Bewerbung wurde erfolgreich eingereicht.'
      });
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast({
        title: 'Fehler',
        description: error.message || 'Bewerbung konnte nicht eingereicht werden.',
        variant: 'destructive'
      });
    }
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 text-center py-12">
          <p className="text-gray-600 mb-4">
            Sie müssen angemeldet sein, um sich zu bewerben.
          </p>
          <Button asChild>
            <Link to="/auth">Jetzt anmelden</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication.mutate();
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to={`/kita/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Kita
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Bewerbung für {kita?.name || 'Kita'}
              </CardTitle>
              <p className="text-gray-600">
                Füllen Sie das folgende Formular aus, um sich für einen Platz zu bewerben.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Child Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Angaben zum Kind</h3>
                  
                  <div>
                    <Label htmlFor="childName">Name des Kindes *</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => updateFormData('childName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="childBirthDate">Geburtsdatum des Kindes *</Label>
                    <Input
                      id="childBirthDate"
                      type="date"
                      value={formData.childBirthDate}
                      onChange={(e) => updateFormData('childBirthDate', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredStartDate">Gewünschter Betreuungsbeginn *</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={formData.preferredStartDate}
                      onChange={(e) => updateFormData('preferredStartDate', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Parent Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Kontaktdaten</h3>
                  
                  <div>
                    <Label htmlFor="parentName">Name des Erziehungsberechtigten *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => updateFormData('parentName', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="parentPhone">Telefonnummer *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => updateFormData('parentPhone', e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="parentEmail">E-Mail-Adresse *</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => updateFormData('parentEmail', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <Label htmlFor="message">Zusätzliche Nachricht (optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Weitere Informationen, besondere Bedürfnisse des Kindes, etc."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={submitApplication.isPending}
                  >
                    {submitApplication.isPending ? 'Wird eingereicht...' : 'Bewerbung einreichen'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link to={`/kita/${id}`}>Abbrechen</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Apply;
