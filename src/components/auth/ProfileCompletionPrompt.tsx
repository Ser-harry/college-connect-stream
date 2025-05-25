
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthProvider';
import { X, User, Phone, MapPin } from 'lucide-react';

interface Profile {
  full_name: string | null;
  phone: string | null;
  region: string | null;
  community: string | null;
  cutoff_mark: number | null;
}

const ProfileCompletionPrompt = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showPrompt, setShowPrompt] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone: '',
    region: '',
    community: '',
    cutoff_mark: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkProfileCompleteness();
    }
  }, [user]);

  const checkProfileCompleteness = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (!data || !data.full_name || !data.phone || !data.region || !data.community) {
        setShowPrompt(true);
        if (data) {
          setProfile(data);
        }
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: profile.full_name,
          phone: profile.phone,
          region: profile.region,
          community: profile.community,
          cutoff_mark: profile.cutoff_mark,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been completed successfully!",
      });
      setShowPrompt(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!showPrompt || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User size={20} />
            Complete Your Profile
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPrompt(false)}
          >
            <X size={16} />
          </Button>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertDescription>
              Please complete your profile to get personalized college recommendations and apply to colleges.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="region">Region/District *</Label>
              <Input
                id="region"
                value={profile.region || ''}
                onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                placeholder="e.g., Chennai, Coimbatore"
                required
              />
            </div>

            <div>
              <Label htmlFor="community">Community *</Label>
              <Select
                value={profile.community || ''}
                onValueChange={(value) => setProfile({ ...profile, community: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your community" />
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
              <Label htmlFor="cutoff_mark">TNEA Cutoff Mark (Optional)</Label>
              <Input
                id="cutoff_mark"
                type="number"
                value={profile.cutoff_mark || ''}
                onChange={(e) => setProfile({ ...profile, cutoff_mark: e.target.value ? Number(e.target.value) : null })}
                placeholder="Enter your cutoff mark"
                min="0"
                max="200"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Complete Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCompletionPrompt;
