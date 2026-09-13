import ButtonLink from "@/components/common/ButtonLink";
import { ConfirmMessage } from "@/components/common/ConfirmMessage";
import { CrudActions } from "@/components/common/CrudActions";
import ModalConfirm from "@/components/common/ModalConfirm";
import { MSG_PRODUCT_INACTIVE } from "@/components/common/MsgConfirm";
import { useProductForm } from "@/features/product/hooks/useProductForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { URL_PRODUCT_CRUD, URL_PRODUCT_LIST } from "@/utils/links";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


  // TODO: manejar rutas muertas de ProductList/ProductForm.
export default function ProductActions({ close, className }) {


    const crudHook = useProductForm()
    const { setId, currentItem, setCurrentItem, success, refreshElem, updateStatus }  
    = crudHook;

    // ModalConfirm
    const [showConfirm, setShowConfirm] = useState(false);
    const [dataConfirm, setDataConfirm] = useState([]);
    const [msgConfirm, setMsgConfirm ] = useState();

    // Navigation
    const navigate = useNavigate();

    //Params
    const [searchParams, setSearchParams] = useSearchParams();
    const {modeParam, idParam} = useUrlParams()

    // URLs
    const FORM_URL = URL_PRODUCT_CRUD;
    const LIST_URL = URL_PRODUCT_LIST;

    useEffect(() => {
        if (idParam) { setId(idParam) } else { setCurrentItem(null) }
        if (success) { 
            refreshElem(); // refrescar elemento (local)
            setSearchParams(prev => ({ 
              ...prev, tableVersion: Date.now()// refrescar lista (global)
            })) 
        }
    }, [idParam, success])


   // ModalConfirm
   const handleStatus = (...args) => {
       const [id, status, ...xargs] = args;
       if(status == "DELETED") {
        setMsgConfirm(<MSG_PRODUCT_INACTIVE id={id} />)
       }
       setDataConfirm([...args])
       setShowConfirm(true)    
   }

   const handleConfirm = () => {
       updateStatus(...dataConfirm)
       setShowConfirm(false)
   }

   const status = useMemo(()=> ({
        draft:    currentItem?.meta?.status == "DRAFT",
        active:   currentItem?.meta?.status == "ACTIVE",
        inactive: currentItem?.meta?.status == "INACTIVE"
   }),[currentItem])

   const handle = useMemo(()=> ({
        clone:   () => navigate(`${FORM_URL}?mode=create&id=${currentItem.id}`),
        edit:    () => navigate(`${FORM_URL}?mode=edit&id=${currentItem.id}`),
        summary: () => navigate(`${FORM_URL}?mode=view&id=${currentItem.id}`),
        deactive:() => handleStatus(currentItem.id, "INACTIVE"),
        activate:() => handleStatus(currentItem.id, "ACTIVE"),
        delete:  () => handleStatus(currentItem.id, "DELETED"),
   }),[currentItem])


    return (
        <div className={className}>

            <CrudActions close={close}  {...crudHook} >


                    {/** Item Config **/}
                    
                    <ButtonLink
                        icon="bi-pencil"
                        handle={ handle.edit }
                        visible={ status.active }
                    >
                        Edit
                    </ButtonLink>


                    <ButtonLink
                        icon="bi-copy"
                        handle={ handle.clone }
                        visible={ idParam }
                    >
                        Clone
                    </ButtonLink>


                    <ButtonLink
                        icon="bi-three-dots"
                        handle={ handle.summary }
                        visible={ modeParam != 'create' }
                    >
                        Summary
                    </ButtonLink>

                    {modeParam != 'create' && <hr className="my-1"/> }


                    <ButtonLink
                        icon="bi-trash3"
                        handle={ handle.delete }
                        visible={ true }
                    >
                        Delete
                    </ButtonLink>

                    {modeParam != 'create' && <hr className="my-1"/> }

                    {/** List Actions **/}

                    <ButtonLink
                        icon="bi-file-earmark"
                        disabled={true}
                    >
                        Import File
                    </ButtonLink>


                    <ButtonLink
                        icon="bi-file-earmark"
                        disabled={true}
                    >
                        Export File
                    </ButtonLink>


                    <ModalConfirm show={showConfirm} >
                        <ConfirmMessage
                            title={"Confirmar Accion"}
                            message={msgConfirm}
                            onClose={()=>setShowConfirm(false)} 
                            onAction={()=>handleConfirm()}
                        />
                    </ModalConfirm>  

                    <ButtonLink
                        className={'mt-3'}
                        visible={ window.location.pathname != LIST_URL && false }
                        handle={() => navigate(LIST_URL) }
                        icon="bi-chevron-left"
                    >
                        Volver a lista
                    </ButtonLink>

            </CrudActions>

        </div>
    )
}

