import { TagsList } from "@/components/common/TagsList";
import { CRUD } from "@utils/enums.js";

function FormTags({ children, className, crudHook }) {

  const { mode, currentProduct,  setValue } = crudHook;

  return (
    <>
      {/* Producto */}

      {children}

      <>

         <div className="d-block">
            <p className="fw-medium"> Tags </p>
            <TagsList  
               locked={mode == CRUD.VIEW}
               array={currentProduct.tags || []} 
               onChange={(tg)=> setValue("tags",tg) } 
            />
         </div>


      </>

    </>
  )
}
export default FormTags;
