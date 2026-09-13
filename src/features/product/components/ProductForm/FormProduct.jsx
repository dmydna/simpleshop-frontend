import InputCrudFloating from "@/features/form/components/InputCrudFloating";

function FormProduct({ children, className, crudHook }) {

  return (
    <>
      {/* Producto */}

      {children}

      <>

        <p className='fw-medium'>General</p>

        <div className="d-flex gap-2 flex-column flex-lg-row">
        <InputCrudFloating
          name={"name"}
          label={"Name"}
          {...crudHook}
        />
        

       </div> 

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"brand"}
            label={"Brand"}
            {...crudHook}
          />
          <InputCrudFloating
            name={"sku"}
            label={"Sku"}
            {...crudHook}
          />
        </div>

          <InputCrudFloating
            name={"weight"}
            label={"Weight (kg)"}
            {...crudHook}
          />

      </>

    </>
  )
}
export default FormProduct
