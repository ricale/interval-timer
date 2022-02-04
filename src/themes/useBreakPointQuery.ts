import { Breakpoints } from "@mui/system";

import useMediaQuery from "./useMediaQuery";
import useTheme from "./useTheme";

function useBreakPointQuery(queryGetter: (breakpoints: Breakpoints) => string) {
  const theme = useTheme();
  return useMediaQuery(queryGetter(theme.breakpoints));
}

export default useBreakPointQuery;
