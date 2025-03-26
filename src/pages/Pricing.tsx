
import Navbar from '@/components/Navbar';
import PricingPlans from '@/components/PricingPlans';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>
          
          <PricingPlans />
          
          <div className="mt-16 max-w-3xl mx-auto glassmorphism rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Can I change my plan later?</h3>
                <p className="text-foreground/70">
                  Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes to your plan will be effective immediately.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">What happens if I use all my characters?</h3>
                <p className="text-foreground/70">
                  Once you've used all your allocated characters for the month, you can purchase additional credits or wait until your allocation resets at the beginning of your next billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Can I use the voices for commercial projects?</h3>
                <p className="text-foreground/70">
                  Yes, our Gold and Diamond plans include commercial usage rights. The Silver plan is for personal use only.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Do you offer custom voices?</h3>
                <p className="text-foreground/70">
                  We offer custom voice creation for enterprise customers. Please contact our sales team for more information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Is there a free trial?</h3>
                <p className="text-foreground/70">
                  Yes, all plans come with a 7-day free trial. You can cancel anytime during the trial period and you won't be charged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
