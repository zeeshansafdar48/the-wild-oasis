import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredValue="discount"
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
    </TableOperations>
  );
}

export default CabinTableOperations;
