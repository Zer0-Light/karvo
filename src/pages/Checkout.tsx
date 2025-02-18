
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, CreditCard, Gift, Shield, Ticket } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [totalDays, setTotalDays] = useState(0);
  const [protectionPlan, setProtectionPlan] = useState(false);
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const fromDate = searchParams.get('from') ? new Date(searchParams.get('from')!) : null;
  const toDate = searchParams.get('to') ? new Date(searchParams.get('to')!) : null;

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          host:host_id(
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (fromDate && toDate) {
      const days = Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
      setTotalDays(days);
    }
  }, [fromDate, toDate]);

  const tripTotal = car ? car.price_per_day * totalDays : 0;
  const protectionCost = protectionPlan ? 40 : 0; // Flat rate of 40 SAR
  const tripFee = tripTotal * 0.10; // 10% trip fee
  const tax = (tripTotal + tripFee + protectionCost) * 0.08; // 8% tax
  const grandTotal = tripTotal + tripFee + tax + protectionCost;

  if (isLoading || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="border-b">
                <h2 className="text-2xl font-semibold">Trip details</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex gap-4">
                  <img
                    src={car.photos?.[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{`${car.year} ${car.make} ${car.model}`}</h3>
                    <p className="text-muted-foreground">{car.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {fromDate && toDate
                      ? `${format(fromDate, 'MMM d')} - ${format(toDate, 'MMM d, yyyy')}`
                      : 'Dates not selected'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <h2 className="text-2xl font-semibold">Choose a protection plan</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div 
                  className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${
                    protectionPlan ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                  }`}
                  onClick={() => setProtectionPlan(!protectionPlan)}
                >
                  <Shield className={`h-5 w-5 mt-1 ${protectionPlan ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Premier plan</h3>
                      <Checkbox 
                        checked={protectionPlan}
                        onCheckedChange={(checked) => setProtectionPlan(checked as boolean)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Most popular choice. Lowest out-of-pocket cost if anything happens.
                    </p>
                    <p className="text-sm font-medium mt-2">SAR 40</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <h2 className="text-2xl font-semibold">Payment</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span>Credit or debit card</span>
                  </div>
                  <Button variant="ghost">Add</Button>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Gift className="h-5 w-5 text-muted-foreground" />
                  <span>Gift card</span>
                </div>
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Ticket className="h-5 w-5 text-muted-foreground" />
                  <span>Promo code</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="border-b">
                <h2 className="text-2xl font-semibold">Price details</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{`SAR ${car.price_per_day} × ${totalDays} days`}</span>
                    <span>SAR {tripTotal}</span>
                  </div>
                  {protectionPlan && (
                    <div className="flex justify-between">
                      <span>Protection plan</span>
                      <span>SAR {protectionCost}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Trip fee</span>
                    <span>SAR {tripFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>SAR {tax.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4 border-t pt-6">
                <div className="flex justify-between w-full font-semibold">
                  <span>Total</span>
                  <span>SAR {grandTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">
                  Confirm and pay
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  You won't be charged yet
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
