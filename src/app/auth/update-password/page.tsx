import {changePassword} from "@/app/auth/update-password/actions";

const UpdatePassword = () => {

    async function handleSubmit (e) {
        await changePassword(e.target.value);
    }
    return (
        <div>
            <input type="text" onClick={(e) => handleSubmit(e)} />
        </div>
    )
}

export default UpdatePassword