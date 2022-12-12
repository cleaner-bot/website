import { useEffect } from "react";

export default function LogoutComponent({ setUser, updateRoute }) {
    useEffect(() => {
        window.localStorage.removeItem("token");
        setUser(null);
        updateRoute({ guildId: "", component: "", other: [] });
    }, []);
    return (
        <div className="w-full px-4 mx-auto mt-20 sm:w-96">
            <h1 className="inline font-mono text-4xl">Logging you out…</h1>
            <p className="mt-2 text-gray-200">Bye! This may take a bit...</p>
        </div>
    );
}
