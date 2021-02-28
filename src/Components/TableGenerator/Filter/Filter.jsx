import { memo, useState } from "react";
import PropTypes from "prop-types";

import s from "./Filter.module.scss";

const Filter = ({ onFilterChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value);
    onFilterChange(value);
  };

  return (
    <div className={s.filter}>
      <div className={s.filterTitle}>Search items:</div>
      <input
        type="text"
        value={inputValue}
        className={s.filterInput}
        placeholder="Type something..."
        onChange={handleInputChange}
      />
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
};

Filter.defaultProps = {
  onFilterChange: () => {},
};

export default memo(Filter);
