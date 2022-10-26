import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Traps() {
    return (
        <>
            <NopechaTraps />
        </>
    );
}

function NopechaTraps() {
    const router = useRouter();
    useEffect(() => {
        const intervalId = setInterval(() => {
            for (const script of document.querySelectorAll(
                `script[src*=".hcaptcha.com/1/api.js"]`
            )) {
                if (script.src.includes("hl")) router.reload();
            }
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    return (
        <>
            <div className="recaptcha-checkbox" aria-checked={false} />
            <div id="recaptcha-anchor" onClick={() => router.reload()} />
        </>
    );
}
