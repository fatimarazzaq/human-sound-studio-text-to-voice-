
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pricingPlans } from '@/utils/audioUtils';
import { Plan } from '@/types';

interface PricingPlansProps {
  currentPlan?: string;
}

const PricingPlans = ({ currentPlan }: PricingPlansProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Select a plan that fits your needs. Upgrade or downgrade anytime.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan: Plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${plan.class} ${
              plan.recommended ? 'transform md:-translate-y-4' : ''
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-sm text-foreground/70 mt-1">{plan.description}</p>
              
              <div className="mt-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-foreground/70">/month</span>
              </div>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className={`w-full ${
                currentPlan === plan.id
                  ? 'bg-secondary text-foreground cursor-default'
                  : ''
              }`}
              variant={plan.recommended ? 'default' : 'outline'}
              disabled={currentPlan === plan.id}
            >
              {currentPlan === plan.id ? 'Current Plan' : 'Choose Plan'}
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center text-sm text-foreground/70">
        <p>All plans include a 7-day free trial. Cancel anytime.</p>
        <p className="mt-1">Need a custom plan? <a href="#" className="text-primary hover:underline">Contact us</a></p>
      </div>
    </div>
  );
};

export default PricingPlans;
