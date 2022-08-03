import "./Cart.css";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { GrClose } from "react-icons/gr";
import { useContext, useEffect } from "react";
import ProductsContext from "../Contexts/ProductsContext";

export default function Cart() {
  //
  //
  // declare context :
  const ContextData = useContext(ProductsContext);
  //
  //
  // close cart :
  const closeCartHandler = () => {
    ContextData.setShowUserCart((prev) => !prev);
  };
  //
  //
  // delete a product from cart :
  const deleteCartProduct = (ID) => {
    const userCartAfterDeleteItem = ContextData.userCart.filter(
      (product) => product.id !== ID
    );
    ContextData.setUserCart(userCartAfterDeleteItem);
  };
  //
  //
  // clear cart :
  const clearCart = () => {
    ContextData.setUserCart([]);
  };
  //
  //
  // cart total price :
  let cartTotalPrice = ContextData.userCart.reduce(
    (prev, current) =>
      prev.price
        ? prev.price * prev.count + current.price * current.count
        : prev + current.price * current.count,
    50
  );
  //
  //
  // add or minus product count :
  const minusProductCount = (ID) => {
    const productIndexForMinusCount = ContextData.userCart.findIndex(
      (product) => product.id === ID
    );
    let copyOfUserCart = [...ContextData.userCart];

    if (copyOfUserCart[productIndexForMinusCount].count <= 0) {
      copyOfUserCart[productIndexForMinusCount].count = 0;
    } else {
      copyOfUserCart[productIndexForMinusCount].count -= 1;
    }
    ContextData.setUserCart(copyOfUserCart);
  };
  const plusProductCount = (ID) => {
    const productIndexForPlusCount = ContextData.userCart.findIndex(
      (product) => product.id === ID
    );
    let copyOfUserCart = [...ContextData.userCart];
    if (
      copyOfUserCart[productIndexForPlusCount].count <
      copyOfUserCart[productIndexForPlusCount].number
    ) {
      copyOfUserCart[productIndexForPlusCount].count += 1;
    } else {
      copyOfUserCart[productIndexForPlusCount].count =
        copyOfUserCart[productIndexForPlusCount].number;
    }

    ContextData.setUserCart(copyOfUserCart);
  };
  //
  //
  // get local storage user cart when app refresh :
  useEffect(() => {
    let localStorageData = JSON.parse(localStorage.getItem("userCart"));
    ContextData.setUserCart(localStorageData);
  }, []);
  //
  //
  // JSX :
  return (
    <div className={`cart ${ContextData.showUserCart ? "show" : ""}`}>
      <div className="cart-wrapper">
        <div className="close-cart" onClick={closeCartHandler}>
          <GrClose />
        </div>

        {ContextData.userCart.length ? (
          <div className="cart-items-table">
            <Table striped hover>
              <thead className="text-center">
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Count</th>
                  <th>Delete item</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {ContextData.userCart.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>$ {product.price}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-dark"
                        style={{ marginRight: 8 }}
                        onClick={() => minusProductCount(product.id)}
                      >
                        -
                      </Button>
                      {product.count}
                      <Button
                        size="sm"
                        variant="outline-dark"
                        style={{ marginLeft: 8 }}
                        onClick={() => plusProductCount(product.id)}
                      >
                        +
                      </Button>
                    </td>

                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteCartProduct(product.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <th>Post cost:</th>
                  <th id="Post-cost" className="text-info">
                    $ 50
                  </th>
                  <td colSpan={3}></td>
                </tr>
                <tr>
                  <td></td>
                  <th>Total price:</th>
                  <th id="total-price" className="text-primary">
                    $ {cartTotalPrice}
                  </th>
                  <td colSpan={3}></td>
                </tr>
              </tbody>
            </Table>
            <div className="manage-cart d-grid gap-2">
              <Button variant="success" size="lg">
                Confirm shopping
              </Button>
              <Button variant="danger" size="lg" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        ) : (
          <div className="cart-is-empty">
            <p className="text-danger text-center">Cart is empty !</p>
          </div>
        )}
      </div>
    </div>
  );
}
