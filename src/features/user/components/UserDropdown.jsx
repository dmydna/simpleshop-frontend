import { IconTint } from "@/components/common/FloatButtonCollection";
import ImageWithFallback from "@/components/common/ImageWithFallback.jsx";
import { useAuthContext } from "@/features/auth/contexts/AuthContext.jsx";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";
import userDefault from "/user-default-xs.png";
import { URL_DASHBOARD, URL_USER_FAVORITE, URL_USER_PURCHASES } from "@/utils/links";
import { useAsync } from "@/hooks/useAsync";
import { userService } from "@features/user/service/userService";
import { useUrlParams } from "@/hooks/useUrlParams";


function UserDropdown({ className }) {

  const { auth, isAuth, logout, isAdmin } = useAuthContext();

  const { pageVersion } = useUrlParams();
  const [isActive, setIsActive] = useState(false)
  const [imageUser, setImageUser] = useState(null)
  
  // si esta logeado activa el dropdown toggle, si no muestra LoginModal
  const handleToggle = (isOpen) => 
    isAuth ? setIsActive(isOpen) : 
    navigate(`${window.location.pathname}?dialog=login`)

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  const getMyUser = useAsync(userService.getMySummary)

  const myUser = async() => {
    const user = await getMyUser.execute()

    setImageUser(user?.image || '#')
  }

  useEffect(()=>{
    myUser()

  },[auth, pageVersion])

  useEffect(()=>{
    console.log("cambia imagen de navbar", imageUser)
  },[imageUser])


  return (
    <>
      <Dropdown
        show={isActive}
        align="end"
        className={className}
        onToggle={handleToggle}
      >
        <Dropdown.Toggle
          id="user-dropdown"
          variant=""
          className="border-0 bg-transparent p-0 no-caret"

        >
          {!isAuth &&
            <IconTint 
              style={{ padding: '5px'}}
              icon={'person'}
              className={'fs-4 rounded-circle d-none d-md-block'}
            />
          }
          {isAuth && 
            <ImageWithFallback 
              className="rounded-circle border d-none d-md-block" 
              src={ imageUser }
              fallbackSrc={userDefault}
              width={30} 
              height={30}
              />

          }
          
        </Dropdown.Toggle>

        <Dropdown.Menu
          className={`shadow-sm`}
          style={{ minWidth: "220px" }}
        >
          {/* Perfil info */}
          <Dropdown.Item
            as={Link}
            to={`/user`}
            className="border-bottom py-2"
          >
            <div className="active-fix">
              <b className="fw-semibold">{ auth?.username}</b>
              <p className="m-0 small text-secondary">View full profile</p>
            </div>
          </Dropdown.Item>
  
          {/* Links de navegación */}
          {isAdmin && (
            <>  
              <Dropdown.Item as={Link} to={URL_DASHBOARD}>
                <i className="bi bi-gear me-2"></i> Dashboard
              </Dropdown.Item>
            </>
          )}

          <Dropdown.Item as={Link} to={URL_USER_FAVORITE}>
            <i className="bi bi-heart me-2"></i> Favorites
          </Dropdown.Item>

          <Dropdown.Item as={Link} to={URL_USER_PURCHASES}>
            <i className="bi bi-handbag me-2"></i> Purchases
          </Dropdown.Item>
  
          <Dropdown.Divider />
  
          {/* Logout */}
          <Dropdown.Item as="div" className="text-center">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleLogout}
              className="w-100"
            >
              <i className="bi bi-box-arrow-right me-1"></i> Log out
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default UserDropdown;
