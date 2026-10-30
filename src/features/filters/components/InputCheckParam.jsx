import { useEffect, useState, useMemo } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useListing } from "@features/listing/hooks/useListing";
import { useSearchParams, useNavigate } from 'react-router-dom';


export function formatCase(text){
  // "word(8*)" --> "word"
  return text.replace(/\s*\(.*?\)/g, '').trim();
}

function InputCheckParam({ 
  name, label, array = [] , cols = 1, textStyle = "lowercase",
  className, style, variant = "light", multiselection
}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState([]);

  // 1. Sincronizar estado inicial con la URL
  useEffect(() => {
    const tagsParam = searchParams.get(name);
    if (tagsParam) {
      // Si viene como string separado por comas: "seafood,vegetables"
      const tagsArray = tagsParam.split(',').map(t => t.trim()).filter(t => t);
      setSelectedTags(tagsArray);
    } else {
      setSelectedTags([]);
    }
  }, [searchParams]);

  // 2. Sincronizar URL cuando cambia el estado local
  useEffect(() => {
    if (selectedTags.length > 0) {
      // Actualiza el parámetro 'tags' con los valores seleccionados
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set(name, selectedTags.join(','));
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
  }, [name, selectedTags, setSearchParams]);


  const handleTagChange = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        if(!multiselection){
          return []
        }
        return prev.filter((t) => t !== tag);
      } else {
        if(!multiselection){
          return [tag]
        }
        return [...prev, tag ];
      }
    });
  };

  return (
    <>
    <Dropdown className={className + ' w-100'} style={style}>
      <Dropdown.Toggle
        variant={variant}
        className="border bg-tint container-fluid d-flex toggle-end align-items-center"
        id="dropdown-basic"
      >
        <span>{label || name} </span>
        <span style={{opacity: '.6' , lineHeight: '10px'}} 
          className="w-100 text-end small text-muted fw-semibold mx-3">
          {selectedTags.length !== 0 ? (
            <span className="">
              { multiselection  && `selected (${selectedTags.length})`}
              { !multiselection && array.find( t =>  formatCase(t) == selectedTags[selectedTags.length-1]) }
            </span>
          ) : (
            'select'
          )}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ textTransform: textStyle, columnCount: cols }} className="multi-col-dropdown-menu">
        {array.map((t) => (
          <div key={t} className="multi-col-item">
            <Form.Check
              type="checkbox"
              id={`checkbox-${t}`}
              label={t}
              onChange={() => handleTagChange(formatCase(t)) }
              checked={selectedTags.includes(formatCase(t)) }
            />
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default InputCheckParam;