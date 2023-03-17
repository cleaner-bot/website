import { useEffect, useState } from "react";

export default function Test() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [show, setShow] = useState(true);
    useEffect(() => {
        document.getElementById("removeme").remove();
        setShow(false);
    }, []);
    return (
        <>
            {show && <div id="removeme" />}
        </>
    )
}
