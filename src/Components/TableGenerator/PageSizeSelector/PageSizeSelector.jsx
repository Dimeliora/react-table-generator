import { memo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import s from "./PageSizeSelector.module.scss";

const PageSizeSelector = (props) => {
  const { pageSizes, currentPageSize, disabled, onPageSizeSelect } = props;

  const handleRadioChange = ({ target: { value } }) => {
    onPageSizeSelect(Number(value));
  };

  return (
    <div className={s.pageSizeSelector}>
      <div className={s.pageSizeSelectorTitle}>Show items per page:</div>
      <div className={s.pageSizeSelectorRadios}>
        {pageSizes.map((size) => (
          <div
            key={size}
            className={cn(s.pageSizeSelectorItem, {
              [s.active]: !disabled && size === currentPageSize,
              [s.disabled]: disabled,
            })}
          >
            <input
              type="radio"
              id={`page-size-${size}`}
              name="page-size"
              value={size}
              disabled={disabled}
              onChange={handleRadioChange}
            />
            <label htmlFor={`page-size-${size}`}>
              <span>{size}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

PageSizeSelector.propTypes = {
  pageSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentPageSize: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onPageSizeSelect: PropTypes.func,
};

PageSizeSelector.defaultProps = {
  disabled: false,
  onPageSizeSelect: () => {},
};

export default memo(PageSizeSelector);
