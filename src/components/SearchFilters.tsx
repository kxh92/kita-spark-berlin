
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface SearchFiltersState {
  query: string;
  bezirk: string;
  ageMin: number;
  ageMax: number;
  features: string[];
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
}

const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const bezirke = [
    'Mitte', 'Friedrichshain-Kreuzberg', 'Pankow', 'Charlottenburg-Wilmersdorf',
    'Spandau', 'Steglitz-Zehlendorf', 'Tempelhof-Schöneberg', 'Neukölln',
    'Treptow-Köpenick', 'Marzahn-Hellersdorf', 'Lichtenberg', 'Reinickendorf'
  ];

  const availableFeatures = [
    'Garten', 'Musikraum', 'Bewegungsraum', 'Bio-Küche', 'Mehrsprachig',
    'Kunstwerkstatt', 'Bibliothek', 'Waldpädagogik', 'Naturspielplatz',
    'Gemüsegarten', 'Werkstatt', 'Digitales Lernen', 'Schwimmbad', 'Forscherraum', 'Turnhalle'
  ];

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    updateFilters({ features: newFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Search Query */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suchbegriff</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Kita-Name oder Stichwort..."
            value={filters.query}
            onChange={(e) => updateFilters({ query: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bezirk</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={filters.bezirk}
            onValueChange={(value) => updateFilters({ bezirk: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Bezirk wählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Alle Bezirke</SelectItem>
              {bezirke.map((bezirk) => (
                <SelectItem key={bezirk} value={bezirk}>
                  {bezirk}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Age Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alter des Kindes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Mindestalter: {filters.ageMin} Jahre</Label>
            <Slider
              value={[filters.ageMin]}
              onValueChange={([value]) => updateFilters({ ageMin: value })}
              min={0}
              max={6}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Höchstalter: {filters.ageMax} Jahre</Label>
            <Slider
              value={[filters.ageMax]}
              onValueChange={([value]) => updateFilters({ ageMax: value })}
              min={0}
              max={6}
              step={1}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ausstattung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {availableFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={() => toggleFeature(feature)}
                />
                <Label htmlFor={feature} className="text-sm">
                  {feature}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchFilters;
