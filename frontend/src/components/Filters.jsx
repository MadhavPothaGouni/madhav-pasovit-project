import "./Filters.css";

export default function Filters({ onFilter }) {
  return (
    <div className="filters-container">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          placeholder="Search products..."
          onChange={(e) => onFilter({ search: e.target.value })}
        />
      </div>

      <select
        className="select-box"
        onChange={(e) => onFilter({ category: e.target.value })}
      >
        <option value="">All</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
        <option value="Accessories">Accessories</option>
      </select>
    </div>
  );
}
