"use client";

import { useState } from "react";
import { Check, Star, Zap } from "lucide-react";
import { PREMIUM_PLANS } from "@/config/stripe";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

interface PremiumPlansProps {
  onClose: () => void;
}

export default function PremiumPlans({ onClose }: PremiumPlansProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string, stripePriceId: string) => {
    if (!user) {
      alert("Please log in to subscribe to a plan");
      return;
    }

    setLoading(planId);

    try {
      // Get the user's session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      const authToken = session?.access_token;

      if (!authToken) {
        throw new Error("No authentication token available");
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: stripePriceId,
          planId,
          userId: user.id,
          authToken,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await import("@stripe/stripe-js").then((m) =>
        m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      );

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe error:", error);
          alert("Payment failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Failed to create checkout session. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "basic":
        return <Star className="h-6 w-6 text-blue-500" />;
      case "pro":
        return <Zap className="h-6 w-6 text-purple-500" />;
      case "enterprise":
        return <Star className="h-6 w-6 text-yellow-500" />;
      default:
        return <Star className="h-6 w-6 text-gray-500" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case "basic":
        return "border-blue-200 bg-blue-50";
      case "pro":
        return "border-purple-200 bg-purple-50";
      case "enterprise":
        return "border-yellow-200 bg-yellow-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Choose Your Plan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <p className="text-gray-600 mb-8 text-center">
            Upgrade your storage and unlock premium features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREMIUM_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative border-2 rounded-xl p-6 ${getPlanColor(
                  plan.id
                )} hover:shadow-lg transition-all duration-300 ${
                  plan.id === "pro" ? "scale-105 border-purple-300" : ""
                }`}
              >
                {plan.id === "pro" && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {getPlanIcon(plan.id)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${plan.price}
                    <span className="text-lg font-normal text-gray-600">
                      /month
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.storage} Storage</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id, plan.stripePriceId)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.id === "pro"
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? "Processing..." : "Subscribe Now"}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              All plans include a 14-day free trial. Cancel anytime.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
