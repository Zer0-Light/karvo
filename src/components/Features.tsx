
import { Shield, Clock, CreditCard } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Verified",
      description: "Every car and owner is thoroughly vetted for your safety and peace of mind.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Rentals",
      description: "Rent by the hour, day, or week. No long-term commitments required.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Transparent Pricing",
      description: "No hidden fees. Pay only for what you need, when you need it.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Karvo</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience car rental reimagined with our innovative peer-to-peer platform.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
