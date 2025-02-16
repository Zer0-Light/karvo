
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormProps {
  formData: {
    full_name: string;
    phone_number: string;
    host_description: string;
    city: string;
    state: string;
  };
  isHost: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: string) => void;
  onCancel: () => void;
}

const ProfileForm = ({ formData, isHost, onSubmit, onChange, onCancel }: ProfileFormProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => onChange('full_name', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            value={formData.phone_number}
            onChange={(e) => onChange('phone_number', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => onChange('state', e.target.value)}
          />
        </div>

        {isHost && (
          <div>
            <Label htmlFor="host_description">About</Label>
            <Textarea
              id="host_description"
              value={formData.host_description}
              onChange={(e) => onChange('host_description', e.target.value)}
              rows={6}
            />
          </div>
        )}

        <div className="flex space-x-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
