import { db } from "./firebase"; 
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

// 1. Create User Profile if it doesn't exist (Called on Login)
export const createUserProfile = async (user: any) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "User",
      email: user.email,
      photoURL: user.photoURL,
      plan: "Free Starter",
      status: "Active",
      memberSince: serverTimestamp(),
      toolsUsedCount: 0,
      toolsUsage: {
        popupBuilder: 0,
        policyGenerator: 0,
        roiCalculator: 0,
        smartChatbot: 0
      }
    });
  }
};

// 2. Fail-Safe Track Tool Usage (Fixes "No document to update" error)
export const trackToolUsage = async (userId: string, toolKey: string) => {
  if (!userId) return;
  
  const userRef = doc(db, "users", userId);
  
  try {
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) {
      // If doc missing, create it using setDoc with merge
      await setDoc(userRef, {
        uid: userId,
        toolsUsedCount: 1,
        toolsUsage: { [toolKey]: 1 },
        memberSince: serverTimestamp(),
        plan: "Free Starter",
        status: "Active"
      }, { merge: true });
    } else {
      // If doc exists, update it normally
      await updateDoc(userRef, {
        toolsUsedCount: increment(1),
        [`toolsUsage.${toolKey}`]: increment(1),
        lastActive: serverTimestamp()
      });
    }
  } catch (error) {
    console.error("Error tracking usage:", error);
  }
};