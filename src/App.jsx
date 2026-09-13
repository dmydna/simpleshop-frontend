import "@/styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


import ProtectedRoute from "@common/ProtectedRoute";
import { ProviderWrapper } from "@contexts/ProviderWrapper";
import Footer from "@layout/Footer.jsx";
import Navbar from "@layout/Navbar.jsx";
import { ToastContainer } from "react-toastify";


import Cart from "@/features/cart/pages/Cart.jsx";
import Contact from "@/features/contact/pages/Contact";
import HomePage from "@/features/home/pages/HomePage";
import Products from "@/features/listing/pages/CatalogePage";
import ListingDetailPage from "@/features/listing/pages/ListingDetailPage";

import ChangePassword from "@/features/auth/pages/ChangePassword";
import CompleteRegister from "@/features/auth/pages/CompleteRegister";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register.jsx";


import Page404NotFound from "@/features/fallback/pages/Page404NotFound.jsx";

import ProfileLayout from "@/features/profile/layout/ProfileLayout";
import MyAccount from "@/features/profile/pages/MyAccount";
import MyActivity from "@/features/profile/pages/MyActivity";
import MyFavorites from "@/features/profile/pages/MyFavorites";
import MyPhotoProfile from "@/features/profile/pages/MyPhotoProfile";
import MyProfile from "@/features/profile/pages/MyProfile";
import MyPurchases from "@/features/profile/pages/MyPurchases";
import WelcomePerfil from "@/features/profile/pages/WelcomeProfile";

import { ProfileProvider } from "@features/profile/contexts/ProfileContext.jsx";
import { UserProvider } from "@features/user/contexts/UserContext.jsx";

import Dockbar from "@/components/layout/Dockbar";
import DemoUploader from "@/dev/components/DemoUploader";
import DashboardLayout from "@/features/admin/components/layout/DashboardLayout";
import WelcomeDashboard from "@/features/admin/pages/WelcomeDashboard";

import PaymentForm from "@/features/checkout/components/CheckoutForm.jsx";
import ListingListPage from "@/features/listing/pages/ListingListPage";

import ChangeMail from "@/features/auth/pages/ChangeMail";
import OrderDetailPage from "@/features/order/pages/OrderDetailPage";
import CatalogeLayout from "@components/layout/CatalogeLayout";
import PageWip from "@features/fallback/pages/PageWip";

import CheckoutPage from "@/features/checkout/pages/CheckoutPage";
import ListingLayout from "@/features/listing/layout/ListingLayout";
import ListingFormPage from "@/features/listing/pages/ListingFormPage";
import ProductLayout from "@/features/product/layout/ProductLayout";
import ProductFormPage from "@/features/product/pages/ProductFormPage";
import ProductListPage from "@/features/product/pages/ProductListPage";
import UserLayout from "@/features/user/layout/UserLayout";
import UserFormPage from "@/features/user/page/UserFormPage";
import UserListPage from "@/features/user/page/UserListPage";


// DONE: update listing

function App() {

  const navItems = ["Home", "Products", "Contact"];
  const [seccion, setSeccion] = useState("Home");

  const navFix = 'pt-4';

  return (

    <ProviderWrapper>

      <div id="content" className="d-flex flex-column min-vh-100 pt-4 mt-4">

        <Navbar items={navItems} onSeleccion={setSeccion} />

        <main className={`flex-grow-1 p-3 px-0 ${navFix}`}>

          <Dockbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/change-email" element={<ChangeMail />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/order/:hash"  element={
            <ProtectedRoute>
              <OrderDetailPage />
            </ProtectedRoute>  
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/complete-registration" element={
              <ProfileProvider>
                <CompleteRegister />
              </ProfileProvider>
            }></Route>
            <Route path="/test/uploader" element={<DemoUploader />} />
            <Route path="/faqs" element={<PageWip />} />
            
            <Route path="/p/:hash" element={<ListingDetailPage />} />

            <Route path="/products" element={<CatalogeLayout />}>
              <Route index element={<Products />} />
              <Route path="category/:category" element={<Products />} />
              <Route path=":filter" element={<Products />} />
              <Route path="search/:product" element={<Products />} />
              <Route path=":hash/:name" element={<ListingDetailPage />} />
            </Route>

            <Route path="/user" element={
              <ProtectedRoute>
                <UserProvider>
                  <ProfileProvider>
                    <ProfileLayout />
                  </ProfileProvider>
                </UserProvider>
              </ProtectedRoute>
            }>
              <Route index element={<WelcomePerfil />} />
              <Route path="account" element={<MyAccount />} />
              <Route path="profile" element={<MyProfile />} />
              <Route path="favorites" element={<MyFavorites />} />
              <Route path="photo" element={<MyPhotoProfile />} />
              <Route path="activity" element={<MyActivity />} />
              <Route path="purchases" element={<MyPurchases />} />
            </Route>
            <Route path="/admin">
                
              <Route index element={
                <DashboardLayout>
                  <WelcomeDashboard />
                </DashboardLayout>
              } />


              <Route path="dashboard" element={
                <DashboardLayout>
                  <WelcomeDashboard />
                </DashboardLayout>
              } />

              <Route path="dev" element={<DemoUploader />} />

              {/* LISTING  */}
              <Route path="listing-form" element={
                <ListingLayout>
                  <ListingFormPage />
                </ListingLayout>
              } />

              <Route path="listing-list" element={
                <ListingLayout>
                  <ListingListPage />
                </ListingLayout>

              } />


              {/* PRODUCT  */}
              <Route path="product-form" element={
                <ProductLayout>
                  <ProductFormPage />
                </ProductLayout>
              } />
              <Route path="product-list" element={
                <ProductLayout>
                  <ProductListPage />
                </ProductLayout>
              } />

              {/* USER  */}
              <Route path="user-form" element={
                <UserLayout>
                  <UserFormPage />
                </UserLayout>

              } />
              <Route path="user-list" element={
                <UserLayout >
                  <UserListPage />
                </UserLayout>

              } />

            </Route>




            <Route path="/cart" element={
              <ProtectedRoute>
                <ProfileProvider>
                  <Cart />
                </ProfileProvider>
              </ProtectedRoute>
            }>
              <Route index element={<Cart />} />
              <Route path=":buy" element={<PaymentForm />} />
            </Route>


            <Route path="/checkouts/:orderId" element={
              <ProtectedRoute> 
                <ProfileProvider>
                  <CheckoutPage />
                </ProfileProvider>
              </ProtectedRoute>
            } />

            
            {/** -- PAGE 404 -- */}
            <Route path="*" element={<Page404NotFound />} />

          </Routes>
          <ToastContainer 
            hideProgressBar={true} 
            autoClose={1000} 
            position="bottom-left"
            limit={3} 
          />

        </main>
        <Footer />
      </div>
    </ProviderWrapper>

  );
}

export default App;
