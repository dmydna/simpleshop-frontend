import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@f/profile/contexts/ProfileContext.jsx";
import { useWarning } from "@/hooks/useWarning.js";
import { URL_CHANGE_PASSWORD, URL_FAQs, URL_USER_PICTURE, URL_USER_PROFILE, URL_USER_PURCHASES, URL_VERIFY_ACCOUNT } from "@/utils/links";
import ArrowLink from "@/components/common/ArrowLink";
import Header from "@/components/layout/Header";

function WelcomePerfil({ children }) {

   const navigate = useNavigate()
   const { loading, profile } = useProfile();
   const { completeRegistration } = useWarning()
   

   return (
      <div>
         <Header
            title={`¡Welcome ${profile?.username || ''}!`}
            subtitle="We ve' assambled some links to get started"
         />
         <div style={{ minHeight: '200px' }}>
            {!completeRegistration && ( 
               <div className="h-100">
                  <Alert variant="danger">
                     <i className="bi bi-exclamation-triangle me-3"></i>
                     Completa el proceso de registro haciendo click  
                     <b onClick={() => navigate(URL_VERIFY_ACCOUNT)} className="text-dark mx-2" href="/complete-register">aqui.</b>   
                  </Alert>
               </div> 
            )}

            <ArrowLink to={URL_FAQs}>
               Frequent questions
            </ArrowLink>   

            <ArrowLink to={URL_CHANGE_PASSWORD}>
               Change password
            </ArrowLink>   

            <ArrowLink to={URL_USER_PROFILE}>
               Update personal data
            </ArrowLink>   

            <ArrowLink to={URL_USER_PURCHASES}>
               View purchase history and details
            </ArrowLink>   

            <ArrowLink to={URL_USER_PICTURE}>
               Change user image
            </ArrowLink>   

         </div>


      </div>

   )

}

export default WelcomePerfil;
