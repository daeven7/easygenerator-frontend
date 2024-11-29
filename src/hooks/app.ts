import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { appService } from "../services/app-services";

export const useGetData = (): UseQueryResult<string, unknown> => {
  return useQuery({
    queryKey: ["appdata"],
    queryFn: () => appService.getData(),
  });
};
