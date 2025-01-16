import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            label: "All",
            value: "all"
          },
          {
            label: "With Discount",
            value: "with-discount"
          },
          {
            label: "No Discount",
            value: "no-discount"
          }
        ]}
      />

      <SortBy
        filterField="sortBy"
        options={[
          {
            label: "Name (A-Z)",
            value: "name-asc"
          },
          {
            label: "Name (Z-A)",
            value: "name-desc"
          },
          {
            label: "Capacity (low to high)",
            value: "maxCapacity-asc"
          },
          {
            label: "Capacity (high to low)",
            value: "maxCapacity-desc"
          },
          {
            label: "Price (low to high)",
            value: "regularPrice-asc"
          },
          {
            label: "Price (high to low)",
            value: "regularPrice-desc"
          }
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
