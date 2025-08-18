import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { priceId, planId, userId, authToken } = await request.json();

    if (!authToken) {
      return NextResponse.json(
        { error: "Authentication token required" },
        { status: 401 }
      );
    }

    // This should call your backend server to create the Stripe session
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          priceId,
          planId,
          userId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { sessionId } = await response.json();

    return NextResponse.json({ sessionId });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
