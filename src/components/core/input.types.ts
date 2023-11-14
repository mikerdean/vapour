import type { FieldElement } from "@modular-forms/solid";
import type { Component, JSX } from "solid-js";

export type InputComponent = Component<
  Omit<
    JSX.InputHTMLAttributes<HTMLInputElement>,
    "class" | "classList" | "id"
  > & {
    error?: string;
    label?: string;
    ref: (element: FieldElement) => void;
  }
>;
