
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRouter } from "next/router";


export default function Solve() {
    const router = useRouter();
    return (
        <>
            <HCaptcha
                sitekey="10613019-10d8-4d66-a2fb-e83e6e6c80b7"
                theme="dark"
                reCaptchaCompat={false}
                onVerify={(token, ekey) => {
                    const query = new URLSearchParams();
                    query.append("token", token);
                    query.append("key", ekey);
                    query.append("state", router.query.state);
                    router.push("/api/captcha/verify?" + query.toString());
                }}
            />
        </>
    )
}
