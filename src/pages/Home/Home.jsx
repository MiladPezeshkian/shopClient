// Home.js
import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
import Tittle from "../../components/Tittle";
import Products from "../../components/Products";
import Categories from "../../components/Categories";
import FilteredProducts from "../../components/FilteredProducts";
import Services from "../../components/Services";
import { useProducts } from "../../hook/useProducts"; // وارد کردن هوک
import { useEffect, useState } from "react";

function Home() {
  const { allProducts, isLoading } = useProducts(); // استفاده از هوک برای دریافت محصولات
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Jewelery");

  useEffect(() => {
    setProducts(allProducts.slice(allProducts.length - 5, allProducts.length)); // گرفتن ۵ محصول اول برای اسلایدر
  }, [allProducts]);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      {" "}
      {/* اضافه کردن overflow-x-hidden برای کل صفحه */}
      <header className="overflow-x-hidden">
        {" "}
        {/* اضافه کردن overflow-x-hidden به header */}
        <NavLink />
        <ProductSlider products={products} isLoading={isLoading} />
      </header>
      <main className="overflow-x-hidden">
        {" "}
        {/* اضافه کردن overflow-x-hidden به main */}
        <div className="container mx-auto px-4">
          <Tittle name="Our Products" />
          <Products products={allProducts} />
          <Tittle name="Filter By Categories" />
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <FilteredProducts
            products={allProducts}
            selectedCategory={selectedCategory}
          />
        </div>
        <Tittle name="Services" />
        <Services />
      </main>
      <footer className="overflow-x-hidden">
        {" "}
        {/* اضافه کردن overflow-x-hidden به footer */}
        <Footer />
      </footer>
    </div>
  );
}

export default Home;
