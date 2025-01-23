export function calculateDomInnerPosition(dom: HTMLElement) {
  const rect = dom.getBoundingClientRect();
  const parent = dom.parentElement;
  if (!parent) return {
    top: rect.top,
    left: rect.left,
  };
  const parentRect = parent.getBoundingClientRect();
  return {
    top: rect.top - parentRect.top,
    left: rect.left - parentRect.left,
  };
}