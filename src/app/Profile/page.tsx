'use client'

import { Profile } from "@/components/profile/profile";
import { useAppSelectorType } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const router = useRouter();

    const logState = useAppSelectorType((state) => state.auth.logState)

    useEffect(() => {
        if (!logState) {
            router.push('/Login');
        }
    }, [logState, router]);

    if (!logState) {
        return null; 
    }

    return (
        <div>
            <Profile/>
        </div>
    );
}