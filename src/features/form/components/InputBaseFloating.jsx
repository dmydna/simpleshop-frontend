import CopyButton from "@/components/common/CopyButton";
import LockButton from "@/components/common/LockButton";
import { FloatingLabel, Form } from "react-bootstrap";

// NOTA este componente es multi-contexto, 
// hay que mandar un crud-hook compatible.

function InputCrudFloating({ 
    name, 
    label, 
    type = "text", 
    placeholder, 
    as, 
    rows,
    watch,
    errors,
    register,
    isFieldDisabled
}) {

    // Obtener el valor actual para el botón de copiar
    const isDisabled = isFieldDisabled(name);

    return (
        <Form.Group className="w-100 position-relative">
            <FloatingLabel
                controlId={`floating-${name}`}
                label={label || name || ''}
                className="mb-3"
            >
                <Form.Control
                    type={type}
                    name={name}
                    placeholder={placeholder || `Ingrese ${name}`}
                    // React Hook Form maneja el valor y el onChange automáticamente
                    {...register(name)} 
                    disabled={isDisabled}
                    spellCheck="false"
                    style={as === "textarea" ? { minHeight: '100px', resize: 'vertical' } : {}}
                    as={as || "input"}
                    rows={rows || 8}
                    // Si el campo tiene error, añadimos clase visual (opcional)
                    isInvalid={!!errors[name]}
                />
                
                {/* Mensaje de error de Zod */}
                {errors[name] && (
                    <div className="invalid-feedback d-block">
                        {errors[name].message}
                    </div>
                )}
                
            </FloatingLabel>
        </Form.Group>
    );
}

export default InputCrudFloating;