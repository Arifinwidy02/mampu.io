import { JSDOM } from "jsdom";
import { expect } from "bun:test";
import { e as matchers } from "../node_modules/@testing-library/jest-dom/dist/matchers-35e4d3bd.mjs";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost:3000",
  pretendToBeVisual: true,
});

const { window } = dom;

globalThis.document = window.document;
globalThis.window = window;
globalThis.navigator = window.navigator;
globalThis.HTMLElement = window.HTMLElement;
globalThis.HTMLButtonElement = window.HTMLButtonElement;
globalThis.HTMLInputElement = window.HTMLInputElement;
globalThis.HTMLDivElement = window.HTMLDivElement;
globalThis.HTMLSpanElement = window.HTMLSpanElement;
globalThis.HTMLTableElement = window.HTMLTableElement;
globalThis.HTMLTableRowElement = window.HTMLTableRowElement;
globalThis.HTMLTableCellElement = window.HTMLTableCellElement;
globalThis.HTMLTableSectionElement = window.HTMLTableSectionElement;
globalThis.Element = window.Element;
globalThis.Node = window.Node;
globalThis.Event = window.Event;
globalThis.CustomEvent = window.CustomEvent;
globalThis.getComputedStyle = window.getComputedStyle.bind(window);
globalThis.MutationObserver = window.MutationObserver;
globalThis.ResizeObserver = window.ResizeObserver;
globalThis.DocumentFragment = window.DocumentFragment;
globalThis.Range = window.Range;
globalThis.Selection = window.Selection;
globalThis.CSSStyleDeclaration = window.CSSStyleDeclaration;
globalThis.StyleSheet = window.StyleSheet;
globalThis.requestAnimationFrame = window.requestAnimationFrame.bind(window);
globalThis.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
globalThis.PointerEvent = window.PointerEvent;

Element.prototype.hasPointerCapture = () => false;
Element.prototype.setPointerCapture = () => {};
Element.prototype.releasePointerCapture = () => {};
Element.prototype.scrollIntoView = () => {};

expect.extend(matchers as any);
