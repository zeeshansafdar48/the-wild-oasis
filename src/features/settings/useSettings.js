import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useSettings() {
  return useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
    onError: (err) => {
      toast.error(err.message);
    }
  });
}
