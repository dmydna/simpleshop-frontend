import { useUrlState } from "@/hooks/useUrlState";
import { createContext, useContext, useMemo } from "react";
import { Modal } from "react-bootstrap";



export const ModalParamContext = createContext(null)




export default function ModalParam({ className, children, param, inverse = false, size = "sm" }) {


    const { searchParams, setSearchParams } = useUrlState();

    // 1. Extraer Key y Valores Esperados en un solo paso
    const { key, expectedValues } = useMemo(() => {
        // console.log(param)
        if (!param) return { key: null, expectedValues: [] };

        const [k, rawValue] = param.split('=');
        
        // Normalizar el valor esperado a un array
        let values = [];
        if (Array.isArray(rawValue)) {
            values = rawValue;
        } else if (typeof rawValue === 'string') {
            // Soporta "val1,val2" o "val1"
            values = rawValue.split(',').map(v => v.trim()).filter(v => v !== '');
        } else if (rawValue !== undefined) {
            values = [rawValue];
        }

        return { key: k, expectedValues: values };
    }, [param]);

    // 2. Obtener valor actual de la URL
    const currentUrlValue = key ? searchParams[key] : null;
    let matches = false;
    
    if (expectedValues.length > 0) {
        matches = expectedValues.includes(currentUrlValue);
    } else if (key) {
        // Caso especial: param="dialog" (sin valor) -> mostrar si existe la clave
        matches = currentUrlValue !== null;
    }

    // Aplicar inversa si se requiere
    const show = inverse ? !matches : matches;

    // 4. Función de cierre
    const close = () => {
        setSearchParams(prev => {
            const next = { ...prev };
            next[key] = null
            return next;
        });
    };

    // Si no hay key válida, no mostramos nada (o podrías mostrar children siempre)
    if (!key) return null;

    return (
        <ModalParamContext.Provider value={close}>
            <Modal
                className={className}
                show={show}
                onHide={close}
                size={size}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className="p-0">
                    {typeof children == 'function' ? children(close) : children}
                </Modal.Body>
            </Modal>
        </ModalParamContext.Provider>
    );
}


export const ModalParamHeader = ({ children, x=false}) => {

    const close = useContext(ModalParamContext);

    return (
        <div className="d-flex align-items-center justify-content-between mb-4">
            <h1 className="fs-4 m-0">{children}</h1>
            <span className="d-flex justify-content-center align-items-center rounded-circle bg-hover fade-hover" 
                style={{ width: '40px', height: '40px' }}>
                
                {x && <i onClick={() => close()} 
                    className="h3 bi bi-x p-0 m-0"></i>
                }
            </span> 
        </div>
    )
}