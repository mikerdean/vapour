import type { Component } from "solid-js";

export type PaginationComponent = Component<{
  currentPage: number;
  maxPages?: number;
  onPageSelected: (page: number) => void;
  total: number;
}>;
