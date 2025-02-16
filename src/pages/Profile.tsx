
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
        <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <img 
              src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
              alt="KARVO" 
              className="h-16 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </nav>

        <main className="container mx-auto px-4 pt-28 pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-end mb-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={profile?.avatar_url || "/placeholder.svg"}
                        alt={profile?.full_name}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploadingAvatar}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Click on the image to upload a new profile picture
                    </p>
                  </div>

                  <div className="space-y-4">
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
                        <Label htmlFor="host_description">Host Description</Label>
                        <Textarea
                          id="host_description"
                          value={formData.host_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, host_description: e.target.value }))}
                          rows={4}
                        />
                      </div>
                    )}

                    <Button type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={profile?.avatar_url || "/placeholder.svg"}
                      alt={profile?.full_name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div>
                      <h1 className="text-2xl font-bold">{profile?.full_name}</h1>
                      <p className="text-muted-foreground">
                        Member since {new Date(profile?.created_at).toLocaleDateString()}
                      </p>
                      {profile?.phone_number && (
                        <p className="text-muted-foreground mt-1">
                          Phone: {profile.phone_number}
                        </p>
                      )}
                    </div>
                  </div>

                  {profile?.is_host && (
                    <div className="border-t pt-6">
                      <h2 className="text-xl font-semibold mb-4">Host Information</h2>
                      <div className="space-y-4">
                        <p>
                          <span className="font-medium">Cars Listed:</span>{" "}
                          {profile?.total_cars_listed || 0}
                        </p>
                        <p>
                          <span className="font-medium">Host Since:</span>{" "}
                          {profile?.host_since ? new Date(profile.host_since).toLocaleDateString() : 'N/A'}
                        </p>
                        {profile?.host_description && (
                          <div>
                            <span className="font-medium">About:</span>
                            <p className="mt-2 text-muted-foreground">
                              {profile.host_description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Profile;
