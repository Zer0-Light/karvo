
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
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
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="relative">
              <div className="absolute inset-0 h-48 bg-gradient-to-r from-accent to-primary/10 rounded-lg opacity-50" />
              <div className="relative pt-16 px-6 pb-8">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                    <AvatarImage src={profile.avatar_url || undefined} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {profile.full_name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="mt-4 text-3xl font-bold">{profile.full_name}</h1>
                  <p className="text-muted-foreground">
                    Member since {format(new Date(profile.join_date), 'MMMM yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-6">Account Status</h2>
                <div className="grid gap-6">
                  {/* Email Status */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 transition-colors hover:bg-background">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{email}</p>
                      <p className="text-sm text-muted-foreground">Email</p>
                    </div>
                    {profile.email_verified ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <BadgeCheck className="h-5 w-5" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Unverified</span>
                      </div>
                    )}
                  </div>

                  {/* Phone Status */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 transition-colors hover:bg-background">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{profile.phone_number || "Not provided"}</p>
                      <p className="text-sm text-muted-foreground">Phone number</p>
                    </div>
                    {profile.phone_verified ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <BadgeCheck className="h-5 w-5" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Unverified</span>
                      </div>
                    )}
                  </div>

                  {/* Driver Status */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 transition-colors hover:bg-background">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {profile.is_approved_to_drive ? "Approved to drive" : "Not approved to drive"}
                      </p>
                      <p className="text-sm text-muted-foreground">Driver status</p>
                    </div>
                    {profile.is_approved_to_drive ? (
                      <div className="flex items-center gap-1 text-green-500">
                        <BadgeCheck className="h-5 w-5" />
                        <span className="text-sm font-medium">Approved</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <AlertCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Not approved</span>
                      </div>
                    )}
                  </div>

                  {/* Join Date */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 transition-colors hover:bg-background">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
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
      </div>
    </AuthGuard>
  );
};

export default Profile;
