
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Search, Filter } from 'lucide-react';
import { useColleges } from '@/hooks/useColleges';
import { useCutoffs } from '@/hooks/useCutoffs';

const TNEAPredictor = () => {
  const [cutoffMark, setCutoffMark] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [collegeSearch, setCollegeSearch] = useState<string>('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { data: colleges = [] } = useColleges();
  const { data: allCutoffs = [] } = useCutoffs();

  // Extract unique districts from college locations
  const districts = [...new Set(colleges
    .filter(college => college.location.includes('Tamil Nadu'))
    .map(college => college.location.split(',')[0].trim())
  )].sort();

  // Extract unique departments from cutoffs
  const departments = [...new Set(allCutoffs.map(cutoff => cutoff.branch))].sort();

  const predictColleges = () => {
    if (!cutoffMark || !category) return;

    const userMark = parseFloat(cutoffMark);
    
    // Filter Tamil Nadu colleges
    let tnColleges = colleges.filter(college => 
      college.location.includes('Tamil Nadu')
    );

    // Apply district filter
    if (district) {
      tnColleges = tnColleges.filter(college => 
        college.location.includes(district)
      );
    }

    // Apply college search filter
    if (collegeSearch) {
      tnColleges = tnColleges.filter(college =>
        college.name.toLowerCase().includes(collegeSearch.toLowerCase())
      );
    }

    const predictions = tnColleges.map(college => {
      let collegeCutoffs = allCutoffs.filter(cutoff => 
        cutoff.college_id === college.id && cutoff.category === category
      );

      // Apply department filter
      if (department) {
        collegeCutoffs = collegeCutoffs.filter(cutoff =>
          cutoff.branch.toLowerCase().includes(department.toLowerCase())
        );
      }

      if (collegeCutoffs.length === 0) return null;

      const lowestCutoff = Math.min(...collegeCutoffs.map(c => c.cutoff_mark));
      const highestCutoff = Math.max(...collegeCutoffs.map(c => c.cutoff_mark));
      
      let chance = 'Low';
      let chanceColor = 'destructive';
      
      if (userMark >= highestCutoff) {
        chance = 'High';
        chanceColor = 'default';
      } else if (userMark >= lowestCutoff) {
        chance = 'Medium';
        chanceColor = 'secondary';
      }

      return {
        college,
        cutoffs: collegeCutoffs,
        lowestCutoff,
        highestCutoff,
        chance,
        chanceColor,
        difference: userMark - lowestCutoff
      };
    }).filter(Boolean).sort((a, b) => b.difference - a.difference);

    setPredictions(predictions);
    setShowResults(true);
  };

  const clearFilters = () => {
    setDistrict('');
    setDepartment('');
    setCollegeSearch('');
    setCutoffMark('');
    setCategory('');
    setShowResults(false);
    setPredictions([]);
  };

  return (
    <div className="py-4 sm:py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">TNEA College Predictor</h1>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Predict your chances of getting admission to Tamil Nadu colleges based on your cutoff mark
          </p>
        </div>

        <Card className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
              Enter Your Details & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="cutoff" className="text-sm sm:text-base">TNEA Cutoff Mark *</Label>
                <Input
                  id="cutoff"
                  type="number"
                  placeholder="Enter your cutoff mark (0-200)"
                  value={cutoffMark}
                  onChange={(e) => setCutoffMark(e.target.value)}
                  min="0"
                  max="200"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="category" className="text-sm sm:text-base">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OC">OC (Open Community)</SelectItem>
                    <SelectItem value="BC">BC (Backward Class)</SelectItem>
                    <SelectItem value="MBC">MBC (Most Backward Class)</SelectItem>
                    <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                    <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district" className="text-sm sm:text-base">Preferred District</Label>
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select district (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Districts</SelectItem>
                    {districts.map((dist) => (
                      <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department" className="text-sm sm:text-base">Preferred Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select department (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {departments.slice(0, 20).map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="collegeSearch" className="text-sm sm:text-base">Search Specific College</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="collegeSearch"
                  type="text"
                  placeholder="Search by college name..."
                  value={collegeSearch}
                  onChange={(e) => setCollegeSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={predictColleges} 
                className="flex-1"
                disabled={!cutoffMark || !category}
                size="lg"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Predict My Colleges
              </Button>
              <Button 
                onClick={clearFilters} 
                variant="outline"
                size="lg"
                className="sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Prediction Results</h2>
              <div className="mt-2 sm:mt-0">
                <Badge variant="outline" className="text-sm">
                  {predictions.length} colleges found
                </Badge>
              </div>
            </div>
            
            {predictions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600 text-sm sm:text-base">
                    No predictions available for your selection criteria. Try adjusting your filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              predictions.map((prediction, index) => (
                <Card key={prediction.college.id} className="card-hover">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base sm:text-lg text-clamp-2">{prediction.college.name}</h3>
                        <p className="text-gray-600 text-sm text-clamp-1">{prediction.college.location}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{prediction.college.stream}</Badge>
                          <Badge variant="outline" className="text-xs">{prediction.college.college_type}</Badge>
                          <Badge variant="outline" className="text-xs">Rank #{index + 1}</Badge>
                        </div>
                      </div>
                      <Badge variant={prediction.chanceColor as any} className="self-start">
                        {prediction.chance} Chance
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600 text-xs sm:text-sm">Lowest Cutoff</span>
                        <div className="font-medium">{prediction.lowestCutoff}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs sm:text-sm">Highest Cutoff</span>
                        <div className="font-medium">{prediction.highestCutoff}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs sm:text-sm">Your Mark</span>
                        <div className="font-medium text-blue-600">{cutoffMark}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-xs sm:text-sm">Available Branches</span>
                        <div className="font-medium">{prediction.cutoffs.length}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Available Branches:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {prediction.cutoffs.slice(0, 6).map((cutoff, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {cutoff.branch} ({cutoff.cutoff_mark})
                          </Badge>
                        ))}
                        {prediction.cutoffs.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{prediction.cutoffs.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TNEAPredictor;
