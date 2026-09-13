import { CRUD } from "@utils/enums.js";
import { Form, InputGroup } from "react-bootstrap";



function InputCrudTextarea({ name, label, type, placeholder, as, rows, useHookCrud }) {

    const { formData, handleChange, modalMode,
        isDisabledField, editableFields, handleEnableEdit } = useHookCrud()

    return (
        <Form.Group className="mb-3" controlId={`form-${name}`}>
            <div className="shadow-sm border rounded overflow-hidden">
                <div className="d-flex justify-content-between bg-light border-bottom text-muted">
                    <span className="fw-semibold px-3 py-2" style={{ fontSize: "0.95rem" }}>
                        {name}
                    </span>
                    {modalMode != CRUD.CREATE && (
                        <InputGroup.Text
                            className="fw-semibold border-0 text-muted px-3 py-2"
                            style={{
                                fontSize: "0.95rem",
                                cursor: editableFields[name] ? 'default' : 'pointer'
                            }}
                            onClick={() => handleEnableEdit(name)}>
                            <i className={`bi ${editableFields[name] ? 
                               "bi-check text-primary" : "bi-pencil"}`}
                                style={{ opacity: '.8' }}>
                            </i>
                        </InputGroup.Text>
                    )}
                </div>

                <Form.Control
                    spellCheck="false"
                    as="textarea"
                    rows={3}
                    placeholder={placeholder ||`Ingrese ${name}`}
                    name={name}
                    className="border-0 rounded-0" // Quitamos bordes y redondeado interno
                    value={formData?.[name] || ''}
                    onChange={handleChange}
                    disabled={isDisabledField(name)}
                    style={{ boxShadow: 'none' }} // Evita el brillo azul doble al hacer foco
                />
            </div>
        </Form.Group>
    )
}


export default InputCrudTextarea