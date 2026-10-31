import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import { URL_DEV } from "@/utils/links";
import { FeedbackMessage } from "@common/FeedbackMessage.jsx";
import { useNavigate } from "react-router-dom";

function FallbackNotContent() {

    const { isAdmin } = useAuthContext()
    const navigate = useNavigate();
    const addContent = () => {
        navigate(URL_DEV)
    }
    const msg_user = 'This content isn’t available, try again later';
    const msg_admin = 'Add new content to start.'
    

    return (
        <>
            {isAdmin ? (
                <FeedbackMessage
                    title="Page is Empty"
                    message={msg_admin}
                    icon="bi-plus-square"
                    actionLabel="+ Add Content"
                    onAction={addContent}
                />) : (
                <FeedbackMessage
                    title="Page unavailable"
                    message={msg_user}
                    icon="bi-exclamation-circle"
                />)}
        </>


    )
}

export default FallbackNotContent;
