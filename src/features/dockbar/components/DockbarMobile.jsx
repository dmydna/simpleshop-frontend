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
        <ul style={{width: "500px"}} className="mx-3 mx-sm-auto list-group list-group-flush flex-row justify-content-between">


            <DockbarLink
                to={URL_HOME}
                icon="bi-house"
                label="home"
            />

            <DockbarLink
                to={URL_CATALOG}
                icon="bi-list-ul"
                label="products"
            />

            <DockbarLink
                to={`${isAuth ? URL_USER_HOME : URL_LOGIN}`}
                icon="bi-person"
                label="account"
            />

            {isAdmin && (
                <DockbarLink
                    to={URL_DASHBOARD}
                    icon="bi-gear"
                    label="panel"
                />
            )}

            <div>
             <CartButton/> 
              <p style={{fontSize: ".700rem"}} className="m-0 mt-2 text-center">cart</p>
            </div>


        </ul>

    )
}
