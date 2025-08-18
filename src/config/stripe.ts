import { loadStripe } from "@stripe/stripe-js";

// Replace with your actual Stripe publishable key
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export const PREMIUM_PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    price: 9.99,
    storage: "100 GB",
    features: [
      "100 GB Storage",
      "Basic Support",
      "File Sharing",
      "Version History",
    ],
    stripePriceId: "price_basic_monthly", // Replace with actual Stripe price ID
  },
  {
    id: "pro",
    name: "Pro Plan",
    price: 19.99,
    storage: "1 TB",
    features: [
      "1 TB Storage",
      "Priority Support",
      "Advanced Sharing",
      "Full Version History",
      "Real-time Collaboration",
    ],
    stripePriceId: "price_pro_monthly", // Replace with actual Stripe price ID
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    price: 49.99,
    storage: "5 TB",
    features: [
      "5 TB Storage",
      "24/7 Support",
      "Advanced Security",
      "Team Management",
      "Real-time Collaboration",
      "Custom Integrations",
    ],
    stripePriceId: "price_enterprise_monthly", // Replace with actual Stripe price ID
  },
];
