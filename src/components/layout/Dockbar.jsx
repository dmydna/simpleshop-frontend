import DockbarAdmin from "@/features/dockbar/components/DockbarAdmin";
import DockbarMobile from "@/features/dockbar/components/DockbarMobile";

// Nota esta version de sidebar, admite modos almenos en version Mobile.
// eslint-disable-next-line no-empty-pattern
function Dockbar({}) {


  return (
    <>
      {/* -- Sidebar PC (solo para admin) --*/}
        <>
          <div id="dashbar" style={{ zIndex: "1050", width: "80px", paddingTop: "50px" }} 
            className='bg-white fixed-top d-none d-md-block h-100 p-2 border-end'>
            <DockbarAdmin />
          </div>
        </>

      {/* -- Sidebar Mobile (para todos) --*/}      
      {(
        <div style={{ zIndex: "100", height: "75px", overflowX: "auto", overflowY: "hidden", paddingTop: "0px" }}
          className='bg-white fixed-bottom d-block d-md-none w-100 p-2 border-top'>
          <DockbarMobile />
        </div>
      )}
    </>
  );
}

export default Dockbar;