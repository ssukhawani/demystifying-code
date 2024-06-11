import React, { useState, useEffect, useRef } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottleScrollDemo = () => {
  const [products, setProducts] = useState([]);
  const [throttledProducts, setThrottledProducts] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [throttledProductCount, setThrottledProductCount] = useState(0);
  const [apiCallCount, setApiCallCount] = useState(0);
  const [throttledApiCallCount, setThrottledApiCallCount] = useState(0);
  const isInitialLoad = useRef(true);

  // Simulate fetching products from an API
  const fetchProducts = (count) => {
    return Array.from({ length: 10 }, (_, i) => `Product ${count + i + 1}`);
  };

  // Function to load more products without throttle
  const loadMoreProducts = () => {
    setApiCallCount((prevCount) => prevCount + 1);
    const newProducts = fetchProducts(productCount);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setProductCount((prevCount) => prevCount + 10);
  };

  // Function to load more products with throttle
  const throttledLoadMoreProducts = useThrottle(() => {
    setThrottledApiCallCount((prevCount) => prevCount + 1);
    const newProducts = fetchProducts(throttledProductCount);
    setThrottledProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setThrottledProductCount((prevCount) => prevCount + 10);
  }, 1000);

  useEffect(() => {
    // Event handler for scrolling to load more products without throttle
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        loadMoreProducts();
      }
    };

    // Event handler for scrolling to load more products with throttle
    const handleThrottledScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        throttledLoadMoreProducts();
      }
    };

    // Add event listeners for scrolling
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleThrottledScroll);

    // Initial load of products
    if (isInitialLoad.current) {
      loadMoreProducts();
      throttledLoadMoreProducts();
      isInitialLoad.current = false;
    }

    // Remove event listeners when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleThrottledScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "100px" }}>
        <div>
          <div className="sticky-header-2">
            <h2>Without Throttle</h2>
            <p>API Call Count: {apiCallCount}</p>
          </div>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="sticky-header-2">
            <h2>With Throttle</h2>
            <p>Throttled API Call Count: {throttledApiCallCount}</p>
          </div>
          <ul>
            {throttledProducts.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThrottleScrollDemo;
