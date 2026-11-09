import { Modal } from "react-bootstrap";

import ContactForm from "@/features/contact/components/ContactForm.jsx";

function ContactModal({show, onHide}) {

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="p-0">
       <ContactForm className={'bg-white rounded p-5'} style={{maxWidth: 500}}>
         <div className="d-flex align-items-center justify-content-between mb-4">
           <h1 className="h3 m-0">Contacto</h1>
           <i onClick={() => onHide(false)} className="h3 bi bi-x m-0 fade-hover"></i> 
         </div>
       </ContactForm>
      </Modal.Body>
    </Modal>
  );
}

export default ContactModal;