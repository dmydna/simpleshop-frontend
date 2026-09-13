import MultiImageUploader from "@/components/common/MultiImageUploader";
import { CRUD } from "@/utils/enums";
import { Children, useEffect, useState } from "react";


function MultiImageUploaderCrud({useCrudHook, children, className, baseHook, locked}) {

   const { currentItem, mode, setValue, setSelectedFile } = baseHook
   const [images, setImages] = useState([]); // Array de objetos { id, url, file }
   const createInitialImage = (url, index) => {
      return {
         id:`img-${index}-${Date.now()}`, 
         url:url, 
         file:null // no tiene archivo.
      }
   }
   const getImageUrl = ({ id, url, file }) => url
   const getImageFile = ({ id, url, file }) => file

//  Agrega lista de imagenes del elemento actual , para poder editarlas. 
   useEffect(()=>{
        setImages(currentItem?.images?.map(createInitialImage) || [])
	},[currentItem])


   useEffect(() => {
// Actualiza lista de imagen del elemento actual
      setValue("images", images?.map(getImageUrl), { shouldValidate: true });
// Actualiza lista de archivos a subir
    setSelectedFile(
       // Se descarta las imagenes iniciales
       images?.map(getImageFile)?.filter((f) => f != null)
      );
   }, [images])

    return (
    <div className={className}>
    <p className="fw-medium">{children}</p>  
    <MultiImageUploader 
       locked={mode != CRUD.READ}
       setImages={setImages}
       images={images}
    />
   </div>
    )
}

export default MultiImageUploaderCrud;
