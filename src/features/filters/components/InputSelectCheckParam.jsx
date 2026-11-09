import { useEffect, useState, useMemo } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useListing } from "@features/listing/hooks/useListing";
import { useSearchParams, useNavigate } from 'react-router-dom';

export function formatCase(str) {
  if(str.toUpperCase() === str){
    return str;
  }
  return str.replace(/([A-Z])/g, ' $1').trim().toLowerCase();
}


function InputSelectCheckParam({ name, array = [] , className, style, variant = "light" }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTag, setSelectedTag] = useState(null);

  // 1. Sincronizar estado inicial con la URL
  useEffect(() => {
    const tagsParam = searchParams.get(name);
    if (tagsParam) {
      setSelectedTag(tagsParam);
    } else {
      setSelectedTag(null);
    }
  }, [searchParams]);

  // 2. Sincronizar URL cuando cambia el estado local
  useEffect(() => {
    if (selectedTag) {
      // Actualiza el parámetro 'tags' con los valores seleccionados
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set(name, selectedTag);
        return next;
      }, { replace: true });
    } else {
      // Si no hay tags, elimina el parámetro de la URL
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.delete(name);
        return next;
      });
    }
  }, [selectedTag, setSearchParams]);


  const handleTagChange = (tag) => {
      if(selectedTag == tag){
        setSelectedTag(null)
      }else{
        setSelectedTag(tag)
      }
  };

  return (
    <>
    <Dropdown className={className} style={style}>
      <Dropdown.Toggle
        variant={variant}
        className="border bg-hover container-fluid d-flex toggle-end align-items-center"
        id="dropdown-basic"
      >
        <b style={{opacity: '.7'}} >{name} :</b>
        <span className="small text-muted fw-semibold mx-3">
          { selectedTag ? 
              formatCase(selectedTag)  :  'Seleccionar' 
          }
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {array.map((t) => (
          <div key={t} 
            onClick={() => handleTagChange(t)} 
            className="multi-col-item bg-hover px-3"
          >
            <div className="d-flex gap-3">
                <Form.Check
                    type="checkbox"
                    id={`checkbox-${t}`}
                    onChange={() => handleTagChange(t)}
                    checked={selectedTag == t}
                />
                {formatCase(t)}
            </div>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default InputSelectCheckParam;