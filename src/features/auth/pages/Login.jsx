import { Container, Row } from "react-bootstrap";
import React, { useEffect } from "react";

import LoginForm from "@f/auth/components/LoginForm.jsx";
import PageFormLayout from "@/components/layout/PageFormLayout";


function Login(){

    return (
      <PageFormLayout>
        <LoginForm className={'bg-white rounded-4 border p-4 p-md-5'} style={{maxWidth: 500}}>
             <div className="d-flex align-items-center justify-content-between mb-4">
                <p className="fs-4 m-0">Iniciar sesión</p>
            </div>
        </LoginForm>
      </PageFormLayout>
    )
}

export default Login;

