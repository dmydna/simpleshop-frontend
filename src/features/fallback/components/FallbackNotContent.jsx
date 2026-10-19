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
    const msg_user = 'No hay elementos en esta sección. Estamos trabajando en eso.';
    const msg_admin = 'No hay elementos en esta sección. Agrega alguno para comenzar.'
    

    return (
        <>
            {isAdmin ? (
                <FeedbackMessage
                    title="Sin contenido"
                    message={msg_admin}
                    icon="bi-journal-plus"
                    actionLabel="+ Agregar Contenido"
                    onAction={addContent}
                />) : (
                <FeedbackMessage
                    title="Sin contenido"
                    message={msg_user}
                    icon="bi-journal-plus"
                />)}
        </>


    )
}

export default FallbackNotContent;
