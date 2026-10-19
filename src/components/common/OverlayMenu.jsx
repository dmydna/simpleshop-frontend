import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import { IconTint } from "@/components/common/FloatButtonCollection";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNavigate } from "react-router-dom";

export default function OverlayMenu() {
 
  const placement = 'left';
  const navigate = useNavigate()

  return (
    <>
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              ir a <strong>historial de compras</strong>.
            </Tooltip>
          }
        >
          <Button 
            variant="light"
            onClick={()=> navigate('/user/purchases')} 
            className="btn-sm"
          > 
            <i className="bi-three-dots"></i>
          </Button>
        </OverlayTrigger>
    </>
  );
}