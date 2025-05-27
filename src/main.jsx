import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
//import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider >
)
