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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [selectedCategory, location.search, setSelectedCategory]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("category", categoryName);
    navigate({ search: queryParams.toString() });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center overflow-hidden max-w-[1200px] mx-auto">
        {categoryData.map((category) => (
          <div
            key={category.name}
            className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          >
            <Catagory
              name={category.name}
              logo={category.logo}
              isActive={selectedCategory === category.name}
              onClick={() => handleCategoryClick(category.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Categories.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Categories;
