import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail()  {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <img src={product.thumbnail} alt={product.title} />
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <h3>Price: ${product.price}</h3>
    </div>
  );
};

export default ProductDetail;
