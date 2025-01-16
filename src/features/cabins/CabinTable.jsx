// import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins = [] } = useCabins();
  const [searchParams] = useSearchParams();

  const discountfilterValue = searchParams.get("discount") || "all";
  const sortByfilterValue = searchParams.get("sortBy") || "name-asc";

  let filteredCabins;

  if (discountfilterValue === "all") filteredCabins = cabins;
  if (discountfilterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (discountfilterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  let sortedCabins = [...filteredCabins];

  const [field, direction] = sortByfilterValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabins = sortedCabins.sort((a, b) => a[field] - b[field] * modifier);

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Actions</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin?.id} />}
        />
      </Table>
    </Menus>
  );
}
export default CabinTable;
