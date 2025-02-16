
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, Star } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    host_description: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone_number: profile.phone_number || "",
        host_description: profile.host_description || "",
      });
    }
  }, [profile]);

  const { data: reviews } = useQuery({
    queryKey: ['renter-reviews', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID');
      
      const { data, error } = await supabase
        .from('renter_reviews')
        .select(`
          *,
          host:profiles!renter_reviews_host_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .eq('renter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploadingAvatar(true);
      
      // Upload the file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update the profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['profile', user.id] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <nav className="fixed top-0 left-0 right-0 bg-black text-white z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <img 
              src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
              alt="KARVO" 
              className="h-8 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </nav>

        <div className="h-48 bg-black relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <img
                src={profile?.avatar_url || "/placeholder.svg"}
                alt={profile?.full_name}
                className="h-32 w-32 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploadingAvatar}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{profile?.full_name}</h1>
              <p className="text-muted-foreground">
                {profile?.city}, {profile?.state} · Joined {new Date(profile?.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              {!isEditing && (
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="mt-4"
                >
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="font-semibold mb-4">VERIFIED INFO</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Approved to drive</span>
                      {profile?.is_approved_to_drive ? (
                        <Check className="text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">Pending</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email address</span>
                      <Check className="text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Phone number</span>
                      {profile?.phone_verified ? (
                        <Check className="text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">Unverified</span>
                      )}
                    </div>
                  </div>
                </div>

                {reviews && reviews.length > 0 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold mb-4">RATINGS & REVIEWS</h2>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-t pt-4">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.host.avatar_url || "/placeholder.svg"}
                              alt={review.host.full_name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{review.host.full_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                              <p className="mt-2">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                {isEditing ? (
                  <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="full_name">Full Name</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                          id="phone_number"
                          value={formData.phone_number}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                        />
                      </div>

                      {profile?.is_host && (
                        <div>
                          <Label htmlFor="host_description">About</Label>
                          <Textarea
                            id="host_description"
                            value={formData.host_description}
                            onChange={(e) => setFormData(prev => ({ ...prev, host_description: e.target.value }))}
                            rows={6}
                          />
                        </div>
                      )}

                      <div className="flex space-x-4">
                        <Button type="submit">Save Changes</Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold mb-4">ABOUT {profile?.full_name?.split(' ')[0]}</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {profile?.host_description || "No description provided yet."}
                    </p>

                    {profile?.is_host && (
                      <div className="mt-8 border-t pt-6">
                        <h2 className="font-semibold mb-4">HOST STATS</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-lg font-medium">{profile?.total_cars_listed || 0}</p>
                            <p className="text-sm text-muted-foreground">Cars Listed</p>
                          </div>
                          <div>
                            <p className="text-lg font-medium">
                              {profile?.host_since ? new Date(profile.host_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                            </p>
                            <p className="text-sm text-muted-foreground">Host Since</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Profile;
