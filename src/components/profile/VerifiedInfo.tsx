
import { Check } from "lucide-react";

interface VerifiedInfoProps {
  profile: any;
}

const VerifiedInfo = ({ profile }: VerifiedInfoProps) => {
  return (
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
  );
};

export default VerifiedInfo;
