import { FeedbackMessage } from "@common/FeedbackMessage.jsx";

function FallbackError({handle, error, variant="light", fixes, className}){

    return (
        <div className={`m-auto h-100 ${className}`}>
        <FeedbackMessage
            title="Hubo un error"
            icon="bi-x-circle"
            actionLabel={handle ? "aceptar" : null}
            onAction={handle || null }
            error={error}
            variant={"danger"}
            listFix={fixes}
        />
        </div>
    )
}

export default FallbackError;