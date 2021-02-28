import { memo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

import { createPaginate } from "./createPaginate";

import s from "./Pagination.module.scss";

const Pagination = ({ totalPages, currentPage, onPageSelect }) => {
	const pageNums = createPaginate(totalPages, currentPage);

	const handlePageSelect = (page) => {
		onPageSelect(page);
	};

	return (
		<div className={s.pagination}>
			<div
				className={cn(s.paginationItem, { [s.disabled]: currentPage === 0 })}
				onClick={() => handlePageSelect(0)}
			>
				&#171;
			</div>

			{pageNums.map((page) => (
				<div
					key={page}
					className={cn(s.paginationItem, {
						[s.active]: page === currentPage + 1,
					})}
					onClick={() => handlePageSelect(page - 1)}
				>
					{page}
				</div>
			))}

			<div
				className={cn(s.paginationItem, {
					[s.disabled]: currentPage === totalPages - 1,
				})}
				onClick={() => handlePageSelect(totalPages - 1)}
			>
				&#187;
			</div>
		</div>
	);
};

Pagination.propTypes = {
	totalPages: PropTypes.number.isRequired,
	currentPage: PropTypes.number,
	onPageSelect: PropTypes.func,
};

Pagination.defaultProps = {
	currentPage: 0,
	onPageSelect: () => {},
};

export default memo(Pagination);
