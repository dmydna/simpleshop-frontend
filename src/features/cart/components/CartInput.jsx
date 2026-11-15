import { Button, Form, InputGroup } from "react-bootstrap"

export default function CartInput({
	delCart, decCart, incCart, quantity, disabled=false, onChange}){
	

	return(

        <div className="d-flex flex-fill gap-2">

          {/* Boton eliminar */}
          <Button
            disabled={disabled}
            variant="outline-dark"
            style={{ minWidth: '35px' }}
            className="btn btn-sm shadow-sm border rounded overflow-hidden pagination-input-group"
            onClick={delCart}
          ><i className="bi bi-trash3 smal pe-1"></i>
          </Button>

          <InputGroup size="xs" className="shadow-sm border rounded overflow-hidden pagination-input-group">

            {/* Boton + */}
            <Button
              disabled={disabled}
              className="btn p-1 border-0 ps-3 btn-sm"
              onClick={decCart}
              variant
            ><i className="bi bi-dash-lg"></i>
            </Button>

            {/* InputCart */}
            <Form.Control
              disabled={disabled}
              type="text"
              value={quantity}
              onChange={onChange || null}
              className="text-center border-0 fw-bold no-arrows"
              style={{ width: "30px", fontSize: "0.9rem", boxShadow: 'none' }}
            ></Form.Control>

            {/* Boton - */}
            <Button
              disabled={disabled}
              className="btn p-1 border-0 pe-3 btn-sm"
              onClick={incCart}
              variant
            ><i className="bi bi-plus-lg"></i>
            </Button>

          </InputGroup>

        </div>
	)
}