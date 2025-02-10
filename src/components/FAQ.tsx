
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const FAQ = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-primary text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                Can other people drive a car I rented?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Yes! Additional drivers are allowed on Karvo as long as they meet the approval requirements.</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>The primary renter (the person who books the car) can add extra drivers at no additional cost.</li>
                  <li>The added driver must have a valid driver's license and meet the age requirements for the rented car.</li>
                  <li>For faster approval, have the additional driver create a Karvo account and get approved before the trip. In the US and Canada, guests can also request to add a driver while the trip is in progress.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                How do I get discounts when booking a car?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Karvo offers exclusive discounts for weekly and monthly trips, helping you save when you book for longer periods.</p>
                <p className="mt-2 font-medium">Stay updated on deals & offers:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Enable email and push notifications in your Karvo app to receive promotions and discounts.</li>
                  <li>Earn rewards through Karvo's loyalty program—take trips totaling 10 days in a 90-day period and unlock a free rental day!</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                What payment methods does Karvo accept?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Karvo accepts most major credit and debit cards from financial institutions, including Visa, Mastercard, American Express, and Discover.</p>
                <p className="mt-2">📲Mobile payment options like Apple Pay and Google Pay are also accepted. However, Karvo does not accept cash, checks, or prepaid cards as payment methods.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                What is Karvo's cancellation policy?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>We get it—plans change! Karvo offers flexible cancellation options:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Cancel up to 24 hours before your trip for a full refund (unless you've chosen a non-refundable discount).</li>
                  <li>If your trip starts within 24 hours, you have one hour after booking to cancel for free.</li>
                  <li>If you cancel after the free period, a cancellation fee may apply.</li>
                  <li>In the rare case that a host cancels, Karvo will notify you immediately so you can rebook another car or request a refund.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                What are Karvo's cleaning and safety policies?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Under Karvo's enhanced cleaning policy, hosts must thoroughly disinfect their vehicles before every trip to ensure a clean and safe driving experience. Karvo also provides hosts with up-to-date cleaning guidelines to help prevent the spread of viruses and bacteria.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                Can I get my car delivered to me?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Yes! Many Karvo hosts offer delivery to airports, train stations, hotels, or custom locations for your convenience.</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Near major airports? Get your car delivered for easy pickup and drop-off.</li>
                  <li>Prefer a doorstep delivery? Some hosts offer free vehicle delivery, while others may charge a small fee.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                Can I drive unlimited miles during my trip?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Some Karvo hosts offer unlimited mileage, while others set a daily distance limit.</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>You can check the total miles or kilometers included in your trip under the "Distance Included" section on the vehicle page.</li>
                  <li>Want unlimited miles? Use the "Unlimited Distance" filter to find cars offering this option.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                Are there cars available near the airport?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>Absolutely! Many Karvo hosts provide vehicles at or near major airports.</p>
                <p className="mt-2">Arriving at the airport? Have your car delivered and ready for pickup at your terminal, hotel, or vacation rental for a seamless experience.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6 py-2">
              <AccordionTrigger className="text-lg font-medium text-gray-800 hover:text-accent">
                Is Karvo a rental car company?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                <p>No, Karvo is not a traditional rental car company. It's a peer-to-peer car-sharing marketplace, connecting travelers with local car owners in the Middle East</p>
                <p className="mt-2">Unlike corporate rental agencies, Karvo hosts set their own pricing, availability, and delivery options, giving you more flexibility, more variety, and a smoother experience.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
