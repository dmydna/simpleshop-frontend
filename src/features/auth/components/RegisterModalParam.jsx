import ModalParam from "@/components/common/ModalParam";
import RegisterForm from "./RegisterForm";


export default function RegisterModalParam() {
    return (
        <ModalParam size="md" param="dialog=register">
            {(close) =>
                <RegisterForm className={'bg-light rounded p-5'} style={{ maxWidth: 500 }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h1 className="fs-4 m-0">Sign up</h1>
                        <i onClick={() => close()} className="h3 bi bi-x m-0 fade-hover"></i>
                    </div>
                </RegisterForm>
            }
        </ModalParam>
    )
}