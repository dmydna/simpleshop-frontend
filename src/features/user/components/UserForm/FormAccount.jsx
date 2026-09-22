import InputCrudFloating from "@/features/form/components/InputCrudFloating";


function FormAccount({ children, className, crudHook }) {

  return (
    <div className={className}>
      <p className="fw-medium">
        {children}
      </p>

      <div className="d-flex gap-2 flex-column flex-lg-row">
        <InputCrudFloating
          name={"firstName"}
          label={"Firstname"}
          {...crudHook}
        />
        <InputCrudFloating
          name={"lastName"}
          label={"Lastname"}
          {...crudHook}
        />

      </div>

      <div className="d-flex gap-2 flex-column flex-lg-row">
        <InputCrudFloating
          name={"address"}
          label={"Address"}
          {...crudHook}
        />
  
        <InputCrudFloating
          name={"phone"}
          label={"Phone"}
          {...crudHook}
        />
      </div>

      <div className="d-flex gap-2 flex-column flex-lg-row">
        <InputCrudFloating
          name={"city"}
          label={"City"}
          {...crudHook}
        />

        <InputCrudFloating
          name={"state"}
          label={"State"}
          {...crudHook}
        />

      </div>  

      <InputCrudFloating
        name={"zipCode"}
        label={"Zip code"}
        {...crudHook}
      />

    </div>
  )
}
export default FormAccount;
