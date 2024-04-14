import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import {Provider} from "react-redux";
import { store } from "./store/store.jsx";
import { router } from "./routes/route.jsx";
import {
  
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from "react-router-dom";
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <RouterProvider router={router} />
        {/* <App /> */}
      </Provider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
