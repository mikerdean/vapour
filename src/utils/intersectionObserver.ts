const mockInstances = new Set<MockIntersectionObserver>();

export class MockIntersectionObserver implements IntersectionObserver {
  readonly #callback: IntersectionObserverCallback;
  readonly #elements: Set<Element>;
  readonly root: Document | Element | null;
  readonly rootMargin: string;
  readonly thresholds: readonly number[];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.#callback = callback;
    this.#elements = new Set();
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || "0px 0px 0px 0px";
    this.thresholds = MockIntersectionObserver.getThreshold(options?.threshold);
    mockInstances.add(this);
  }

  private static getThreshold(
    threshold: number | number[] | undefined,
  ): number[] {
    if (threshold === undefined) {
      return [0];
    } else if (Array.isArray(threshold)) {
      return threshold;
    } else {
      return [threshold];
    }
  }

  private createObservationEntry(
    element: Element,
    isIntersecting: boolean,
  ): IntersectionObserverEntry {
    return {
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: isIntersecting
        ? element.getBoundingClientRect()
        : {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
            toJSON() {
              return "";
            },
          },
      isIntersecting,
      rootBounds:
        this.root && this.root instanceof Element
          ? this.root.getBoundingClientRect()
          : null,
      target: element,
      time: Date.now(),
    };
  }

  disconnect(): void {
    this.#elements.clear();
    mockInstances.delete(this);
  }

  observe(target: Element): void {
    this.#elements.add(target);
  }

  takeRecords(): IntersectionObserverEntry[] {
    throw new Error("Method not implemented.");
  }

  triggerAll(isIntersecting: boolean) {
    const entries = [...this.#elements].map((element) =>
      this.createObservationEntry(element, isIntersecting),
    );
    this.#callback(entries, this);
  }

  triggerIntersection(target: Element, isIntersecting: boolean) {
    if (!this.#elements.has(target)) {
      return;
    }

    const entry = this.createObservationEntry(target, isIntersecting);
    this.#callback([entry], this);
  }

  unobserve(target: Element): void {
    this.#elements.delete(target);
  }
}

export const mockAllIsIntersecting = (isIntersecting: boolean): void => {
  for (const observer of mockInstances) {
    observer.triggerAll(isIntersecting);
  }
};

export const mockIsIntersecting = (
  element: Element,
  isIntersecting: boolean,
): void => {
  for (const observer of mockInstances) {
    observer.triggerIntersection(element, isIntersecting);
  }
};

export const resetIntersectionMocking = () => {
  mockInstances.clear();
};
