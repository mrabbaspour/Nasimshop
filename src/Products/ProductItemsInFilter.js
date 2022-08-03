import { useContext, useEffect, useRef } from "react";
import ProductsContext from "../Contexts/ProductsContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";

export default function ProductItemsInFilter({ info }) {
  //
  //
  // declare context :
  const ContextData = useContext(ProductsContext);
  //
  //
  // show Modal :
  const handleCloseModal = () => ContextData.setShowModal(false);
  const handleShowModal = (ID) => {
    ContextData.setShowModal(true);
    ContextData.setSelectedProduct(info.find((product) => product.id === ID));
  };
  //
  //
  // add product to cart :
  const addProductToCart = (ID) => {
    // the product you want to add :
    let addedProduct = info.find((product) => product.id === ID);
    // is product in cart before? :
    let isProductInCart = ContextData.userCart.some(
      (product) => product.id === ID
    );
    //  if product was exited in store (number > 0) :
    if (addedProduct.number > 0) {
      // if product is not in cart before :
      if (!isProductInCart) {
        let addedProductObj = {
          id: addedProduct.id,
          title: addedProduct.title,
          price: addedProduct.price,
          number: addedProduct.number,
          count: 1,
        };
        // update user cart :
        ContextData.setUserCart((prev) => [...prev, addedProductObj]);
      } else {
        // if product is in cart before , we just add product count :
        let copyOfUserCart = [...ContextData.userCart];
        copyOfUserCart.some((product) => {
          if (product.id === ID) {
            product.count += 1;
            return true;
          }
        });
        // update user cart :
        ContextData.setUserCart(copyOfUserCart);
      }
    }
  };
  //
  //
  // save user cart in local :
  const isInitialMount = useRef(false);
  useEffect(() => {
    if (isInitialMount.current) {
      localStorage.setItem("userCart", JSON.stringify(ContextData.userCart));
    } else {
      isInitialMount.current = true;
    }
  }, [ContextData.userCart]);
  //
  //
  // JSX :
  return (
    <div className="product-items">
      <Row className="justify-content-center" sm={12} md={6} lg={3}>
        {info.map((productItem) => (
          <Card
            style={{ width: "18rem" }}
            key={productItem.id}
            className="text-center"
          >
            <Card.Img
              variant="top"
              className="card-img"
              src={productItem.img}
            />
            <Card.Body>
              <Card.Title>{productItem.title.toUpperCase()}</Card.Title>
              <Card.Title className="m-5" style={{ color: "#f0053c" }}>
                $ {productItem.price}
              </Card.Title>
              <div>
                <Button
                  variant="dark"
                  onClick={() => handleShowModal(productItem.id)}
                >
                  More ...
                </Button>
                <br />
                <br />
                <Button
                  variant="primary"
                  onClick={() => {
                    addProductToCart(productItem.id);
                    productItem.number
                      ? ContextData.setShowSuccessToast(true)
                      : ContextData.setShowWarningToast(true);
                  }}
                >
                  ADD TO CART
                </Button>
              </div>
            </Card.Body>
            <Card.Footer>
              <span>Number : {productItem.number}</span>
            </Card.Footer>
          </Card>
        ))}
      </Row>
      {/* Modal */}
      <Modal show={ContextData.showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>{ContextData.selectedProduct.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-5">
            <img
              src={ContextData.selectedProduct.img}
              alt="modalImg"
              className="w-50"
            />
          </div>
          <p>{ContextData.selectedProduct.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Toast */}
      <div className="toast-wrapper">
        <Toast
          onClose={() => ContextData.setShowSuccessToast(false)}
          show={ContextData.showSuccessToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto text-dark">NASIM SHOP</strong>
          </Toast.Header>
          <Toast.Body className="text-white" style={{ fontSize: 18 }}>
            Product added to your cart succesfully .
          </Toast.Body>
        </Toast>

        {/* Warning Toast */}
        <Toast
          onClose={() => ContextData.setShowWarningToast(false)}
          show={ContextData.showWarningToast}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto text-dark">NASIM SHOP</strong>
          </Toast.Header>
          <Toast.Body className="text-white" style={{ fontSize: 18 }}>
            Not enough Product !
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
