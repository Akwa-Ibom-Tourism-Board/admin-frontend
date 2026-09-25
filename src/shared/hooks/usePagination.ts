import { useEffect, useRef, useState } from "react";
import { DEFAULT_PAGE_SIZE } from "@/shared/lib";

/** Manages `{page, limit}` state for a list page, resetting back to page 1
 * whenever `resetKey` changes (e.g. a serialized string of the active
 * search/filter values) so a new filter never lands on a stale, likely
 * out-of-range page. */
export function usePagination(resetKey?: string, initialLimit = DEFAULT_PAGE_SIZE) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  return { page, limit, setPage, setLimit };
}
