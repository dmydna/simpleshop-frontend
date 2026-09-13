import ButtonLink from "@/components/common/ButtonLink";
import { ConfirmMessage } from "@/components/common/ConfirmMessage";
import { CrudActions } from "@/components/common/CrudActions";
import ModalConfirm from "@/components/common/ModalConfirm";
import { MSG_LISTING_ACTIVE, MSG_LISTING_DELETE, MSG_LISTING_INACTIVE } from "@/components/common/MsgConfirm";
import { useListingForm } from "@/features/listing/hooks/useListingForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { URL_LISTING_CRUD, URL_LISTING_LIST, URL_PRODUCT_CRUD } from "@/utils/links";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ListingActions({ close, className }) {


    const crudHook = useListingForm()

    const { setId, currentItem, setCurrentItem, loading, error, setError, 
        setSuccess, success, refreshElem, updateStatus } 
    = crudHook

    // ModalConfirm
    const [showConfirm, setShowConfirm] = useState(false);
    const [dataConfirm, setDataConfirm] = useState([]);
    const [msgConfirm, setMsgConfirm] = useState();

    // Navigation
    const navigate = useNavigate();
    const location = useLocation();

    //Params
    const { searchParams, setSearchParams } = useUrlState();
    const { modeParam, idParam, hashParam } = useUrlParams()

    // URLs
    const FORM_URL = URL_LISTING_CRUD;
    const LIST_URL = URL_LISTING_LIST;


    useEffect(() => {
        if (idParam) { setId(idParam) } else { setCurrentItem(null) }
        if (success) { 
            refreshElem(); // refrescar elemento (local)
            setSearchParams(prev => ({ 
              ...prev, tableVersion: Date.now()// refrescar lista (global)
            })) 
        }
    }, [idParam, success])


    // VISIBLE BUTTONS

    const isStatusActive = useMemo(() => {
        return currentItem?.meta?.status === "ACTIVE"
    }, [currentItem])


    const isStatusNotActive = useMemo(() => {
        return currentItem?.meta?.status === "INACTIVE"
    }, [currentItem])


    // -- MODAL CONFIRM --

    const handleStatus = (...args) => {
        const [id, status, ...xs] = args;

        if (status == "ACTIVE") 
            setMsgConfirm(<MSG_LISTING_ACTIVE id={id} />)
        if (status == "INACTIVE") 
            setMsgConfirm(<MSG_LISTING_INACTIVE id={id} />)
        if (status == "DELETED") 
            setMsgConfirm(<MSG_LISTING_DELETE id={id} />)

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
        specs :  () => navigate(`${URL_PRODUCT_CRUD}?mode=view&id=${currentItem?.productId}`) ,
        create:  () => navigate(`${FORM_URL}?mode=create`),
        edit2:   () => navigate(`${FORM_URL}?mode=edit.draft&id=${currentItem?.id}`), 
        clone:   () => navigate(`${FORM_URL}?mode=create&id=${currentItem.id}`),
        edit:    () => navigate(`${FORM_URL}?mode=edit&id=${currentItem.id}`),
        summary: () => navigate(`${FORM_URL}?mode=view&id=${currentItem.id}`),
        preview: () => navigate(`/p/${currentItem.id}`),
        deactive:() => handleStatus(currentItem.id, "INACTIVE"),
        activate:() => handleStatus(currentItem.id, "ACTIVE"),
        delete:  () => handleStatus(currentItem.id, "DELETED"),
   }),[currentItem])



    return (
        <div className={className}>

            <CrudActions close={close} {...crudHook} >
            

                    <ButtonLink
                        handle={ handle.specs }
                        icon="bi-box-seam"
                        visible={modeParam != 'create'}
                    >
                        Product Specs
                    </ButtonLink>

                    <ButtonLink
                        handle={ handle.preview }
                        icon="bi-star"
                        visible={modeParam != 'create'}
                    >
                        Preview
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        icon="bi-image"
                        visible={true}
                    >
                        Change thumbnail
                    </ButtonLink>

                    <hr className="my-1"/> 
                    
                    <ButtonLink
                        visible={modeParam != 'create'}
                        handle={ handle.edit }
                        icon="bi-pencil"
                    >
                        Edit
                    </ButtonLink>

                    <ButtonLink
                        visible={modeParam != 'create'}
                        handle={ handle.clone }
                        icon="bi-copy"
                    >
                        Clone
                    </ButtonLink>

                    <ButtonLink
                        visible={idParam}
                        handle={ handle.summary }
                        icon="bi-three-dots"
                    >
                        Summary
                    </ButtonLink>

                    {modeParam != 'create' && <hr className="my-1"/>} 

                    <ButtonLink
                        handle={ handle.deactive }
                        icon="bi-eye-slash"
                        visible={ status.active }
                    >
                        Deactivate
                    </ButtonLink>

                    <ButtonLink
                        handle={ handle.activate }
                        icon="bi-eye"
                        visible={ !status.active }
                    >
                        Activate
                    </ButtonLink>

                    <ButtonLink
                        visible={true}
                        handle={ handle.delete }
                        icon="bi-trash3"
                    >
                        Delete
                    </ButtonLink>

                    {/** List Actions **/}

                    <ButtonLink
                        disabled={true}
                        visible={!idParam}
                        icon="bi-upload"
                        handle={() => navigate('/faqs')}
                    >
                        Import File
                    </ButtonLink>


                    <ButtonLink
                        disabled={true}
                        visible={!idParam}
                        icon="bi bi-download"
                        handle={() => navigate('/faqs')}
                    >
                        Export File
                    </ButtonLink>

                    <ModalConfirm show={showConfirm} >
                        <ConfirmMessage 
                            title={"Confirmar Accion"}
                            message={msgConfirm}
                            onClose={() => setShowConfirm(false)} 
                            onAction={() => handleConfirm()}
                        />
                    </ModalConfirm>    
        
            </CrudActions>

        </div>
    )
}

