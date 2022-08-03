import "./Product.css";
import { useContext } from "react";
import ProductsContext from "../Contexts/ProductsContext";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ProductItemsInFilter from "./ProductItemsInFilter";
import ProductItemsInSearch from "./ProductItemsInSearch";

export default function Product() {
  // declare context :
  const ContextData = useContext(ProductsContext);

  // categories :
  const categories = [
    "All",
    ...ContextData.allProducts.map((product) => product.category),
  ];

  // filter products :
  const filterProducts = (category) => {
    ContextData.setSearchedProducts([]);
    if (category === "All") {
      ContextData.setFilteredProducts(ContextData.allProducts);
    } else {
      let userFilteredProducts = ContextData.allProducts.filter(
        (product) => product.category === category
      );
      ContextData.setFilteredProducts(userFilteredProducts);
    }
  };

  return (
    <Container>
      <div className="filtering mt-5">
        <p style={{ fontSize: 20, fontWeight: "500" }}>Categories :</p>
        <Form.Select
          onChange={(e) => {
            filterProducts(e.target.value);
          }}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </Form.Select>
      </div>
      <div className="products">
        <div className="products-wrapper">
          {ContextData.searchedProducts.length ? (
            <ProductItemsInSearch />
          ) : (
            ContextData.filteredProducts.map((product) => (
              <ProductItemsInFilter key={product.category} {...product} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
}
