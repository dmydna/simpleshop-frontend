import { Form } from "react-bootstrap";
import payment from "@assets/payment.png";
import FloatingInputValidation from "@/features/form/components/FloatingInputValidation";

function PaymentForm({ validateForm }) {
  return (
    <div className="d-flex justify-content-center align-items-center mt-2">
      <Form
        className="p-0"
        style={{
          width: "700px",
          padding: "40px",
          background: "#fff",
          borderRadius: "10px",
        }}
        action=""
      >
        <div className="d-flex flex-wrap gap-3">
          <div style={{ flex: "1 1 250px" }} className="">
            <h4 className="mb-4 fw-semibold">Billing Address</h4>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="Jhon Doe"
                name={"fullname"}
                label={"Full Name:"}
                {...validateForm}
              />
            </div>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="example@example.com"
                type="email"
                name={"email"}
                label={"Email:"}
                {...validateForm}
              />
            </div>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="Room - Street - Locality"
                name={"address"}
                label={"Address:"}
                {...validateForm}
              />
            </div>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="Berlin"
                name={"city"}
                label={"City:"}
                {...validateForm}
              />
            </div>

            <div className="d-flex gap-3">
              <div>
                <FloatingInputValidation
                  placeholder="Germany"
                  name={"state"}
                  label={"State:"}
                  {...validateForm}
                />
              </div>
              <div>
                <FloatingInputValidation
                  placeholder="123 456"
                  name={"zipcode"}
                  label={"Zip Code:"}
                  {...validateForm}
                />
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 250px" }} className="">
            <h4 className="mb-4 fw-semibold">Payment</h4>
            <div className="">
              <span className="small d-block mb-1">Cards Accepted :</span>
              <img className="mb-0" src={payment} height={35} alt="" />
            </div>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="Mr. Jacob Aiden"
                name={"cardName"}
                label={"Name On Card:"}
                {...validateForm}
              />
            </div>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="1111 2222 3333 ****"
                name={"cardNumber"}
                label={"Credit Card Number:"}
                {...validateForm}
              />
            </div>
            <div className="my-3">
              <FloatingInputValidation
                placeholder="August"
                name={"cardExpMonth"}
                label={"Exp. Month:"}
                {...validateForm}
              />
            </div>

            <div className="d-flex gap-3">
              <div className="">
                <FloatingInputValidation
                  type="number"
                  placeholder="2020"
                  name={"cardExpYear"}
                  label={"Exp. Year:"}
                  {...validateForm}
                />
              </div>
              <div className="">
                <FloatingInputValidation
                  type="number"
                  placeholder="123"
                  name={"cardCVV"}
                  label={"CVV:"}
                  {...validateForm}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <Button type="submit" className="btn w-100 small border-0">
               Confirmar Compra
            </Button> */}
      </Form>
    </div>
  );
}

export default PaymentForm;
