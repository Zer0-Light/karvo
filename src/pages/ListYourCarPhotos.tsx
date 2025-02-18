
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ListingProgress } from "@/components/ListingProgress";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Camera, Upload, X } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ListYourCarPhotos = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      // Preview URLs for selected photos
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
      setPhotos(prev => [...prev, ...files]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async () => {
    const uploadedUrls: string[] = [];

    for (const photo of photos) {
      const fileExt = photo.name.split('.').pop();
      const filePath = `${carId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('car-photos')
        .upload(filePath, photo);

      if (uploadError) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to upload photo. Please try again.",
        });
        return null;
      }

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('car-photos')
          .getPublicUrl(filePath);
        uploadedUrls.push(publicUrl);
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (photos.length === 0) {
      toast({
        variant: "destructive",
        title: "Photos required",
        description: "Please upload at least one photo of your car.",
      });
      return;
    }

    if (selectedDates.length === 0) {
      toast({
        variant: "destructive",
        title: "Availability required",
        description: "Please select at least one date when your car will be available.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const photoUrls = await uploadPhotos();
      
      if (!photoUrls) {
        setIsSubmitting(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('cars')
        .update({
          photos: photoUrls,
          available_dates: selectedDates.map(date => format(date, 'yyyy-MM-dd')),
        })
        .eq('id', carId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Your car photos and availability have been saved.",
      });

      navigate(`/cars/${carId}`);
    } catch (error) {
      console.error('Error saving car photos and availability:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save information. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="w-full px-4 py-6 flex justify-between items-center border-b">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            KARVO
          </h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Start over
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
            >
              Exit
            </Button>
          </div>
        </nav>

        <main className="container max-w-4xl mx-auto py-8 px-4 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ListingProgress 
              step={5} 
              totalSteps={11} 
              label="Photos & Availability" 
            />

            <h1 className="text-3xl font-bold text-center mb-8">
              Add Photos & Set Availability
            </h1>

            <div className="space-y-8">
              {/* Photo Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Car Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-video">
                        <img
                          src={url}
                          alt={`Car preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 10 && (
                      <label className="aspect-video flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <div className="text-center space-y-2">
                          <Camera className="mx-auto h-8 w-8 text-gray-400" />
                          <span className="text-sm text-gray-500">Add Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoSelect}
                            className="hidden"
                            multiple
                          />
                        </div>
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Upload up to 10 photos of your car. The first photo will be your main photo.
                  </p>
                </CardContent>
              </Card>

              {/* Availability Calendar */}
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <Calendar
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={setSelectedDates}
                      className="rounded-lg border shadow-sm bg-card p-4"
                      disabled={(date) => date < new Date()}
                    />
                    <p className="text-sm text-muted-foreground">
                      Select the dates when your car will be available for rent.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Saving..." : "Save and Continue"}
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default ListYourCarPhotos;
