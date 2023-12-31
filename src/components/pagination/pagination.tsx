import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { createMemo, For, Show } from "solid-js";

import { css } from "../../utils/css";
import { useConfiguration } from "../context/configurationProvider";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import type { PaginationComponent } from "./pagination.types";
import { calculateStart } from "./pagination.utils";

const Pagination: PaginationComponent = (props) => {
  const [config] = useConfiguration();

  const defaultButtonClasses = [
    "px-2",
    "py-1",
    "text-center",
    "border-t",
    "border-b",
    "border-sky-900",
    "text-slate-300",
  ];

  const totalPages = createMemo(() => Math.ceil(props.total / config.pageSize));

  const pages = createMemo(() => {
    const total = totalPages();
    const maxPages = props.maxPages || 5;

    const length = total > maxPages ? maxPages : total;
    const start = calculateStart(props.currentPage, total, maxPages);

    return Array.from({ length }, (_, i) => start + i);
  });

  return (
    <Show when={totalPages() > 1}>
      <nav class="mb-3 sticky top-24 z-10">
        <ol class="flex justify-center" aria-label="Pagination">
          <li>
            <button
              aria-label={"Go back to first page (1)"}
              class={css(
                defaultButtonClasses,
                "bg-slate-800",
                "border-l",
                "rounded-l",
              )}
              disabled={props.currentPage <= 1}
              onClick={() => props.onPageSelected(1)}
              type="button"
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
          </li>
          <li>
            <button
              aria-label={`Go back to previous page (${props.currentPage - 1})`}
              class={css(defaultButtonClasses, "bg-slate-800")}
              disabled={props.currentPage <= 1}
              onClick={() => props.onPageSelected(props.currentPage - 1)}
              type="button"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
          </li>
          <For each={pages()}>
            {(page) => (
              <li>
                <button
                  aria-current={props.currentPage === page ? "page" : undefined}
                  aria-label={`Change to page ${page}`}
                  class={css(defaultButtonClasses)}
                  classList={{
                    "bg-fuchsia-600 text-slate-50": props.currentPage === page,
                    "bg-slate-800": props.currentPage !== page,
                  }}
                  onClick={() => props.onPageSelected(page)}
                  type="button"
                >
                  {page}
                </button>
              </li>
            )}
          </For>
          <li>
            <button
              aria-label={`Go to the next page (${props.currentPage + 1})`}
              class={css(defaultButtonClasses, "bg-slate-800")}
              disabled={props.currentPage + 1 > totalPages()}
              onClick={() => props.onPageSelected(props.currentPage + 1)}
              type="button"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </li>
          <li>
            <button
              aria-label={`Go to the last page (${totalPages()})`}
              class={css(
                defaultButtonClasses,
                "bg-slate-800",
                "border-r",
                "rounded-r",
              )}
              disabled={props.currentPage + 1 > totalPages()}
              onClick={() => props.onPageSelected(totalPages())}
              type="button"
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </li>
        </ol>
      </nav>
    </Show>
  );
};

export default Pagination;
