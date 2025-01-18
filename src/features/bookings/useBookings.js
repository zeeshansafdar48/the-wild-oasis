import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

const QUERY_PARAM_FILTER_FIELD = "status";

export function useBookings() {
  const queryClient = useQueryClient();
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

  const totalPages = Math.ceil(count / PAGE_SIZE);
  // 3. PREFETCHING (Next Page)
  if (currentPage < totalPages)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, currentPage + 1],
      queryFn: () => getBookings(filterObj, currentPage + 1)
    });

  // 3. PREFETCHING (Prev Page)
  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, currentPage - 1],
      queryFn: () => getBookings(filterObj, currentPage - 1)
    });

  return { isLoading, bookings, count };
}
