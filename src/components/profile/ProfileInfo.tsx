
interface ProfileInfoProps {
  profile: any;
}

const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  return (
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
  );
};

export default ProfileInfo;
