import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mails} from "lucide-react";


const AlertEmail = () => {
    return <Alert className="border-none w-[80%]">
        <Mails className="h-4 w-4" />
        <AlertTitle>Waiting For Email Confirmation
        </AlertTitle>

        <AlertDescription>
            Please confirm your email to proceed.
        </AlertDescription>
    </Alert>

}

export default AlertEmail