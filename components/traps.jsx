
export default function Traps() {
    return (
        <>
            <NopechaTraps />
        </>
    );
}

function NopechaTraps() {
    return (
        <>
            <div className="recaptcha-checkbox" aria-checked={false} />
            <div id="recaptcha-anchor" onClick={() => window.recaptchaLoadCallback = undefined} />
        </>
    );
}
