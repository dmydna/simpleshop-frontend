import { useUrlParams } from '@/hooks/useUrlParams';
import { useUrlState } from '@/hooks/useUrlState';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function OffCanvasSidebar({children, title, placement="end"}) {
  const [show, setShow] = useState(false);
  const {dialogParam} = useUrlParams()
  const {setSearchParams } = useUrlState()

  const handleClose = () => {
    setSearchParams(prev => ({...prev, dialog: null}))
    setShow(false)
  };
  const handleShow = () => setShow(true);

  useEffect(()=>{
    if(dialogParam == 'offCanvas'){
      setShow(true)
    }else{
      setShow(false)
    }
  },[dialogParam])

  return (
    <>
      <Offcanvas style={{maxWidth: "275px"}} placement={placement} show={show} onHide={handleClose}>
        <Offcanvas.Header className='p-3f border-bottom' closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {children}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

