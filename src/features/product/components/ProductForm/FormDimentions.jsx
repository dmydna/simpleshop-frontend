import InputCrudFloating from "@/features/form/components/InputCrudFloating";

function FormDimentions({ children, className, crudHook }) {

  return (
    <>
      {/* Producto */}

      {children}

      <>

       <p className='fw-medium'>Dimentions</p>

        <div className="d-flex gap-2 flex-column flex-lg-row">

          <InputCrudFloating
            name={"width"}
            label={"width (cm)"}
            {...crudHook}
          />

          <InputCrudFloating
            name={"height"}
            label={"height (cm)"}
            {...crudHook}
          />
          <InputCrudFloating
            name={"depth"}
            label={"depth (cm)"}
            {...crudHook}
          />

        </div>



      </>

    </>
  )
}
export default FormDimentions
