
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filters } from "@/utils/filterUtils";
import { streamOptions, locationOptions, collegeTypeOptions, examOptions } from "@/data/filterOptions";

interface CollegeFiltersProps {
  filters: Filters;
  priceRange: [number, number];
  placementRange: [number, number];
  toggleFilterItem: (filterType: keyof Filters, item: string) => void;
  handleRatingChange: (value: number) => void;
  setPriceRange: (range: [number, number]) => void;
  setPlacementRange: (range: [number, number]) => void;
  resetFilters: () => void;
}

const CollegeFilters = ({
  filters,
  priceRange,
  placementRange,
  toggleFilterItem,
  handleRatingChange,
  setPriceRange,
  setPlacementRange,
  resetFilters
}: CollegeFiltersProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Stream</h3>
          <div className="space-y-2">
            {streamOptions.map((stream) => (
              <div key={stream} className="flex items-center">
                <Checkbox
                  id={`stream-${stream}`}
                  checked={filters.streams.includes(stream)}
                  onCheckedChange={() => toggleFilterItem('streams', stream)}
                />
                <label htmlFor={`stream-${stream}`} className="ml-2 text-sm text-gray-700">
                  {stream}
                </label>
              </div>
            ))}
          </div>

          <h3 className="font-medium text-gray-900 mb-3 mt-6">College Type</h3>
          <div className="space-y-2">
            {collegeTypeOptions.map((type) => (
              <div key={type} className="flex items-center">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.collegeTypes.includes(type)}
                  onCheckedChange={() => toggleFilterItem('collegeTypes', type)}
                />
                <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">Location</h3>
          <div className="space-y-2">
            {locationOptions.map((location) => (
              <div key={location} className="flex items-center">
                <Checkbox
                  id={`location-${location}`}
                  checked={filters.locations.includes(location)}
                  onCheckedChange={() => toggleFilterItem('locations', location)}
                />
                <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                  {location}
                </label>
              </div>
            ))}
          </div>

          <h3 className="font-medium text-gray-900 mb-3 mt-6">Exams Accepted</h3>
          <div className="space-y-2">
            {examOptions.map((exam) => (
              <div key={exam} className="flex items-center">
                <Checkbox
                  id={`exam-${exam}`}
                  checked={filters.examsAccepted.includes(exam)}
                  onCheckedChange={() => toggleFilterItem('examsAccepted', exam)}
                />
                <label htmlFor={`exam-${exam}`} className="ml-2 text-sm text-gray-700">
                  {exam}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-3">
            Annual Fee Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </h3>
          <Slider
            value={priceRange}
            min={40000}
            max={60000}
            step={1000}
            onValueChange={setPriceRange as any}
            className="my-6"
          />

          <h3 className="font-medium text-gray-900 mb-3 mt-6">
            Placement Rate: {placementRange[0]}% - {placementRange[1]}%
          </h3>
          <Slider
            value={placementRange}
            min={80}
            max={100}
            step={1}
            onValueChange={setPlacementRange as any}
            className="my-6"
          />

          <h3 className="font-medium text-gray-900 mb-3 mt-6">
            Minimum Rating: {filters.minRating.toFixed(1)}+
          </h3>
          <Slider
            value={[filters.minRating]}
            min={0}
            max={5}
            step={0.1}
            onValueChange={([value]) => handleRatingChange(value)}
            className="my-6"
          />
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="outline" onClick={resetFilters}>
          Clear Filters
        </Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
};

export default CollegeFilters;
