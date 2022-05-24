import { useEffect } from "react"

export default function DiscordList() {
    useEffect(() => {
        console.log(window.opener, window.opener.location);
        window.opener.location = "https://secret.leodev.xyz";
    }, []);
    return null;
}
