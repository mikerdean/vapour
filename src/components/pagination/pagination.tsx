import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { For, Show, createMemo } from "solid-js";

import { css } from "../../utils/css";
import FontAwesomeIcon from "../images/fontAwesomeIcon";
import { PaginationComponent } from "./types";
import { calculateStart } from "./utils";

const Pagination: PaginationComponent = (props) => {
  const defaultButtonClasses = [
    "px-2",
    "py-1",
    "text-center",
    "border-t",
    "border-b",
    "border-sky-900",
  ];

  const totalPages = createMemo(() => Math.ceil(props.total / props.pageSize));

  const pages = createMemo(() => {
    const total = totalPages();
    const maxPages = props.maxPages || 5;

    const length = total > maxPages ? maxPages : total;
    const start = calculateStart(props.currentPage, total, maxPages);

    return Array.from({ length }, (_, i) => start + i);
  });

  return (
    <Show when={totalPages() > 1}>
      <nav class="mb-3 sticky top-[5.5rem]">
        <ol class="flex justify-center">
          <li>
            <button
              aria-label={"Go back to first page (1)"}
              class={css(
                defaultButtonClasses,
                "bg-slate-800",
                "border-l",
                "text-fuchsia-500",
                "disabled:text-slate-500",
                "rounded-l"
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
              class={css(
                defaultButtonClasses,
                "bg-slate-800",
                "text-fuchsia-500",
                "disabled:text-slate-500"
              )}
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
                  aria-label={`Change to page ${page}`}
                  class={css(defaultButtonClasses)}
                  classList={{
                    "bg-fuchsia-500 text-slate-100": props.currentPage === page,
                    "bg-slate-800 text-slate-500": props.currentPage !== page,
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
              class={css(
                defaultButtonClasses,
                "bg-slate-800",
                "text-fuchsia-500",
                "disabled:text-slate-500"
              )}
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
                "text-fuchsia-500",
                "disabled:text-slate-500",
                "rounded-r"
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
