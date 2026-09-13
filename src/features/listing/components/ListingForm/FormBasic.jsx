import InputCrudFloating from "@/features/form/components/InputCrudFloating.jsx";


function FormBasic({ children, className, baseHook }) {


    return (
        <div className={className}>

            <p className="fw-medium">{children}</p>

            <InputCrudFloating
                name={"title"}
                label={"Title"}
                {...baseHook}
            />

            <div className="my-1 d-flex gap-2 flex-column flex-lg-row">
                
                <InputCrudFloating
                  name={"stock"}
                  label={"stock"}
                  {...baseHook}
                />

                <InputCrudFloating
                    name={"price"}
                    type={"number"}
                    label={"Price"}
                    {...baseHook}
                />

                <InputCrudFloating
                    name={"discountPercentage"}
                    type={"number"}
                    label={"Discount Percentage"}
                    {...baseHook}
                />



            </div>

            <InputCrudFloating
                name={"description"}
                label={"Description"}
                as={"textarea"}
                {...baseHook}
            />


        </div>
    )
}
export default FormBasic
