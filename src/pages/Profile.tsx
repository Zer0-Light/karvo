
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import ProfileHeader from "@/components/profile/ProfileHeader";
import VerifiedInfo from "@/components/profile/VerifiedInfo";
import Reviews from "@/components/profile/Reviews";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileInfo from "@/components/profile/ProfileInfo";

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
    city: "",
    state: "",
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

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        phone_number: profile.phone_number || "",
        host_description: profile.host_description || "",
        city: profile.city || "",
        state: profile.state || "",
      });
    }
  }, [profile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploadingAvatar(true);
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

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

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
        <div className="fixed top-0 left-0 right-0 z-50">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-accent text-white py-3 text-center font-medium"
          >
            First-time riders get 15% off—your adventure starts for less! 🚗💨
          </motion.div>

          <nav className="bg-black text-white">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <img 
                src="/lovable-uploads/db93a284-c1ab-484e-be12-8a5acbe8e74b.png" 
                alt="KARVO" 
                className="h-8 w-auto cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
          </nav>
        </div>

        <div className="pt-32">
          <ProfileHeader
            profile={profile}
            isEditing={isEditing}
            uploadingAvatar={uploadingAvatar}
            onEdit={() => setIsEditing(true)}
            onFileChange={handleFileChange}
          />

          <main className="container mx-auto px-4 pt-8 pb-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-8">
                  <VerifiedInfo profile={profile} />
                  {reviews && <Reviews reviews={reviews} />}
                </div>

                <div className="md:col-span-2">
                  {isEditing ? (
                    <ProfileForm
                      formData={formData}
                      isHost={profile?.is_host}
                      onSubmit={handleSubmit}
                      onChange={handleFormChange}
                      onCancel={() => setIsEditing(false)}
                    />
                  ) : (
                    <ProfileInfo profile={profile} />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Profile;
