import InputCrudFloating from "@/features/form/components/InputCrudFloating";
import { role } from "@/utils/enums";
import { Form } from "react-bootstrap";


function FormRole({ children, className, crudHook }) {

    const {register, isFieldDisabled} = crudHook;
    const isDisabled = isFieldDisabled("role");

    return (
        <>
            {/* User.ROLE */}

            <div className="mb-4">

                {/* <p className="fw-medium"> Role: </p> */}


               {!isDisabled && (
                <Form.Select {...register("role")}  className="p-3" name="role" >
                    <option value="">Selecciona una opción</option>
                    <option value={role.CLIENT}>{role.CLIENT}</option>
                    <option value={role.ADMIN}>{role.ADMIN}</option>
                </Form.Select>
               )}
               {isDisabled && (
                <InputCrudFloating
                    name={"role"}
                    label={"Role"}
                    {...crudHook}
                />)}
            </div>

        </>
    )
}
export default FormRole
