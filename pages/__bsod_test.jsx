import { useEffect } from "react";

export default function Test() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(null); // reliable way to cause a crash
    return <>hello there</>;
}
