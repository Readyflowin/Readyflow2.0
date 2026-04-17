import { NextResponse } from "next/server";
import crypto from "crypto";
import { adminDb } from "@/lib/firebaseAdmin"; 
import { FieldValue } from "firebase-admin/firestore"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderCreationId, razorpayPaymentId, razorpaySignature, userId } = body;

    // 1. Verify Signature
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid Transaction" }, { status: 400 });
    }

    // 2. Calculate Expiry Date (28 Days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 28);

    // 3. Update Database (Using .set with merge: true is safer than .update)
    console.log(`Payment Verified. Upgrading User: ${userId} until ${expiryDate}`);
    
    await adminDb.collection("users").doc(userId).set({
        plan: "Premium",
        planAmount: 29,
        paymentId: razorpayPaymentId,
        orderId: orderCreationId,
        updatedAt: FieldValue.serverTimestamp(),
        premiumUntil: expiryDate.toISOString(), 
        status: "Active"
    }, { merge: true });

    return NextResponse.json({ message: "Success", isPro: true });

  } catch (error: any) {
    console.error("VERIFY ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}