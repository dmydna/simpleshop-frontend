import React, { useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function CouponModal({show, onHide}){


    const cuponValue = "#MISHA123"
    const [copy, setCopy] = useState(false);

    const handleCopy = (e) => {
      navigator.clipboard.writeText(cuponValue)
      setCopy(true);
      toast.success("copiado!");
    }

    useEffect(()=>{
      setCopy(!show)
    },[show])

    return(
        <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-3 align-items-center">
          <i className="bi bi-tags fs-4"></i>
          <Card.Text className="fs-4 py-3 fw-bold">
              Cupon
          </Card.Text>
          </div>
 
          <i onClick={() => onHide(false)} className="h3 bi bi-x m-0 fade-hover"></i> 
        </div>

        <div 
        style={{background: "var(--bs-gray-100);"}}
        className="d-flex justify-content-between alignt-items-center flex-wrap border rounded p-2">
          <Card.Text className="text-secondary m-0 p-0 fs-4">{cuponValue}</Card.Text>
          <i onClick={(e) => handleCopy(e)} className={`bi bi-${copy? 'check-lg' : 'copy'} px-2 my-1 hover-link`}></i>
        </div>
        </Modal.Body>
      </Modal>
    );
}

export default CouponModal;