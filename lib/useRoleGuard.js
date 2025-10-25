"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";

export function useRoleGuard(allowedRoles = ["anggota", "super_admin"]) {
  const [ready, setReady] = useState(false);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) { router.replace("/login"); return; }
      const snap = await getDoc(doc(db, "users", user.uid));
      const r = snap.exists() ? (snap.data().role || "anggota") : "anggota";
      setRole(r);
      if (!allowedRoles.includes(r)) {
        router.replace("/dashboard");
      } else {
        setReady(true);
      }
    });
    return () => unsub();
  }, [router, allowedRoles.join(",")]);

  return { ready, role };
}
