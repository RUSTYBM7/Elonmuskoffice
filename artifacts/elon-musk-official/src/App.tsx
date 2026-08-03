import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import HisFullLife from "@/pages/HisFullLife";
import Donate from "@/pages/Donate";
import Supporters from "@/pages/Supporters";
import Pay from "@/pages/Pay";
import PrivateGate from "@/pages/PrivateGate";
import CryptoPay from "@/pages/CryptoPay";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={HisFullLife} />
      <Route path="/donate" component={Donate} />
      <Route path="/supporters" component={Supporters} />
      <Route path="/pay" component={Pay} />
      <Route path="/crypto-endowment" component={PrivateGate} />
      <Route path="/admin-crypto" component={CryptoPay} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={100}>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
