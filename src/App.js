import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Product from "./Products/Product";
import Cart from "./Cart/Cart";
import ProductsContext from "./Contexts/ProductsContext";
import ProductsData from "./Products/ProductData";
import { useState } from "react";

function App() {
  //
  // all states :
  const [allProducts, setAllProducts] = useState(ProductsData);
  const [filteredProducts, setFilteredProducts] = useState(ProductsData);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showWarningToast, setShowWarningToast] = useState(false);
  const [searchedProductTitle, setSearchedProductTitle] = useState("");
  const [userCart, setUserCart] = useState([]);
  const [showUserCart, setShowUserCart] = useState(false);

  //
  //
  // JSX :
  return (
    <>
      <ProductsContext.Provider
        // send states :
        value={{
          allProducts,
          setAllProducts,
          filteredProducts,
          setFilteredProducts,
          searchedProducts,
          setSearchedProducts,
          showModal,
          setShowModal,
          showSuccessToast,
          setShowSuccessToast,
          showWarningToast,
          setShowWarningToast,
          searchedProductTitle,
          setSearchedProductTitle,
          selectedProduct,
          setSelectedProduct,
          userCart,
          setUserCart,
          showUserCart,
          setShowUserCart,
        }}
      >
        <header>
          <Header />
          <Cart />
        </header>
        <main>
          <div className="top">
            <Banner />
          </div>
          <div className="bottom">
            <Product />
          </div>
        </main>
      </ProductsContext.Provider>
    </>
  );
}

export default App;
