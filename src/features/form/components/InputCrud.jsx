import InputCrudTextarea from "@/features/form/components/InputCrudTextarea.jsx";
import { CRUD } from "@utils/enums.js";
import { Form, InputGroup } from "react-bootstrap";


function InputCrud({ name, label, type, placeholder, as, rows, value ,useHookCrud }) {

    const { formData, handleChange, modalMode,
        isDisabledField, editableFields, handleEnableEdit } = useHookCrud()

    return (
        <>
        {as !== "textarea" ? (
        <Form.Group className="mb-3" controlId={`form-${name}`}>
            <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">
                <InputGroup.Text className="fw-semibold bg-light border-0 text-muted px-3" style={{ fontSize: "0.95rem" }}>
                    {name}
                </InputGroup.Text>
                <Form.Control
                    style={{ fontSize: "1rem", boxShadow: 'none', borderColor: '#ced4da' }}
                    className="border-0 no-arrows"
                    type={type || "text"}
                    name={name}
                    placeholder={placeholder || `Ingrese ${name}`}
                    value={value?.[name] || formData?.[name] || ""}
                    onChange={handleChange}
                    disabled={isDisabledField(name)}
                    spellCheck="false"
                />
                {modalMode != CRUD.CREATE && (
                    <InputGroup.Text
                        className="fw-semibold border-0 text-muted px-3"
                        style={{
                            fontSize: "0.95rem",
                            backgroundColor: 'rgb(233, 236, 239)',
                            cursor: editableFields[name] ? 'default' : 'pointer'
                        }}
                        onClick={() => handleEnableEdit(name)}
                    >
                        <i className={`bi ${editableFields[name] ? "bi-check text-primary" : "bi-pencil"}`}
                            style={{ opacity: '.8' }}>
                        </i>
                    </InputGroup.Text>
                )}
            </InputGroup>
        </Form.Group>
        ) : (<InputCrudTextarea 
                name={name}
                useHookCrud={useHookCrud}
             /> ) }
        </>
        

    )
}

export default InputCrud
