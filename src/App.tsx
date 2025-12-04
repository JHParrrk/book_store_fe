import { BookStoreThemeProvider } from "./contexts/themeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./apis/queryClient.api";
import ToastContainer from "./components/commons/toast/ToastContainer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
