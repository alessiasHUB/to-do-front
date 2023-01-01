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
 * TO DO:
 * Display due date
 * Filtering overdue todos
 * Filter tasks with due date
 * Order by due date
 */
