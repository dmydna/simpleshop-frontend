import { useNavigate } from "react-router-dom";
import { useProfile } from "@f/profile/contexts/ProfileContext";
import { URL_CHANGE_MAIL, URL_CHANGE_PASSWORD, URL_USER_PICTURE, URL_VERIFY_ACCOUNT } from "@/utils/links";
import ArrowLink from "@/components/common/ArrowLink";
import Header from "@/components/layout/Header";


function MyAccount({ children }) {
    const { profile, handleChange, updatePerfil } = useProfile()
    const navigate = useNavigate()

    const handleUpdate = (e) => {
        e.preventDefault()
        // console.log(profile)
        updatePerfil()
    }

    const baseImg = {
        dimension: "100x100"
    }

    return (
        <div className="">

            <Header
                title="Cuenta"
                subtitle="Aquí puedes gestionar todo lo relacionado con tu cuenta."
            />


            <ArrowLink to={URL_USER_PICTURE}>
               Cambiar imagen de perfil
            </ArrowLink>  

            <ArrowLink to={URL_VERIFY_ACCOUNT}>
               Proteger cuenta
            </ArrowLink>  

            <ArrowLink to={URL_CHANGE_PASSWORD}>
               Cambiar mi contraseña
            </ArrowLink> 
           
            <ArrowLink to={URL_CHANGE_MAIL}>
               Cambiar correo electronico
            </ArrowLink> 

            <ArrowLink variant="danger" to={'#'}>
               Eliminar mi cuenta
            </ArrowLink> 



        </div>

    )

}

export default MyAccount;
