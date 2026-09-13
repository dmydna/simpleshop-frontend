import { Modal } from "react-bootstrap";



function ModalCrud({show, onHide, children}) {

  return (
    <Modal
    show={show}
    onHide={onHide}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Body className="p-0">       
         {children}
      </Modal.Body>
    </Modal>
  );
}

export default ModalCrud;