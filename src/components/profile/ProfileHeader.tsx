
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ProfileHeaderProps {
  profile: any;
  isEditing: boolean;
  uploadingAvatar: boolean;
  onEdit: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader = ({
  profile,
  isEditing,
  uploadingAvatar,
  onEdit,
  onFileChange
}: ProfileHeaderProps) => {
  return (
    <>
      <div className="h-48 relative bg-sky-600 hover:bg-sky-500">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative group">
            <img 
              src={profile?.avatar_url || "/placeholder.svg"} 
              alt={profile?.full_name} 
              className="h-32 w-32 rounded-full border-4 border-white object-cover bg-white" 
            />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={onFileChange} 
                  disabled={uploadingAvatar}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {uploadingAvatar ? (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <span className="text-white text-sm font-medium">Change Photo</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-8 mt-20">
        <h1 className="text-3xl font-bold mb-2">{profile?.full_name}</h1>
        <p className="text-muted-foreground">
          {profile?.city && profile?.state ? `${profile.city}, ${profile.state} · ` : ''}
          Joined {new Date(profile?.created_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          })}
        </p>
        {!isEditing && (
          <Button variant="outline" onClick={onEdit} className="mt-4">
            Edit Profile
          </Button>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
