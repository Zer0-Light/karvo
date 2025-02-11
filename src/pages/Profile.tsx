
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AuthGuard } from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Mail, Phone, Calendar, Shield, AlertCircle } from "lucide-react";
import { format } from "date-fns";

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  is_approved_to_drive: boolean;
  join_date: string;
  email_verified: boolean;
  phone_verified: boolean;
};

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setEmail(session.user.email);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load profile data",
          });
          return;
        }

        setProfile(data);
      }
    };

    getProfile();
  }, [toast]);

  if (!profile) return null;

  return (
    <AuthGuard>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>{profile.full_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-semibold">{profile.full_name}</h1>
              <p className="text-muted-foreground">
                Joined {format(new Date(profile.join_date), 'MMMM yyyy')}
              </p>
            </div>
          </div>

          {/* Verification Status */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Account Status</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{email}</p>
                    <p className="text-sm text-muted-foreground">Email</p>
                  </div>
                  {profile.email_verified ? (
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{profile.phone_number || "Not provided"}</p>
                    <p className="text-sm text-muted-foreground">Phone number</p>
                  </div>
                  {profile.phone_verified ? (
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">
                      {profile.is_approved_to_drive ? "Approved to drive" : "Not approved to drive"}
                    </p>
                    <p className="text-sm text-muted-foreground">Driver status</p>
                  </div>
                  {profile.is_approved_to_drive ? (
                    <BadgeCheck className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">
                      {format(new Date(profile.join_date), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground">Member since</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Profile;
