import ButtonLink from "@/components/common/ButtonLink";
import { ConfirmMessage } from "@/components/common/ConfirmMessage";
import { CrudActions } from "@/components/common/CrudActions";
import ModalConfirm from "@/components/common/ModalConfirm";
import {  MSG_USER_DELETE } from "@/components/common/MsgConfirm";
import { useUserForm } from "@/features/user/hooks/useUserForm";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import { URL_USER_CRUD } from "@/utils/links";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";



export default function UserActions({ close, className }) {

    const crudHook = useUserForm()
    const { setId, currentItem, setCurrentItem, success, refreshElem,  updateStatus} = crudHook

    const navigate = useNavigate();
    const location = useLocation();

    const {setSearchParams} = useUrlState();

    // ModalConfirm
    const [showConfirm, setShowConfirm] = useState(false);
    const [dataConfirm, setDataConfirm] = useState([]);
    const [msgConfirm, setMsgConfirm ] = useState();

   const handleConfirm = () => {
       updateStatus(...dataConfirm)
       setShowConfirm(false)
   }


    //Params
    const { modeParam, idParam } = useUrlParams()

    //URLs
    const FORM_URL = URL_USER_CRUD;
    const CURRENT_URL = location.pathname;

    useEffect(() => {
        if (idParam) { setId(idParam) } else { setCurrentItem(null) }
        if (success) { 
            // refrescar elemento (local)
            refreshElem(); 
            // refrescar lista (global)
            setSearchParams(prev => ({...prev, tableVersion: Date.now()}))
       }
    }, [idParam, success])


   // Handles

   const status = useMemo(()=> ({
        banned:   currentItem?.meta?.status == "BANNED",
        active:   currentItem?.meta?.status == "ACTIVE",
        inactive: currentItem?.meta?.status == "INACTIVE"
   }),[currentItem])


   // ModalConfirm
   const handleStatus = (...args) => {
       const [id, status, ...xargs] = args;
       if(status == "DELETED") {
        setMsgConfirm(<MSG_USER_DELETE id={id} />)
       }
       setDataConfirm([...args])
       setShowConfirm(true)    
   }

   const handle = useMemo(()=> ({
        ban:     () => navigate(`${CURRENT_URL}?id=${currentItem?.id}&dialog=ban.create`),
        unban:   () => navigate(`${CURRENT_URL}?id=${currentItem?.id}&dialog=ban.update`),
        clone:   () => navigate(`${FORM_URL}?mode=create&id=${currentItem.id}`),
        edit:    () => navigate(`${FORM_URL}?mode=edit&id=${currentItem.id}`),
        summary: () => navigate(`${FORM_URL}?mode=view&id=${currentItem.id}`),
        delete:  () => handleStatus(currentItem.id, "DELETED"),
   }),[currentItem])



    return (
        <div className={className}>

            <CrudActions  close={close} {...crudHook} >

                    {/** Item Config **/}

                    <ButtonLink
                        disabled={true}
                        icon="bi-image"
                        visible={true}
                    >
                        Change user pic
                    </ButtonLink>

                    <ButtonLink
                        disabled={true}
                        icon="bi-key"
                        visible={true}
                    >
                        Asignate Role
                    </ButtonLink>

 
                    <hr className="my-1"/> 

                   <ButtonLink
                        handle={ handle.ban }
                        icon="bi-person-slash"
                        visible={ status.active && modeParam  !== 'create'}
                    >
                        Ban user
                    </ButtonLink>

                    <ButtonLink
                        handle={ handle.unban }
                        icon="bi-eye"
                        visible={ status.banned }
                    >
                        Remove ban
                    </ButtonLink>


                    <ButtonLink
                        visible={ modeParam  !== 'create' }
                        handle={ handle.delete }
                        icon="bi-trash3"
                    >
                        Delete
                    </ButtonLink>

                    <hr className="my-1"/> 

                    <ButtonLink
                        visible={ idParam && modeParam  !== 'create' }
                        handle={ handle.edit }
                        icon="bi-pencil"
                    >
                        Edit User
                    </ButtonLink>

                    <ButtonLink
                        visible={ idParam && modeParam  !== 'create' }
                        handle={ handle.summary }
                        icon="bi-three-dots-vertical"
                    >
                        Summary
                    </ButtonLink>

                    <ModalConfirm show={showConfirm} >
                        <ConfirmMessage
                            title={"Confirmar Accion"}
                            message={msgConfirm}
                            onClose={()=>setShowConfirm(false)} 
                            onAction={()=>handleConfirm()}
                        />
                    </ModalConfirm>  


            </CrudActions>
        </div>    
    )
}

