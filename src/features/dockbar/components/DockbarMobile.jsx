import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import DockbarLink from "@/features/dockbar/components/DockbarLink";
import { URL_CATALOG, URL_DASHBOARD, URL_HOME, URL_LOGIN, URL_USER_HOME } from "@/utils/links";
import CartButton from "@features/cart/components/CartButton.jsx";
import { useNavigate } from "react-router-dom";


// Nota: esta sidebar es la version normal con navegacion global y admite ambos roles
export default function DockbarMobile({ onShow, expandable = true }) {

    const { isAuth } = useAuthContext()
    const BASE_URL ='/dashboard'
    const {isAdmin} = useAuthContext()
    const navigate = useNavigate()

  
    return (
        <ul className="d-flex w-100 p-0">

            <div className="flex-fill">
                <DockbarLink
                    style={{width: '60px', marginInline: 'auto'}} 
                    to={URL_HOME}
                    icon="bi-house"
                    label="home"
                />
            </div>    

            <div className="flex-fill">
                <DockbarLink
                    style={{width: '60px', marginInline: 'auto'}} 
                    to={URL_CATALOG}
                    icon="bi-list-ul"
                    label="products"
                />
            </div>

            <div className="flex-fill">
                <DockbarLink
                    style={{width: '60px', marginInline: 'auto'}} 
                    to={`${isAuth ? URL_USER_HOME : URL_LOGIN}`}
                    icon="bi-person"
                    label="account"
                />
            </div>

            {isAdmin && (
                <div className="flex-fill">
                    <DockbarLink
                        style={{width: '60px', marginInline: 'auto'}}    
                        to={URL_DASHBOARD}
                        icon="bi-gear"
                        label="panel"
                    />
                </div>
            )}

            <div className="flex-fill text-center">
                <div className="mx-auto" style={{width: '60px'}}>   
                <CartButton style={{padding: "10px"}}/> 
                    <p style={{fontSize: ".700rem"}} className="m-0 text-center">cart</p>
                </div>
            </div>


        </ul>

    )
}
