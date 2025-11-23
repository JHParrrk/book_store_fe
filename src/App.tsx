import Layout from "./components/layout/layout";
import Home from "./pages/home";
import ThemeSwitcher from "./components/header/themeSwitcher";
import { BookStoreThemeProvider } from "./contexts/themeContext";

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
