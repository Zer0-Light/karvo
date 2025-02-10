import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CarShowcase from "../components/CarShowcase";
import HowItWorks from "../components/HowItWorks";
import MainMenu from "../components/MainMenu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Promo Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-accent text-white py-3 text-center font-medium"
      >
        First-time riders get 15% off—your adventure starts for less! 🚗💨
      </motion.div>
      
      <MainMenu />
      <Hero />
      
      {/* Drive Terms Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-100 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-primary leading-tight"
              >
                Ditch the rental counter—drive on your terms.
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-600 mb-8">
                  Choose from a wide range of cars, wherever you need them.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-gray-600">
                      Convenient airport pickups in the UAE, Oman, Qatar, Kuwait
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-gray-600">
                      Skip the lines—book, find, and unlock your car with the app
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-gray-600">
                      24/7 support for a hassle-free experience
                    </span>
                  </li>
                </ul>
                
                <p className="text-xl font-semibold text-primary mt-8">
                  Your ride, your way.
                </p>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-1/2"
            >
              <img
                src="/lovable-uploads/3ae54749-b797-49c4-9011-645aac2c7885.png"
                alt="World map illustration showing global car rental locations"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <CarShowcase />
      <Features />
      
      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 text-primary"
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  Can other people drive a car I rented?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Yes! Additional drivers are allowed on Karvo as long as they meet the approval requirements.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>The primary renter (the person who books the car) can add extra drivers at no additional cost.</li>
                      <li>The added driver must have a valid driver's license and meet the age requirements for the rented car.</li>
                      <li>For faster approval, have the additional driver create a Karvo account and get approved before the trip. In the US and Canada, guests can also request to add a driver while the trip is in progress.</li>
                    </ul>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  How do I get discounts when booking a car?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Karvo offers exclusive discounts for weekly and monthly trips, helping you save when you book for longer periods.</p>
                    <p className="font-medium mt-4">Stay updated on deals & offers:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>Enable email and push notifications in your Karvo app to receive promotions and discounts.</li>
                      <li>Earn rewards through Karvo's loyalty program—take trips totaling 10 days in a 90-day period and unlock a free rental day!</li>
                    </ul>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  What payment methods does Karvo accept?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Karvo accepts most major credit and debit cards from financial institutions, including Visa, Mastercard, American Express, and Discover.</p>
                    <p className="mt-2">📲Mobile payment options like Apple Pay and Google Pay are also accepted. However, Karvo does not accept cash, checks, or prepaid cards as payment methods.</p>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  What is Karvo's cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>We get it—plans change! Karvo offers flexible cancellation options:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>Cancel up to 24 hours before your trip for a full refund (unless you've chosen a non-refundable discount).</li>
                      <li>If your trip starts within 24 hours, you have one hour after booking to cancel for free.</li>
                      <li>If you cancel after the free period, a cancellation fee may apply.</li>
                      <li>In the rare case that a host cancels, Karvo will notify you immediately so you can rebook another car or request a refund.</li>
                    </ul>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  What are Karvo's cleaning and safety policies?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    Under Karvo's enhanced cleaning policy, hosts must thoroughly disinfect their vehicles before every trip to ensure a clean and safe driving experience. Karvo also provides hosts with up-to-date cleaning guidelines to help prevent the spread of viruses and bacteria.
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  Can I get my car delivered to me?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Yes! Many Karvo hosts offer delivery to airports, train stations, hotels, or custom locations for your convenience.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>Near major airports? Get your car delivered for easy pickup and drop-off.</li>
                      <li>Prefer a doorstep delivery? Some hosts offer free vehicle delivery, while others may charge a small fee.</li>
                    </ul>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  Can I drive unlimited miles during my trip?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Some Karvo hosts offer unlimited mileage, while others set a daily distance limit.</p>
                    <ul className="list-disc pl-5 mt-2 space-y-2">
                      <li>You can check the total miles or kilometers included in your trip under the "Distance Included" section on the vehicle page.</li>
                      <li>Want unlimited miles? Use the "Unlimited Distance" filter to find cars offering this option.</li>
                    </ul>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  Are there cars available near the airport?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>Absolutely! Many Karvo hosts provide vehicles at or near major airports.</p>
                    <p className="mt-2">Arriving at the airport? Have your car delivered and ready for pickup at your terminal, hotel, or vacation rental for a seamless experience.</p>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="bg-white rounded-lg border border-gray-200">
                <AccordionTrigger className="px-6 hover:no-underline">
                  Is Karvo a rental car company?
                </AccordionTrigger>
                <AccordionContent className="px-6 text-gray-600">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>No, Karvo is not a traditional rental car company. It's a peer-to-peer car-sharing marketplace, connecting travelers with local car owners in the Middle East</p>
                    <p className="mt-2">Unlike corporate rental agencies, Karvo hosts set their own pricing, availability, and delivery options, giving you more flexibility, more variety, and a smoother experience.</p>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied users who have already discovered the future of car rental.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105">
            Download Karvo App
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;
