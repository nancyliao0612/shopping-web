import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { Home, Products, SingleProduct, About, Cart, Error } from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<SingleProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

{
  /* <Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route exact path="/about">
    <About />
  </Route>
  <Route exact path="/products">
    <Products />
  </Route>
  <Route exact path="/products/:productId" children={<SingleProduct />}></Route>
  <Route exact path="/cart">
    <Cart />
  </Route>
  <Route exact path="*">
    <Error />
  </Route>
  <Route exact path="/checkout">
    <Checkout />
  </Route>
</Switch>; */
}
