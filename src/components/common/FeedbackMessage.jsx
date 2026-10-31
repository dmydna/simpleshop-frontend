import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import FeedbackError from "@common/FeedbackError"
import { IconTint, IconTintyColor } from "./IconTintyColor";


export const FeedbackMessage = ({
                             icon = "bi-exclamation-circle",
                             title,
                             error,
                             actionLabel,
                             onAction,
                             children,
                             message,
                             variant="secondary",
                             listFix=false, // force center list fallbacks
                             showDetails = true,
                             config,
                         }) => {



    const {isAdmin} = useAuthContext()

    const detailedMessage = error?.message || error?.error || "Ocurrió un error desconocido.";
    const genericMessage = "Hubo un error al procesar la solicitud. Intente nuevamente.";
    
    const displayMessage = isAdmin ? detailedMessage : genericMessage;
    const hasDetails = isAdmin && detailedMessage !== genericMessage;

    return (
        <div style={{maxWidth: '600px'}} className={`d-block mx-3 mx-md-auto my-auto h-100`}>
            <div className={`row justify-content-center align-items-center flex-fill h-100 ${ listFix ? 'min-vh-md-70' : ''} `}>
                <div className="col-12 text-center">
                    <div className="mb-4">
                    {/* Icono sutil */}
                     {children?.icon ||

                   // <div className="mb-3 text-secondary" style={{ opacity: 0.3 }}>
                    //    <i className={`bi ${icon}`} style={{ fontSize: "3.5rem" }}></i> 
                    // </div> 
                    
                     <IconTint 
                        variant={variant} 
                        icon={icon} 
                        size={ config?.icon?.size || 80} 
                        fs={   config?.icon?.fs || 1 } />}   
                    </div>

                    {/* Texto refinado */}
                    <h3 className="fs-5 fw-light text-dark mb-2">{title}</h3>
                    <p 
                       className="text-muted small mx-auto mb-4" 
                       style={{ overflow: 'auto', maxWidth: '280px', lineHeight: '1.4' }}>
                        { error ? displayMessage.substr(0, 90) + "..." : message }
                    </p>
                   { error && hasDetails && showDetails && (
                       <FeedbackError 
                           detailedMessage={detailedMessage} 
                           error={error} 
                        />
                    )}
                    {/* Botón condicional (solo aparece si hay una acción) */}
                    {onAction && (
                        <button
                            className="btn btn-sm btn-light px-4 py-2 border-secondary-subtle fw-medium shadow-sm"
                            style={{ fontSize: '0.55rem', letterSpacing: '0.05rem', borderRadius: '20px' }}
                            onClick={onAction}
                        >
                            {actionLabel?.toUpperCase()}
                        </button>
                    )}
                </div>
            </div>
        </div>    
    );
};
