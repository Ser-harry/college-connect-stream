
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp } from 'lucide-react';
import { useColleges } from '@/hooks/useColleges';
import { useCutoffs } from '@/hooks/useCutoffs';

const TNEAPredictor = () => {
  const [cutoffMark, setCutoffMark] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { data: colleges = [] } = useColleges();
  const { data: allCutoffs = [] } = useCutoffs();

  const predictColleges = () => {
    if (!cutoffMark || !category) return;

    const userMark = parseFloat(cutoffMark);
    
    // Filter Tamil Nadu colleges and get predictions
    const tnColleges = colleges.filter(college => 
      college.location.includes('Tamil Nadu')
    );

    const predictions = tnColleges.map(college => {
      const collegeCutoffs = allCutoffs.filter(cutoff => 
        cutoff.college_id === college.id && cutoff.category === category
      );

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

  return (
    <div className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TNEA College Predictor</h1>
          <p className="text-gray-600">
            Predict your chances of getting admission to Tamil Nadu colleges based on your cutoff mark
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Enter Your Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cutoff">TNEA Cutoff Mark</Label>
                <Input
                  id="cutoff"
                  type="number"
                  placeholder="Enter your cutoff mark (0-200)"
                  value={cutoffMark}
                  onChange={(e) => setCutoffMark(e.target.value)}
                  min="0"
                  max="200"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
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

              <Button 
                onClick={predictColleges} 
                className="w-full"
                disabled={!cutoffMark || !category}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Predict My Colleges
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prediction Results</h2>
            
            {predictions.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600">No predictions available for your category and mark.</p>
                </CardContent>
              </Card>
            ) : (
              predictions.map((prediction, index) => (
                <Card key={prediction.college.id} className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{prediction.college.name}</h3>
                        <p className="text-gray-600">{prediction.college.location}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{prediction.college.stream}</Badge>
                          <Badge variant="outline">{prediction.college.college_type}</Badge>
                        </div>
                      </div>
                      <Badge variant={prediction.chanceColor as any}>
                        {prediction.chance} Chance
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Lowest Cutoff</span>
                        <div className="font-medium">{prediction.lowestCutoff}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Highest Cutoff</span>
                        <div className="font-medium">{prediction.highestCutoff}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Your Mark</span>
                        <div className="font-medium">{cutoffMark}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Available Branches</span>
                        <div className="font-medium">{prediction.cutoffs.length}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Available Branches:</p>
                      <div className="flex flex-wrap gap-2">
                        {prediction.cutoffs.map((cutoff, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {cutoff.branch} ({cutoff.cutoff_mark})
                          </Badge>
                        ))}
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
