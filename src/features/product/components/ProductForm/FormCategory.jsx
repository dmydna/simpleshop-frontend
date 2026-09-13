import InputCrudFloating from "@/features/form/components/InputCrudFloating";
import { category } from "@/utils/enums";
import { Form } from "react-bootstrap";


function FormCategory({ children, className, crudHook }) {

    const {register, isFieldDisabled} = crudHook;
    const isDisabled = isFieldDisabled("category");

    return (
        <>
            {/* Producto.Category */}

            <div className="mb-4">

                <p className="fw-medium"> Category </p>


               {!isDisabled && (
                <Form.Select {...register("category")}  className="p-3" name="category" >
                    <option value="">Selecciona una opción</option>
                    <option value={category.GROCERIES}>groceries</option>
                    <option value={category.FURNITURE}>furnitures</option>
                    <option value={category.BEAUTY}>beauty</option>
                    <option value={category.FRAGRANCE}>fagrances</option>
                </Form.Select>
               )}
               {isDisabled && (
                <InputCrudFloating
                    name={"category"}
                    label={"Category"}
                    {...crudHook}
                />)}
            </div>

        </>
    )
}
export default FormCategory
