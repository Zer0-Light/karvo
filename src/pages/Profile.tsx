
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AuthGuard from "@/components/AuthGuard";
import Footer from "@/components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

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
                </div>
              </div>

              {profile?.is_host && (
                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold mb-4">Host Information</h2>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Cars Listed:</span>{" "}
                      {profile?.total_cars_listed || 0}
                    </p>
                    <p>
                      <span className="font-medium">Host Since:</span>{" "}
                      {profile?.host_since ? new Date(profile.host_since).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
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
