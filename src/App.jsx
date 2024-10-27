import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext"; // مطمئن شوید مسیر درست است
import { CartWishlistProvider } from "./context/CartWishlistContext.jsx";
import { UserInfoProvider } from "./context/UserInfoContext.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";

const Home = lazy(() => import("./pages/Home/Home"));
const CartList = lazy(() => import("./pages/CartList.jsx"));
const About = lazy(() => import("./pages/About/About"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/login/Login.jsx"));
const WishList = lazy(() => import("./pages/WishList"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const SingleProduct = lazy(() => import("./pages/SingleProduct.jsx"));
const Profile = lazy(() => import("./pages/Profiles/Profile.jsx"));
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const SuccessOrder = lazy(() => import("./pages/SuccessOrder.jsx"));

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <AuthProvider>
          <CartWishlistProvider>
            <UserInfoProvider>
              <Suspense fallback={<Spinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signup" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/wishlist" element={<WishList />} />
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/cart" element={<CartList />} />
                  <Route path="/product/:id" element={<SingleProduct />} />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute
                        component={Profile}
                        NavigateTo="login"
                        Message="PLease Login First"
                      />
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute
                        component={Checkout}
                        NavigateTo="login"
                        Message="PLease Login First"
                      />
                    }
                  />
                  <Route
                    path="/successOrder"
                    element={
                      <ProtectedRoute
                        component={SuccessOrder}
                        NavigateTo="login"
                        Message="PLease Login First"
                      />
                    }
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Suspense>
            </UserInfoProvider>
          </CartWishlistProvider>
        </AuthProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
