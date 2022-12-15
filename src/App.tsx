import Main from "./components/Main";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

/**
 * POSSIBLE FEATURES:
 * Adding and editing todos
 * Marking todos as 'complete'
 * Deleting todos
 * Sorting todos by creation date
 * Setting a due date
 * Filtering overdue todos
 */
