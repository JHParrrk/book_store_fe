import Layout from "./components/layout/layout";
import Home from "./pages/home";
import { BookStoreThemeProvider } from "./contexts/themeContext";

function App() {
  return (
    <BookStoreThemeProvider>
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
