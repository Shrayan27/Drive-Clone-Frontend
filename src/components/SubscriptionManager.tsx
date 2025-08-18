"use client";

import { useState, useEffect } from "react";
import {
  Crown,
  CreditCard,
  Calendar,
  HardDrive,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SubscriptionData {
  plan: string;
  status: string;
  storageLimit: number;
  subscriptionId: string | null;
}

export default function SubscriptionManager() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [reactivating, setReactivating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const authToken = await user.getIdToken();
      const response = await fetch(`/api/stripe/subscription/${user.uid}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      console.error("Failed to fetch subscription status:", err);
      setError("Failed to load subscription information");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!user || !subscription?.subscriptionId) return;

    if (
      !confirm(
        "Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period."
      )
    ) {
      return;
    }

    try {
      setCanceling(true);
      const authToken = await user.getIdToken();

      const response = await fetch(
        `/api/stripe/subscription/${user.uid}/cancel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            subscriptionId: subscription.subscriptionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh subscription status
      await fetchSubscriptionStatus();
      alert(
        "Subscription will be canceled at the end of the current billing period."
      );
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
      alert("Failed to cancel subscription. Please try again.");
    } finally {
      setCanceling(false);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!user || !subscription?.subscriptionId) return;

    try {
      setReactivating(true);
      const authToken = await user.getIdToken();

      const response = await fetch(
        `/api/stripe/subscription/${user.uid}/reactivate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            subscriptionId: subscription.subscriptionId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh subscription status
      await fetchSubscriptionStatus();
      alert("Subscription reactivated successfully!");
    } catch (err) {
      console.error("Failed to reactivate subscription:", err);
      alert("Failed to reactivate subscription. Please try again.");
    } finally {
      setReactivating(false);
    }
  };

  const formatStorage = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1024) {
      return `${(gb / 1024).toFixed(1)} TB`;
    }
    return `${gb.toFixed(1)} GB`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "canceled":
        return "text-red-600 bg-red-100";
      case "past_due":
        return "text-yellow-600 bg-yellow-100";
      case "unpaid":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case "basic":
        return <Crown className="h-5 w-5 text-blue-500" />;
      case "pro":
        return <Crown className="h-5 w-5 text-purple-500" />;
      case "enterprise":
        return <Crown className="h-5 w-5 text-yellow-500" />;
      default:
        return <Crown className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center text-red-600 mb-4">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="font-medium">Error</span>
        </div>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchSubscriptionStatus}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center">
          <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Subscription
          </h3>
          <p className="text-gray-600 mb-4">
            You're currently on the free plan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          {getPlanIcon(subscription.plan)}
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">
              {subscription.plan === "free"
                ? "Free Plan"
                : `${
                    subscription.plan.charAt(0).toUpperCase() +
                    subscription.plan.slice(1)
                  } Plan`}
            </h3>
            <p className="text-sm text-gray-500">Current subscription</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            subscription.status
          )}`}
        >
          {subscription.status.charAt(0).toUpperCase() +
            subscription.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <HardDrive className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Storage Limit</p>
            <p className="font-medium text-gray-900">
              {formatStorage(subscription.storageLimit)}
            </p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <CreditCard className="h-5 w-5 text-green-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Billing Status</p>
            <p className="font-medium text-gray-900">{subscription.status}</p>
          </div>
        </div>

        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <Calendar className="h-5 w-5 text-purple-500 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Plan Type</p>
            <p className="font-medium text-gray-900">
              {subscription.plan === "free" ? "Free" : "Premium"}
            </p>
          </div>
        </div>
      </div>

      {subscription.plan !== "free" && subscription.subscriptionId && (
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Subscription ID: {subscription.subscriptionId.slice(-8)}
              </p>
            </div>
            <div className="flex space-x-3">
              {subscription.status === "canceled" ? (
                <button
                  onClick={handleReactivateSubscription}
                  disabled={reactivating}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {reactivating ? "Reactivating..." : "Reactivate"}
                </button>
              ) : (
                <button
                  onClick={handleCancelSubscription}
                  disabled={canceling}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {canceling ? "Canceling..." : "Cancel Subscription"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

