/**
 * NavProps Interface
 *
 * This interface defines the properties for navigation in the application. It includes methods
 * for navigating to a different screen, going back to the previous screen, and popping the
 * current screen from the navigation stack.
 *
 * @interface NavProps
 * @property {Function} navigate - A function that takes a string argument representing the
 *                                  name of the screen to navigate to.
 * @property {Function} goBack - A function that navigates back to the previous screen in the stack.
 * @property {Function} pop - A function that removes the current screen from the navigation stack.
 */
interface NavProps {
  navigate: (args: string) => void;
  goBack: () => void;
  pop: () => void;
}

export type { NavProps };
