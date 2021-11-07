
import { useState, useEffect } from "react";


export default function isDev() {
    const [isDev, setDev] = useState(false);
    useEffect(() => {
        setDev(localStorage.getItem("dev") === "true")
    }, []);
    return isDev;
}
