
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import BecomeHost from "./pages/BecomeHost";
import ListYourCar from "./pages/ListYourCar";
import ListYourCarVin from "./pages/ListYourCarVin";
import ListYourCarDetails from "./pages/ListYourCarDetails";
import ListYourCarOdometer from "./pages/ListYourCarOdometer";
import ListYourCarPhotos from "./pages/ListYourCarPhotos";
import CarHistory from "./pages/CarHistory";
import CarDetails from "./pages/CarDetails";
import Checkout from "./pages/Checkout";
import Trips from "./pages/Trips";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ListYourCarCongrats from "./pages/ListYourCarCongrats";

const queryClient = new QueryClient();

const MenuButton = () => {
  const location = useLocation();
  const hiddenPages = ['/login', '/signup'];
  const shouldHideButton = hiddenPages.includes(location.pathname);

  if (shouldHideButton) return null;

  return <MainMenu />;
};

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MenuButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route path="/become-host" element={<BecomeHost />} />
          <Route path="/list-your-car" element={<ListYourCar />} />
          <Route path="/list-your-car/vin/:carId" element={<ListYourCarVin />} />
          <Route path="/list-your-car/details/:carId" element={<ListYourCarDetails />} />
          <Route path="/list-your-car/odometer/:carId" element={<ListYourCarOdometer />} />
          <Route path="/list-your-car/photos/:carId" element={<ListYourCarPhotos />} />
          <Route path="/list-your-car/congrats/:carId" element={<ListYourCarCongrats />} />
          <Route path="/car-history/:carId" element={<CarHistory />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
