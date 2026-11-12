import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'; // Asumiendo que usas react-bootstrap
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function InputSelectParam({ name, Enum, label }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Obtener el valor actual de la URL o usar cadena vacía
    const initialValue = searchParams.get(name) || "";
    const [selected, setSelected] = useState(initialValue);

    // Sincronizar el estado local si cambia la URL externamente
    useEffect(() => {
        setSelected(searchParams.get(name) || "");
    }, [searchParams, name]);

    const addParam = (value) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (value === "") {
                newParams.delete(name); // Opcional: borrar el parámetro si es vacío
            } else {
                newParams.set(name, value);
            }
            return newParams;
        }, { replace: true });
        setSelected(value);
    };

    const mouseOverStyle = (e) =>{
    	e.target.style.backgroundColor = '#e0e0e0'
    	e.target.style.cursor = 'pointer'
    }

    const mouseOutStyle = (e) =>{
    	e.target.style.backgroundColor = '#ffff'
    }

    return (
    	<>
    	<style>{`
        .dropdown-toggle-custom :hover {
            cursor:pointer;
        }
        .dropdown-toggle-custom {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-caret-down-fill' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.95rem center; 
            background-size: 9px 9px; 
            padding-right: 3rem; 
        }
		`}</style>
        <Form.Group 
        	className="mb-2" controlId={name}>
            <Form.Label 
                className='position-absolute fw-bold' 
                style={{
                	transform: "translate(5px, 7px)", 
                	paddingLeft: '0.5rem',
                    opacity: '.7',
                    cursor: 'pointer'
                }} // Ajuste opcional
            >
                {label || name} :
            </Form.Label>
            <Form.Select 
                style={{ lineHeight: '25px',fontSize: '.9rem', paddingLeft: `${label?.length*0.6 || name?.length*0.8}rem` }} 
                className='bg-light bg-hover dropdown-toggle-custom small text-muted fw-semibold text-capitalize' 
                value={selected} 
                onChange={(e) => addParam(e.target.value)}
            >
                <option style={{opacity: '.3'}} className='small' value="">
                    Seleccionar
                </option>
                {Object.keys(Enum).map((key) => (
                    <option
                     	key={key} className='small' value={key}>
                        {Enum[key]}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
        </>
    );
}


export default InputSelectParam;