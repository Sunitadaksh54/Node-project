import React, { useState } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import ProductItem from "./ProductItem";
import "../styles/ProductList.css";

function ProductList () {
  const { products, loading, error } = useFetchProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="products">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="product-list">
      {filteredProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      </div>
    </div>
  );
};

export default ProductList;
