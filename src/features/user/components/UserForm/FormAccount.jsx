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
            label={"FirstName"}
            {...crudHook}
          />
          <InputCrudFloating
            name={"lastName"}
            label={"LastName"}
            {...crudHook}
          />

        </div>

        <InputCrudFloating
          name={"address"}
          label={"address"}
          {...crudHook}
        />

        <InputCrudFloating
          name={"phone"}
          label={"phone"}
          {...crudHook}
        />


    </div>
  )
}
export default FormAccount;
