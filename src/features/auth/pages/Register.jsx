import PageFormLayout from "@/components/layout/PageFormLayout";
import RegisterForm from "@features/auth/components/RegisterForm.jsx";


export default function Register() {

    return (
        <PageFormLayout>
            <RegisterForm className={'bg-white border rounded-4 p-4 p-md-5'} style={{ maxWidth: 500 }}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <p className="fs-4 m-0">Registrarse</p>
                </div>
            </RegisterForm>
        </PageFormLayout>

    )


}

