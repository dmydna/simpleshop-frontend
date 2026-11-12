import React, { useEffect, useMemo, useCallback } from "react";
import {Alert, Button, Col, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "@hooks/useForm.js";
import { useAuthContext } from "@f/auth/contexts/AuthContext.jsx";
import PublicRoute from "@/components/common/PublicRoute";
import { useUrlParams } from "@/hooks/useUrlParams";


function LoginForm({ children, style, className}){

    const { login, loading, error,  setReset } = useAuthContext();
    const { onChange, formData} = useForm()

    const navigate = useNavigate();

    const { redirectParam } = useUrlParams()

    useEffect(()=> setReset(true),[])

 
    const handleSubmit = async(e) =>{
        e.preventDefault();
        await login(formData)
        navigate(redirectParam? decodeURI(redirectParam) : '/user')
   }



    return (
    <PublicRoute>
        <Col className={`${className} mx-auto`} style={style}>
                {children}
            <Form  onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="username o email"
                        value={formData.username}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={onChange}
                    />
                </Form.Group>
                <div className={`${  error?.message || error?.error || "" ? 'opacity-100' : 'opacity-0'}`} >
                    <Alert variant="danger">{error?.message || error?.error || ""}</Alert>
                </div>

                {loading ?
                    <Button variant="primary"  className="w-100 position-relative my-2 " disabled>
                        <div style={{scale: ".8", left: "10px", top: "1px" }}
                             className="spinner-border text-white scale-50 position-absolute" role="status"
                        >
                        </div>
                        Cargando...
                    </Button>

                    : <Button variant="primary" type="submit" className="w-100 my-2" >Acceder</Button>
                }

                <div className="d-flex justify-content-center m-2">
                   <p className="me-2">¿Aun no tienes una cuenta?</p>
                    <Link to={"/register"}>
                        <p className="text-primary fw-bold">Registrarme</p>
                    </Link>
                </div>

            </Form>
        </Col>
    </PublicRoute>
    )


}


export default LoginForm;
