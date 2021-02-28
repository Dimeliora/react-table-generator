import cn from "classnames";
import PropTypes from "prop-types";

import s from "./Table.module.scss";

const Table = (props) => {
  const { data, classname, sortByColumn, sortDirection, onColumnSort } = props;

  const handleColumnHeadingClick = (heading) => {
    onColumnSort(heading);
  };

  const columnsHeadings = Object.keys(data[0]);

  const tableHeadRow = (
    <tr>
      {columnsHeadings.map((heading) => (
        <th
          key={heading}
          className={cn(s.tableHeading, {
            [s.active]: heading === sortByColumn,
            [s.asc]: heading === sortByColumn && sortDirection === "asc",
          })}
          onClick={() => handleColumnHeadingClick(heading)}
        >
          {heading}
        </th>
      ))}
    </tr>
  );

  const tableDataRows = data.map((entry, entryIdx) => (
    <tr key={entryIdx}>
      {Object.values(entry).map((item, itemIdx) => {
        let itemValue = item;

        if (typeof itemValue === "boolean") {
          itemValue = itemValue ? "yes" : "no";
        }

        if (itemValue === "") {
          itemValue = "n/a";
        }

        return <td key={itemIdx}>{itemValue}</td>;
      })}
    </tr>
  ));

  return (
    <div className={s.root}>
      <table className={cn(s.table, classname)}>
        <thead>{tableHeadRow}</thead>

        <tbody>{tableDataRows}</tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  classname: PropTypes.string,
  sortByColumn: PropTypes.string,
  sortDirection: PropTypes.string,
  onColumnSort: PropTypes.func,
};

Table.defaultProps = {
  classname: "",
  sortByColumn: "",
  sortDirection: "",
  onColumnSort: () => {},
};

export default Table;
