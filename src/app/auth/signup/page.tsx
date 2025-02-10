import {checkEmailVerified} from "@/app/auth/signup/actions";
import SignupPage from "@/app/auth/signup/SignupWrapper";

const SignupWrapper = async () => {

    const emailVerified = await checkEmailVerified();

    return <SignupPage emailVerified={emailVerified} />
}

export default SignupWrapper