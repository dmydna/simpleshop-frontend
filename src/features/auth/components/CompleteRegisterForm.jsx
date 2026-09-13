
import FetchStateToast from "@/components/common/FetchStateToast";
import PublicRoute from "@/components/common/PublicRoute";
import FormProfile from "@/features/profile/components/FormProfile";
import { UpdateProfileDTO } from "@/utils/schemas";
import { useProfile } from "@features/profile/contexts/ProfileContext.jsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button, Col } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";


function CompleteRegisterForm({ children, className, style }) {

    const navigate = useNavigate();

    const { profile, updatePerfil, loading, setError, error, success, setSuccess } = useProfile()

    const { reset, register, handleSubmit, formState: { errors } } 
        = useForm({ 
            resolver: zodResolver(UpdateProfileDTO), 
            defaultValues: profile,
            // mode: 'onTouched', 
            // reValidateMode: 'onChange'
        });

    useEffect(() => {
        // setea valores iniciales
        reset(profile)
    }, [profile])

    const onSubmit = async (data) => {
        console.log(data)
        await updatePerfil(data)
    };


    return (
        
        <PublicRoute>
            <Col className={`${className} mx-auto`} style={{ ...style, minHeight: '400px' }}>

                <FetchStateToast
                    hook={{ loading, error, setError, success, setSuccess }}
                >
                    <>
                        {children}

                        <FormProfile 
                            id={"informationPerfilForm"} 
                            submit={handleSubmit(onSubmit)} 
                            formHook={{ errors, register }}
                        />

                        <Button 
                            className="w-100 my-2"
                            form='informationPerfilForm' 
                            variant="primary" 
                            type="submit"
                        > 
                            Actualizar
                        </Button>
                    </>    
                </FetchStateToast>

            </Col>
        </PublicRoute>

    )

}
export default CompleteRegisterForm;
