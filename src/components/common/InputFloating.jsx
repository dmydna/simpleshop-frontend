import { placeholder } from "@/utils/image";
import { FloatingLabel, Form } from "react-bootstrap";

export default function InputFloating({register, disabled=false, errors, name, type, label, className}) {
	
	return (   
		<Form.Group className={ className || 'mb-4 w-100' }>
			<FloatingLabel
				controlId={`floating-${name}`}
				label={label || name}
				className="mb-3"
			>
				<Form.Control
					type={type}
					name={name}
					placeholder={placeholder || `Ingrese ${name}`}
					{...register(name)} 
					isInvalid={!!errors[name]}
					disabled={disabled}
				/>
				{errors[name] && (
					<div className="invalid-feedback d-block">
						{errors[name].message}
					</div>)}
			</FloatingLabel>
		</Form.Group>
	)
}