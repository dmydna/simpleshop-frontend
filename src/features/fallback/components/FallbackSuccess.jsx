import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

function FallbackSuccess({handle}){

    const msg = 'Se guardaron los cambios';
    return (
            <FeedbackMessage
                title="Operacion exitosa"
                message={msg}
                variant="success"
                icon="bi-check-circle"
                actionLabel={handle ? "aceptar" : null}
                onAction={handle || null}
            />
    )
}

export default FallbackSuccess;