import { Component } from "solid-js";

export type PaginationComponent = Component<{
  currentPage: number;
  maxPages?: number;
  onPageSelected: (page: number) => void;
  pageSize: number;
  total: number;
}>;
