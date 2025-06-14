
-- Create Kitas table
CREATE TABLE public.kitas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  bezirk TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  capacity INTEGER,
  age_min INTEGER DEFAULT 0,
  age_max INTEGER DEFAULT 6,
  opening_hours JSONB,
  languages TEXT[],
  features TEXT[],
  image_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kita_id UUID REFERENCES public.kitas(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(kita_id, user_id)
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kita_id UUID REFERENCES public.kitas(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, kita_id)
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kita_id UUID REFERENCES public.kitas(id) ON DELETE CASCADE NOT NULL,
  child_name TEXT NOT NULL,
  child_birth_date DATE NOT NULL,
  preferred_start_date DATE NOT NULL,
  parent_name TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  parent_email TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.kitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Kitas policies (public read, admin write)
CREATE POLICY "Anyone can view kitas" 
  ON public.kitas 
  FOR SELECT 
  TO authenticated, anon
  USING (true);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" 
  ON public.reviews 
  FOR SELECT 
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can create reviews" 
  ON public.reviews 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
  ON public.reviews 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
  ON public.reviews 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" 
  ON public.favorites 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites" 
  ON public.favorites 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
  ON public.favorites 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Applications policies
CREATE POLICY "Users can view their own applications" 
  ON public.applications 
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
  ON public.applications 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON public.applications 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert some sample data
INSERT INTO public.kitas (name, description, address, bezirk, phone, email, capacity, age_min, age_max, features, image_url) VALUES
('Kita Sonnenschein', 'Eine liebevolle Kindertagesstätte mit viel Platz zum Spielen und Lernen. Wir bieten eine warme, familiäre Atmosphäre.', 'Musterstraße 123, 10969 Berlin', 'Friedrichshain-Kreuzberg', '+49 30 12345678', 'info@sonnenschein-kita.de', 45, 1, 6, ARRAY['Garten', 'Musikraum', 'Bewegungsraum', 'Bio-Küche'], 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'),
('Kita Regenbogen', 'Mehrsprachige Kita mit internationalem Konzept. Förderung von Kreativität und sozialen Kompetenzen.', 'Beispielweg 456, 10115 Berlin', 'Mitte', '+49 30 87654321', 'kontakt@regenbogen-kita.de', 60, 0, 6, ARRAY['Mehrsprachig', 'Kunstwerkstatt', 'Bibliothek', 'Küchenzeile'], 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500'),
('Kita Waldwichtel', 'Natur-Kita mit waldpädagogischem Schwerpunkt. Viel Zeit im Freien und nachhaltiges Lernen.', 'Grüne Allee 789, 14195 Berlin', 'Steglitz-Zehlendorf', '+49 30 11223344', 'hello@waldwichtel-kita.de', 30, 2, 6, ARRAY['Waldpädagogik', 'Naturspielplatz', 'Gemüsegarten', 'Werkstatt'], 'https://images.unsplash.com/photo-1602578558883-a40f8c22b3a0?w=500'),
('Kita Sterne', 'Moderne Kita mit digitalem Lernkonzept und individueller Förderung jedes Kindes.', 'Sternstraße 321, 12049 Berlin', 'Neukölln', '+49 30 99887766', 'info@sterne-kita.de', 50, 1, 6, ARRAY['Digitales Lernen', 'Schwimmbad', 'Forscherraum', 'Turnhalle'], 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500');
