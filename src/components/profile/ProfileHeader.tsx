
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileHeaderProps {
  profile: any;
  isEditing: boolean;
  uploadingAvatar: boolean;
  onEdit: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader = ({ profile, isEditing, uploadingAvatar, onEdit, onFileChange }: ProfileHeaderProps) => {
  return (
    <>
      <div className="h-48 bg-black relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <img
              src={profile?.avatar_url || "/placeholder.svg"}
              alt={profile?.full_name}
              className="h-32 w-32 rounded-full border-4 border-white object-cover bg-white"
            />
            {isEditing && (
              <Input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                disabled={uploadingAvatar}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-8 mt-20">
        <h1 className="text-3xl font-bold mb-2">{profile?.full_name}</h1>
        <p className="text-muted-foreground">
          {profile?.city && profile?.state ? `${profile.city}, ${profile.state} · ` : ''}
          Joined {new Date(profile?.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </p>
        {!isEditing && (
          <Button 
            variant="outline"
            onClick={onEdit}
            className="mt-4"
          >
            Edit Profile
          </Button>
        )}
      </div>
    </>
  );
};

export default ProfileHeader;
