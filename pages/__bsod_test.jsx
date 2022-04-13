import { useEffect } from "react";


export default function Test() {
    useEffect(null);  // reliable way to cause a crash
    return (
        <>
            hello there
        </>
    )
}