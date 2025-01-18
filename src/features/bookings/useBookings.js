import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const QUERY_PARAM_FILTER_FIELD = "status";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get(QUERY_PARAM_FILTER_FIELD);

  // 1. FILTERING
  let filterObj;
  if (filterValue && filterValue !== "all") {
    filterObj = {
      filterField: QUERY_PARAM_FILTER_FIELD,
      filterValue: filterValue,
      filterOperation: "eq"
    };
  }

  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", filterObj],
    queryFn: () => getBookings(filterObj)
  });

  return { isLoading, bookings };
}
