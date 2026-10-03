import InputCrudFloating from "@/features/form/components/InputCrudFloating";

import FormRole from "@features/user/components/UserForm/FormRole";

export default function FormBasic({ children, className, crudHook }) {

  return (
    <div className={className}>

      <p className="fw-medium">
        {children}
      </p>

      <div className="">

        <div className="flex-fill d-flex flex-column flex-lg-row">
            
          <InputCrudFloating
            name={"username"}
            label={"Username"}
            {...crudHook}
            showEditButton={false}
          />

          <div className="ms-0 ms-md-2 w-100">
            <InputCrudFloating
              name={"email"}
              label={"Email"}
              {...crudHook}
            />
          </div>

        </div>

        <div className="flex-fill d-flex flex-column flex-lg-row">

          <div className="w-100 position-relative">
            <FormRole crudHook={crudHook} />
          </div>

          <div className="ms-0 ms-md-2 w-100">
            <InputCrudFloating
              name={"id"}
              label={"id"}
              {...crudHook}
              showEditButton={false}
            />
          </div>

        </div>

      </div>
    </div>  
  )
}
