
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import KitaCard from '@/components/KitaCard';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface SearchFiltersState {
  query: string;
  bezirk: string;
  ageMin: number;
  ageMax: number;
  features: string[];
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<SearchFiltersState>({
    query: searchParams.get('q') || '',
    bezirk: searchParams.get('bezirk') || '',
    ageMin: 0,
    ageMax: 6,
    features: []
  });

  const { data: kitas, isLoading, error } = useQuery({
    queryKey: ['kitas', filters],
    queryFn: async () => {
      let query = supabase.from('kitas').select('*');
      
      if (filters.query) {
        query = query.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
      }
      
      if (filters.bezirk) {
        query = query.eq('bezirk', filters.bezirk);
      }
      
      if (filters.ageMin > 0) {
        query = query.gte('age_max', filters.ageMin);
      }
      
      if (filters.ageMax < 6) {
        query = query.lte('age_min', filters.ageMax);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Kita-Suche
                </h1>
                {kitas && (
                  <p className="text-gray-600">
                    {kitas.length} Kitas gefunden
                  </p>
                )}
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">Fehler beim Laden der Kitas</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {kitas?.map((kita) => (
                    <KitaCard key={kita.id} kita={kita} />
                  ))}
                  {kitas?.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-600">Keine Kitas gefunden</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
