import { Nav, Button } from "react-bootstrap";
import CartButton from "@features/cart/components/CartButton.jsx";
import SearchOverlay from "@features/search/SearchOverlay";
import UserDropdown from "@features/user/components/UserDropdown.jsx";
import ProtectedAction from "@/components/common/ProtectedAction"
import { useNavbarContext } from "@/contexts/NavbarContext.jsx";



function ActionBar(){

  const {  setShowMenu } = useNavbarContext()

    return(
        <Nav className={`align-items-center flex-row order-md-2 gap-2`}>
          <SearchOverlay/>
          <UserDropdown />
          <div className="d-none d-md-block">
              <ProtectedAction redirect={"/cart"}>
                <CartButton/>
              </ProtectedAction>
          </div>
          <Button className='d-block d-md-none' onClick={()=> setShowMenu(prev=>!prev)} variant='light'>
              <i className='bi bi-three-dots'></i>
          </Button>

        </Nav>
    )
}

export default ActionBar
