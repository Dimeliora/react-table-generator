export const createPaginate = (total, current) => {
	const pageNums = [];

	if (total > 10) {
		if (current > 4) {
			for (let i = current - 3; i <= current + 5; i += 1) {
				pageNums.push(i);
				if (i === total) break;
			}
		} else {
			for (let i = 1; i <= 10; i += 1) {
				pageNums.push(i);
			}
		}
	} else {
		for (let i = 1; i <= total; i += 1) {
			pageNums.push(i);
		}
	}

	return pageNums;
};
