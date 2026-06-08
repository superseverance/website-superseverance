import { useState, useEffect } from "react";

export function useIntroSeen() {
    const [introSeen, setIntroSeenState] = useState<boolean | null>(null);
    //                                                              ^^^^
    // null = ancora non letto (evita hydration mismatch SSR/CSR)

    useEffect(() => {
        const seen = sessionStorage.getItem("intro_seen") === "true";
        setIntroSeenState(seen);
    }, []);

    const markIntroSeen = () => {
        sessionStorage.setItem("intro_seen", "true");
        setIntroSeenState(true);
    };

    return { introSeen, markIntroSeen };
}