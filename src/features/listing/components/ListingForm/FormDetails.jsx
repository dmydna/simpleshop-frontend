import InputCrudFloating from "@/features/form/components/InputCrudFloating.jsx";

function FormDetails({children, className="", baseHook}){

    // const {dataItem, handleChange, crudMode,
    // isDisabledField, editableFields, handleEnableEdit} = useListingCrudContext();

    return (
      <div className={className}>
            {/* Detalles */}

        <p className="fw-medium">{children}</p>

        <div className="d-flex gap-2 flex-column flex-lg-row">
          <InputCrudFloating
            name={"warrantyInformation"}
            label={"Waranty"}
            {...baseHook}
          />

          <InputCrudFloating
            name={"shippingInformation"}
            label={"Shipping"}
            {...baseHook}
          />

        </div>
      </div>
    )
}


export default FormDetails;