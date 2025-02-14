
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const VehicleTypes = [
  { name: "Car rental", href: "#" },
  { name: "Classic car rental", href: "#" },
  { name: "Convertible car rental", href: "#" },
  { name: "Electric vehicle rental", href: "#" },
  { name: "Exotic & luxury car rental", href: "#" },
  { name: "Minivan rental", href: "#" },
  { name: "Sports car rental", href: "#" },
  { name: "SUV rental", href: "#" },
  { name: "Truck rental", href: "#" },
  { name: "Van rental", href: "#" },
];

const Makes = [
  { name: "Audi car rental", href: "#" },
  { name: "BMW car rental", href: "#" },
  { name: "Ferrari car rental", href: "#" },
  { name: "Jeep car rental", href: "#" },
  { name: "Lamborghini car rental", href: "#" },
  { name: "Mercedes-Benz car rental", href: "#" },
  { name: "Porsche car rental", href: "#" },
  { name: "Rolls-Royce car rental", href: "#" },
  { name: "Tesla car rental", href: "#" },
  { name: "Toyota car rental", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Insurance Notice */}
        <div className="text-sm text-gray-600 mb-12">
          <p className="mb-4">* Any personal insurance you may have that covers damage to the host's vehicle would kick in before your protection plan, except in limited situations for trips booked in Maryland, but this protects your own wallet. In the US, liability insurance is provided under a policy issued to Turo by Travelers Excess and Surplus Lines Company. Terms, conditions, and exclusions apply. The policy does not provide coverage for damage to a host's vehicle.</p>
          <p>
            For questions or information about the third party liability insurance for trips in the US, consumers in Maryland and the licensed states listed{" "}
            <a href="#" className="text-primary hover:underline">here</a>
            {" "}may contact Turo Insurance Agency at (415) 508-0283 or claims@turo.agency. For questions about how damage to a host's vehicle is handled, visit the{" "}
            <a href="#" className="text-primary hover:underline">Turo Support</a>
            {" "}site. When a trip is booked in the state of Washington, physical damage to the host's vehicle is covered by insurance purchased by Turo, but the Turo insurance does not change the contractual responsibilities of hosts or guests with respect to physical damage to a host's vehicle.
          </p>
        </div>

        {/* Vehicle Types and Makes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">Vehicle types</h3>
            <div className="grid grid-cols-2 gap-2">
              {VehicleTypes.map((type) => (
                <Link
                  key={type.name}
                  to={type.href}
                  className="text-gray-600 hover:text-primary text-sm"
                >
                  {type.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Makes</h3>
            <div className="grid grid-cols-2 gap-2">
              {Makes.map((make) => (
                <Link
                  key={make.name}
                  to={make.href}
                  className="text-gray-600 hover:text-primary text-sm"
                >
                  {make.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Karvo</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-gray-600 hover:text-primary">About</Link>
              <Link to="/team" className="block text-sm text-gray-600 hover:text-primary">Team</Link>
              <Link to="/policies" className="block text-sm text-gray-600 hover:text-primary">Policies</Link>
              <Link to="/careers" className="block text-sm text-gray-600 hover:text-primary">Careers</Link>
              <Link to="/press" className="block text-sm text-gray-600 hover:text-primary">Press</Link>
              <Link to="/shop" className="block text-sm text-gray-600 hover:text-primary">Karvo shop</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Locations</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">UAE (EN)</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Saudi Arabia (EN)</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Kuwait (EN)</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Qatar (EN)</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Bahrain (EN)</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Oman (EN)</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">How Karvo works</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Weddings</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Trust & safety</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Get help</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <div className="space-y-2">
              <Link to="/list-your-car" className="block text-sm text-gray-600 hover:text-primary">List your car</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Calculator</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">All-Star Hosts</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Host tools</Link>
              <Link to="#" className="block text-sm text-gray-600 hover:text-primary">Insurance & protection</Link>
            </div>
          </div>
        </div>

        {/* Social Links and App Store */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-primary">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-primary">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="block">
              <img 
                src="/lovable-uploads/4cf19ef8-3ca1-4596-9158-a67d065c9bac.png" 
                alt="Download on the App Store" 
                className="h-10"
              />
            </a>
            <a href="#" className="block">
              <img 
                src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" 
                alt="Get it on Google Play" 
                className="h-10"
              />
            </a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <span>©2024 Karvo</span>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/sitemap" className="hover:text-primary">Sitemap</Link>
            <button className="hover:text-primary">Cookie preferences</button>
            <Link to="/do-not-sell" className="hover:text-primary">Do not sell or share my personal information</Link>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center gap-2 hover:text-primary">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="US" className="h-4 w-6" />
              English
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
