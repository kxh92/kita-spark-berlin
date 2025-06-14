
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        toast({
          title: "Willkommen zurück!",
          description: "Sie haben sich erfolgreich angemeldet.",
        });
        navigate('/');
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          throw error;
        }

        toast({
          title: "Registrierung erfolgreich!",
          description: "Bitte überprüfen Sie Ihre E-Mail, um Ihr Konto zu bestätigen.",
        });
      }
    } catch (error: any) {
      let errorMessage = "Ein Fehler ist aufgetreten.";
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Ungültige E-Mail oder Passwort.";
      } else if (error.message.includes("User already registered")) {
        errorMessage = "Ein Benutzer mit dieser E-Mail existiert bereits.";
      } else if (error.message.includes("Password should be at least 6 characters")) {
        errorMessage = "Das Passwort muss mindestens 6 Zeichen lang sein.";
      }

      toast({
        title: "Fehler",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="text-gray-800">Kita</span>
            <span className="text-primary">Finder</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Melden Sie sich in Ihrem Konto an' : 'Erstellen Sie Ihr neues Konto'}
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-white/20">
          <form className="space-y-6" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <Label htmlFor="fullName">Vollständiger Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required={!isLogin}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1"
                  placeholder="Ihr Name"
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="ihre@email.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                placeholder="Mindestens 6 Zeichen"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-white"
              disabled={loading}
            >
              {loading ? 'Wird bearbeitet...' : isLogin ? 'Anmelden' : 'Registrieren'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-primary hover:text-primary-600 text-sm font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? 'Noch kein Konto? Jetzt registrieren' 
                : 'Bereits ein Konto? Hier anmelden'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
