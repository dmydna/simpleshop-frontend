import React, { useEffect, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { useSearchParams } from 'react-router-dom';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function InputRangeParam({ 
    children, 
    min = 0, 
    max = 25000, 
    name,
    label,
    type = '', 
    style, 
    className, 
    variant = "light" }) {

    // Estado inicial sincronizado con props
    const [range, setRange] = useState({ minValue: min, maxValue: max });
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Sincronizar estado inicial con la URL (solo al montar o si cambia la URL)
    useEffect(() => {
        const minParam = searchParams.get(`min${capitalize(name)}`);
        const maxParam = searchParams.get(`max${capitalize(name)}`);

        let newMin = min;
        let newMax = max;

        if (minParam && !isNaN(Number(minParam))) newMin = Number(minParam);
        if (maxParam && !isNaN(Number(maxParam))) newMax = Number(maxParam);

        // Solo actualizar si los valores son diferentes a los actuales para evitar loops
        if (newMin !== range.minValue || newMax !== range.maxValue) {
            setRange({ minValue: newMin, maxValue: newMax });
        }
    }, [searchParams, name, min, max]); // Dependencias necesarias

    // 2. Actualizar URL cuando el rango cambia
    useEffect(() => {
        // No guardar si está en valores por defecto
        if (range.minValue === min && range.maxValue === max) {
            setSearchParams(prev => {
                const next = new URLSearchParams(prev);
                next.delete(`min${capitalize(name)}`);
                next.delete(`max${capitalize(name)}`);
                return next;
            }, { replace: true });
            return;
        }

        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set(`min${capitalize(name)}`, range.minValue);
            next.set(`max${capitalize(name)}`, range.maxValue);
            return next;
        }, { replace: true });
    }, [range, min, max, name, setSearchParams]);

    // Manejador para los inputs numéricos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const val = Number(value);
        
        // Validación básica para no permitir valores fuera de rango
        if (val < min || val > max) return;

        setRange(prev => ({ ...prev, [name]: val }));
    };

    // Manejador específico para el RangeSlider (devuelve [min, max])
    const handleSliderInput = (values) => {
        const [newMin, newMax] = values;
        setRange({ minValue: newMin, maxValue: newMax });
    };

    const toggleText = `${type}${range.minValue} - ${type}${range.maxValue}`;

    return (
        <>
        <style>{`
        .range-slider .range-slider__thumb{
            width: 17px;
            height: 17px;
            background: #2196f3;
        }
        `}</style>
        <Dropdown style={style} className={`${className} mb-2 w-100`}>
            <Dropdown.Toggle
                variant={variant}
                className="border bg-tint d-flex align-items-center container-fluid text-start toggle-end" 
                id="dropdown-basic"
            >
                <span>{label || name} </span>
                <span  style={{opacity: '.6' , lineHeight: '10px'}}  
                    className="w-100 text-end small text-muted fw-semibold mx-3">
                    {range.maxValue !== max || range.minValue !== min ? toggleText : 'select'}
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
                <div style={{ width: "100%" }} className="p-3 align-items-center">
                    <Col className="mb-2" xs={12}>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center p-0 m-0">
                                <small style={{textWrap: 'nowrap'}} className="text-muted">Min: {type}</small>
                                <div style={{ maxWidth: "60px" }} className="p-0 me-2">
                                    <Form.Control
                                        style={{ fontSize: ".875em" }}
                                        className="p-1"
                                        type="number"
                                        name="minValue"
                                        min={min}
                                        max={max}
                                        value={range.minValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-center p-0 m-0">
                                <small className="text-muted">Max: {type}</small>
                                <div style={{ maxWidth: "60px" }} className="p-0 me-2">
                                    <Form.Control
                                        style={{ fontSize: ".875em" }}
                                        className="p-1"
                                        type="number"
                                        name="maxValue"
                                        min={min}
                                        max={max}
                                        value={range.maxValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} className='my-3'> {/* Corregido de xw a xs */}
                        <RangeSlider
                            value={[range.minValue, range.maxValue]}
                            onInput={handleSliderInput}
                            min={min}
                            max={max}
                            step={1}
                        />
                    </Col>
                </div>
            </Dropdown.Menu>
        </Dropdown>
        </>
    );
}

export default InputRangeParam;