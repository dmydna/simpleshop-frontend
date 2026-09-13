
import { Tintify } from "@/components/common/FloatButtonCollection";
import { URL_DASHBOARD, URL_USER_ACCOUNT, URL_USER_FAVORITE, URL_USER_PROFILE, URL_USER_PURCHASES } from "@/utils/links";
import { useNavigate } from "react-router-dom";

function SidebarProfile({ role, border = false }) {

    const navigate = useNavigate()

    return (
            <ul className="list-group list-group-flush">
 

                {role === 'ADMIN' && (
                    <Tintify 
                        className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                        action={() => navigate(URL_DASHBOARD)}>
                        <i className="bi bi-gear fs-5 ps-0 p-2"></i>
                        <span> Dashboard </span>     
                    </Tintify> 
                )}


                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(URL_USER_PROFILE)}>
                    <i className="bi bi-person-check fs-5 ps-0 p-2"></i>
                    <span> Profile </span>     
                </Tintify> 


                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(URL_USER_ACCOUNT)}>
                    <i className="bi bi-person fs-5 ps-0 p-2"></i>
                    <span> Account </span>     
                </Tintify>  

                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(URL_USER_PURCHASES)}>
                    <i className="bi bi-handbag fs-5 ps-0 p-2"></i>
                    <span> Purchases </span>     
                </Tintify>                   
              
                <Tintify 
                    className={`${border ? '' : 'border-0'} text-normalize w-100 justify-content-start`} 
                    action={() => navigate(URL_USER_FAVORITE)}>
                    <i className="bi bi-heart fs-5 ps-0 p-2"></i>
                    <span> Favorites </span>     
                </Tintify>                  

            </ul>

    )
}

export default SidebarProfile;
