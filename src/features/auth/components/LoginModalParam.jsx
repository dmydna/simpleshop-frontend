import ModalParam from "@/components/common/ModalParam";
import LoginForm from "./LoginForm";


export default function LoginModalParam() {
    return (
        <ModalParam size="md" param="dialog=login">
            {(close) =>
                <LoginForm className={'bg-light rounded p-5'} style={{ maxWidth: 500 }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h1 className="fs-4 m-0">Iniciar sesión</h1>
                        <i onClick={() => close()} className="h3 bi bi-x m-0 fade-hover"></i>
                    </div>
                </LoginForm>
            }
        </ModalParam>
    )
}