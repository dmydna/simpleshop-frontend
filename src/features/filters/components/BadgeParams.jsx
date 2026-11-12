import { Badge, Col } from "react-bootstrap";
import React, { useMemo } from "react";
import { useSearchParams } from 'react-router-dom';

const BadgeParams = ({ className, style, blacklist = [] }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Procesar los parámetros: expandir 'tag' en múltiples objetos individuales
    const expandedParams = useMemo(() => {
        const result = [];
        
        for (const [key, value] of searchParams.entries()) {
            if (key === 'tags' && value) {
                // Dividir por comas, limpiar espacios y filtrar vacíos
                const values = value.split(',').map(v => v.trim()).filter(v => v.length > 0);
                
                values.forEach(val => {
                    result.push({
                        key: key,
                        value: val,
                        isTag: true // Marcador para identificar que es un valor expandido
                    });
                });
            } else {
                // Parámetros normales
                result.push({
                    key: key,
                    value: value,
                    isTag: false
                });
            }
        }
        return result;
    }, [searchParams]);

    // 2. Función para eliminar un valor específico
    const deleteTag = (keyToRemove, valueToRemove) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            const currentValue = newParams.get(keyToRemove);

            if (keyToRemove === 'tags' && currentValue) {
                // Si es un tag, dividimos, filtramos y unimos de nuevo
                const values = currentValue.split(',').map(v => v.trim()).filter(v => v.length > 0);
                const filteredValues = values.filter(v => v !== valueToRemove);

                if (filteredValues.length > 0) {
                    // Si quedan valores, actualizamos la URL con la nueva lista
                    newParams.set(keyToRemove, filteredValues.join(', '));
                } else {
                    // Si no quedan valores, eliminamos el parámetro completo
                    newParams.delete(keyToRemove);
                }
            } else {
                // Para otros parámetros, eliminamos directamente
                newParams.delete(keyToRemove);
            }
            return newParams;
        });
    };

    return (
        <Col 
            key={'col-1234'}
            className={`${className} ${expandedParams.length !== 0 ? 'mt-3' : ''} d-flex flex-wrap align-items-center mx-auto`} 
            style={style}
        >
            {expandedParams.map((item, index) => {

                if(blacklist.includes(item.key)){
                    return <></>
                }

                return(
                <small>    
                    <Badge
                    key={`${item.key}-${item.value}-${index}`} // Key única basada en valor
                    pill
                    bg="white"
                    text="dark"
                    className={`${item.value} border me-2 mb-2 p-2 px-3`}
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteTag(item.key, item.value)}
                >
                    <span className="fw-bold me-1">{item.key}:</span> 
                    <span className="text-lowercase">{item.value}</span>
                    <i className="ms-1 bi bi-x text-muted" />
                    </Badge>
                </small>
                )
            })}
        </Col>
    );
};

export default BadgeParams;