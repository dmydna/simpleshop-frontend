import InputCrudFloating from "@/features/form/components/InputCrudFloating.jsx";

function FormSku({children, className, baseHook}){


    return (
      <div className={className}>

        <p className="fw-medium">{children}</p>

          <InputCrudFloating
            name={"sku"}
            label={"Sku"}
            {...baseHook}
            showEditButton={false}
          />

      </div>
    )
}


export default FormSku;