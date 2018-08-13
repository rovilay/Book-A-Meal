/**
 * toggles class names
 *
 * @param {string} elementClass class of DOM element to toggle
 * @param {string} classNameToReplace class name to replace the existing class,
 * @param {string} ariaAttribute sets aria-hidden properties
 */
const toggleClassNames = (elementClass, classNameToReplace, ariaAttribute) => {
  const element = document.querySelector(elementClass);
  if (element) {
    element.className = classNameToReplace;
    element.setAttribute('aria-hidden', ariaAttribute);
  }
};

export default toggleClassNames;
