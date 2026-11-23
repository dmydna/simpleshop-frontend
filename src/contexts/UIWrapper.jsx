import LoginModalParam from "@/features/auth/components/LoginModalParam";
import RegisterModalParam from "@/features/auth/components/RegisterModalParam";
import ContactModalParam from "@/features/contact/components/ContactModalParam";

export default function UIWrapper({children}) {

  return (
    <>
      {children}
      <LoginModalParam />
      <RegisterModalParam />
      <ContactModalParam />
    </>
  );
}