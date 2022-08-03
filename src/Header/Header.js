import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingBag } from "react-icons/fa";
import { useContext, useRef } from "react";
import ProductsContext from "../Contexts/ProductsContext";
import "./Header.css";

function Header() {
  //
  // declare context :
  const ContextData = useContext(ProductsContext);
  //
  // show cart :
  const showUserCartHandler = () => {
    ContextData.setShowUserCart((prev) => !prev);
  };
  //
  //
  // error search text element :
  const errorSearchText = useRef();
  //
  //
  //
  // search products :
  const searchProductHandler = (text) => {
    // get products infos :
    if (text.trim()) {
      let productsInfoArrays = ContextData.allProducts.map(
        (product) => product.info
      );

      // transfer all products info to one array :
      const productsInfo = productsInfoArrays.reduce((prev, curr) => {
        if (prev) {
          return prev.concat(curr);
        } else {
          return curr;
        }
      });

      let userSearchedProducts = productsInfo.filter((product) =>
        product.title.toLowerCase().includes(text.trim().toLowerCase())
      );
      if (userSearchedProducts.length) {
        ContextData.setSearchedProducts(userSearchedProducts);
        errorSearchText.current.innerText = `${userSearchedProducts.length} products found`;
        errorSearchText.current.classList.add("found");
      } else {
        errorSearchText.current.innerText = "Product not found !";
        ContextData.setSearchedProducts([]);
        errorSearchText.current.classList.remove("found");
      }
    } else {
      errorSearchText.current.innerText = "Please enter product name !";
      ContextData.setSearchedProducts([]);
      errorSearchText.current.classList.remove("found");
    }
  };
  //
  //
  // JSX :
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#" style={{ color: "#e340af" }}>
          <h1 style={{ fontSize: 30 }}> NASIM SHOP</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">
              <Button variant="outline-primary" onClick={showUserCartHandler}>
                <span>Cart</span>
                <span className="cart-icon">
                  <FaShoppingBag />
                </span>
              </Button>
            </Nav.Link>
          </Nav>
          <div
            ref={errorSearchText}
            className="error-search-text px-2 py-3"
          ></div>
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search Products . . ."
              className="me-2"
              aria-label="Search"
              value={ContextData.searchedProductTitle}
              onChange={(e) => {
                ContextData.setSearchedProductTitle(e.target.value);
              }}
            />
            <Button
              variant="outline-primary"
              type="submit"
              onClick={() =>
                searchProductHandler(ContextData.searchedProductTitle)
              }
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
