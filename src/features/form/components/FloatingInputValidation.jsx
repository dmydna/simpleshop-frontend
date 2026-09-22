import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
// O también:
// import { Form } from 'react-bootstrap';

// TODO: implementar InputValidation version Floating
// 1. modificar CSS para floating siempre que arriba
// 2. habilitar placeholder
export default function FloatingInputValidation({
  name,
  label,
  type = "text",
  placeholder,
  as,
  rows,
  watch,
  errors = {},
  register,
  isDisabled = false,
}) {
  return (
    <Form.Group className="mb-3">
      <FloatingLabel
        controlId={`floating-${name}`}
        label={label || name || ""}
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
          style={
            as === "textarea" ? { minHeight: "100px", resize: "vertical" } : {}
          }
          as={as || "input"}
          rows={rows || 8}
          // Si el campo tiene error, añadimos clase visual (opcional)
          isInvalid={!!errors[name]}
        />
        {/* Mensaje de error de Zod */}
        {errors[name] && (
          <div className="invalid-feedback d-block">{errors[name].message}</div>
        )}
      </FloatingLabel>
    </Form.Group>
  );
}
