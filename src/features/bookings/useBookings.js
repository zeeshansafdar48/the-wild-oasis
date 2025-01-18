import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const QUERY_PARAM_FILTER_FIELD = "status";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get(QUERY_PARAM_FILTER_FIELD);
  const currentPage = Number(searchParams.get("page")) || 1;

  // 1. FILTERING
  let filterObj;
  if (filterValue && filterValue !== "all") {
    filterObj = {
      filterField: QUERY_PARAM_FILTER_FIELD,
      filterValue: filterValue,
      filterOperation: "eq"
    };
  }

  // 2. PAGINATION

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", filterObj, currentPage],
    queryFn: () => getBookings(filterObj, currentPage)
  });

  return { isLoading, bookings, count };
}
