import { Form } from "react-bootstrap";
import payment from "@assets/payment.png";
import InputValidation from "@/features/form/components/InputValidate";

function PaymentForm({ validateForm }) {

    return (
        <div
            className="d-flex justify-content-center align-items-center mt-2"
        //style={{ minHeight: "100vh" }} 
        >
            <Form
                className="p-3 island border"
                style={{ width: "700px", padding: "40px", background: "#fff", borderRadius: "10px" }}
                action="">
                <div className="d-flex flex-wrap gap-3">
                    <div style={{ flex: "1 1 250px" }} className="">
                        <h4 className="mb-4 text-uppercase fw-semibold">Billing Address</h4>
                        <div className="my-3">
                            <InputValidation
                                placeholder="Jhon Doe"
                                name={"fullname"}
                                label={"Full Name:"}
                                {...validateForm} />
                        </div>
                        <div className="my-3">

                            <InputValidation
                                placeholder="example@example.com"
                                type="email"
                                name={"email"}
                                label={"Email:"}
                                {...validateForm} />

                        </div>
                        <div className="my-3">
                            <InputValidation
                                placeholder="Room - Street - Locality"
                                name={"address"}
                                label={"Address:"}
                                {...validateForm} />
                        </div>
                        <div className="my-3">
                            <InputValidation
                                placeholder="Berlin"
                                name={"city"}
                                label={"City:"}
                                {...validateForm} />
                        </div>

                        <div className="d-flex gap-3 mb-3">
                            <div >
                                <InputValidation
                                    placeholder="Germany"
                                    name={"state"}
                                    label={"State:"}
                                    {...validateForm} />
                            </div>
                            <div>
                                <InputValidation
                                    placeholder="123 456"
                                    name={"zipcode"}
                                    label={"Zip Code:"}
                                    {...validateForm} />
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: "1 1 250px" }} className="">
                        <h4 className="mb-4 text-uppercase fw-semibold">Payment</h4>
                        <div className="my-1">
                            <span className="d-block mb-2">Cards Accepted :</span>
                            <img
                                className="mb-0"
                                src={payment}
                                height={38}
                                alt="" />
                        </div>
                        <div className="my-3">
                            <InputValidation
                                placeholder="Mr. Jacob Aiden"
                                name={"cardName"}
                                label={"Name On Card:"}
                                {...validateForm} />
                        </div>
                        <div className="my-3">
                            <InputValidation
                                placeholder="1111 2222 3333 4444"
                                name={"cardNumber"}
                                label={"Credit Card Number:"}
                                {...validateForm} />
                        </div>
                        <div className="my-3">
                            <InputValidation
                                placeholder="August"
                                name={"cardExpMonth"}
                                label={"Exp. Month:"}
                                {...validateForm} />
                        </div>

                        <div className="d-flex gap-3 mb-3">
                            <div className="">
                                <InputValidation
                                    type="number"
                                    placeholder="2020"
                                    name={"cardExpYear"}
                                    label={"Exp. Year:"}
                                    {...validateForm} />
                            </div>
                            <div className="">
                                <InputValidation
                                    type="number"
                                    placeholder="123"
                                    name={"cardCVV"}
                                    label={"CVV:"}
                                    {...validateForm} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Button type="submit" className="btn w-100 small border-0">
               Confirmar Compra
            </Button> */}
            </Form>
        </div>
    )
}

export default PaymentForm;
