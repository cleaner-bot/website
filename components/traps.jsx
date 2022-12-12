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
            <div
                id="recaptcha-anchor"
                onClick={() => (window.recaptchaLoadCallback = undefined)}
            />
            <div id="captcha-container">
                <div id="root">
                    <div
                        id="amzn-captcha-verify-button"
                        onClick={() => (window.awsLoadCallback = undefined)}
                    />
                </div>
            </div>
        </>
    );
}
