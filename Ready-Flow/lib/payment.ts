import { auth } from "@/lib/firebase";

export const initializePayment = async (onSuccess: () => void) => {
    const user = auth.currentUser;
    if (!user) {
        alert("Please login first!");
        return;
    }

    // 1. Create Order on Server
    const res = await fetch("/api/razorpay/order", { method: "POST" });
    const data = await res.json();

    if (!data.id) {
        alert("Server error. Are you online?");
        return;
    }

    // 2. Load Razorpay Script manually
    const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const resScript = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!resScript) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // 3. Open Razorpay Options
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: data.currency,
        name: "ReadyFlow Pro",
        description: "Unlock Premium Features",
        order_id: data.id,
        handler: async function (response: any) {
            // 4. Verify Payment on Server
            const verifyRes = await fetch("/api/razorpay/verify", {
                method: "POST",
                body: JSON.stringify({
                    orderCreationId: data.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                    userId: user.uid, // Send User ID to update DB
                }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.isPro) {
                alert("Payment Successful! Welcome to Pro.");
                onSuccess(); // Refresh UI
                window.location.reload(); // Reload to reflect changes
            } else {
                alert("Payment verification failed.");
            }
        },
        prefill: {
            name: user.displayName || "User",
            email: user.email || "user@example.com",
        },
        theme: {
            color: "#FF6B6B", // Your Orange Brand Color
        },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
};