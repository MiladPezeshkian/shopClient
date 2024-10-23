import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Catagory from "./Catagory";

const categoryData = [
  { name: "Men's Clothing", logo: "../../imgs/catagorys/manClothing.png" },
  { name: "Women's Clothing", logo: "../../imgs/catagorys/womenClothing.png" },
  { name: "Jewelery", logo: "../../imgs/catagorys/jewlery.png" },
  { name: "Electronics", logo: "../../imgs/catagorys/computer.png" },
];

function Categories({ selectedCategory, setSelectedCategory }) {
  const navigate = useNavigate();
  const location = useLocation();

  // استخراج پارامترهای URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");

    // اگر دسته‌ای در URL وجود داشت، آن را انتخاب کن
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
    // در اینجا فقط selectedCategory و location.search به لیست وابستگی‌ها اضافه می‌شوند
  }, [selectedCategory, location.search, setSelectedCategory]);

  // تغییر URL هنگام انتخاب دسته
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);

    // تغییر URL با اضافه کردن پارامتر category
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("category", categoryName);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center mt-6 items-center mx-auto max-w-[1200px] px-4">
      {categoryData.map((category) => (
        <Catagory
          key={category.name}
          name={category.name}
          logo={category.logo}
          isActive={selectedCategory === category.name}
          onClick={() => handleCategoryClick(category.name)}
        />
      ))}
    </div>
  );
}

Categories.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Categories;
