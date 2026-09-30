import FetchState from "@/components/common/FetchState";
import Header from "@/components/layout/Header";
import FormProfile from "@/features/profile/components/FormProfile.jsx";
import { UpdateProfileDTO } from "@/utils/schemas.js";
import { useProfile } from "@f/profile/contexts/ProfileContext.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";



function MyProfile({ children }) {

    const { profile, updatePerfil, loading, setError, error, success, setSuccess } = useProfile()

    const { reset, register, handleSubmit, formState: { errors } } 
        = useForm({ 
            resolver: zodResolver(UpdateProfileDTO), 
            defaultValues: profile,
            // mode: 'onTouched', 
            // reValidateMode: 'onChange'
        });

    useEffect(()=>{
        // setea valores iniciales
        reset(profile)
    },[profile])

    const onSubmit = async (data) => {
        await updatePerfil(data)
    };


    return (
        <FetchState.Toast
            hook={{loading, error, setError, success, setSuccess}}
        >
        <div>
            <Header
                title="Informacion Personal"
                subtitle="Aquí puedes gestionar todo lo relacionado con informacion personal."
            />
            
            <FormProfile
                className="mb-4"
                id={"informationPerfilForm"} 
                submit={handleSubmit(onSubmit)} 
                formHook={{errors, register, loading}}
            />

            <div className='w-100 d-flex justify-content-center'> 
               <Button 
                    className="rounded-4"
                    form='informationPerfilForm' 
                    variant="dark" 
                    type="submit"
                    disabled={loading}
                > 
                    {loading ? 
                          <Spinner size="sm" animation="border" /> 
                          : <i className="bi bi-floppy"></i>} 

                   <span className="mx-3">Actualizar </span>
               </Button>
           </div>
        </div>
        </FetchState.Toast>


    )

}

export default MyProfile;
