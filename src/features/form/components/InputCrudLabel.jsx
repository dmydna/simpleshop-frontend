import CopyButton from "@/components/common/CopyButton";
import LockButton from "@/components/common/LockButton";
import { CRUD } from "@utils/enums.js";
import { FloatingLabel, Form } from "react-bootstrap";

// NOTA este componente es multi-contexto, 
// hay que mandar un crud-hook compatible.
function InputCrudLabel({ 
    name, 
    label, 
    type = "text", 
    placeholder, 
    as, 
    rows, 
    baseHook: crudHook 
}) {
    const {
        register,
        isFieldDisabled,
        handleEnableField,
        lockedFields,
        showEditButton,
        showCopyButton,
        watch,
        errors,
    } = crudHook;

    // Obtener el valor actual para el botón de copiar
    const currentValue = watch(name);
    const isDisabled = isFieldDisabled(name);

    return (
        <Form.Group className="w-100 position-relative">
            <Form.Label>{label}</Form.Label>
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

            {/* Botón Editar: Solo en modo UPDATE y si el campo NO está bloqueado */}
            {showEditButton && isDisabled && !lockedFields[name] && (
                <LockButton
                    style={{ top: 11, right: 3, opacity: '.7' }}
                    className="pointer position-absolute"
                    locked={false} // Visualmente desbloqueado porque el campo está habilitado
                    handle={() => handleEnableField(name)}
                    title="Editar campo"
                />
            )}

            {/* Botón Copiar: Solo en modo READ */}
            {showCopyButton && (
                <CopyButton
                    style={{ top: 10, right: 3, opacity: '.7' }}
                    className="pointer position-absolute"
                    showMessage={false}
                    value={currentValue}
                    title="Copiar valor"
                />
            )}
        </Form.Group>
    );
}

export default InputCrudLabel;
