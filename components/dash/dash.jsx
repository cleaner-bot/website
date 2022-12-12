export function Header({ name, children }) {
    return (
        <>
            <h1 className="text-2xl font-bold">{name}</h1>
            {children && <div className="mt-2 text-gray-300">{children}</div>}
        </>
    );
}

export function Description({ children }) {
    return <div className="mt-6 text-gray-300">{children}</div>;
}

export function Section({ name, children }) {
    return (
        <>
            {name && <h2 className="mt-20 text-2xl font-medium">{name}</h2>}
            <div className="my-12 space-y-12">{children}</div>
        </>
    );
}
