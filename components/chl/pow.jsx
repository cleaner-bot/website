import { useEffect } from "react";

export default function ProofOfWork({
    difficulty,
    algorithm,
    prefix,
    onVerify,
}) {
    useEffect(() => {
        const worker = new Worker("/js/chl/pow.js");
        worker.onmessage = (message) => {
            onVerify(JSON.stringify(message.data));
        };
        worker.postMessage({
            difficulty,
            algorithm,
            prefix,
        });
        return () => worker.terminate();
    }, []);
    return null;
}
