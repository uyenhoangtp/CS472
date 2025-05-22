import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductList from "./pages/ProductList.tsx";
import ReviewPage from "./pages/ReviewPage.tsx";
import { ReviewProvider } from "./contexts/ReviewContext.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";
import Navbar from "./components/NavBar"; // Import Navbar

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProductProvider>
      <ReviewProvider>
        <Navbar /> {/* Add Navbar here */}
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id/reviews" element={<ReviewPage />} />
        </Routes>
      </ReviewProvider>
    </ProductProvider>
  </BrowserRouter>
);
