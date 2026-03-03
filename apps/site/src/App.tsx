import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LocaleWrapper from "./components/LocaleWrapper";
import ArchivedLandingPage from "./pages/ArchivedLandingPage";
import ProductChatbot from "./pages/ProductChatbot";
import ProductDashboard from "./pages/ProductDashboard";
import UserGuide from "./pages/UserGuide";
import DemoRequest from "./pages/DemoRequest";
import { detectLanguage } from "./hooks/useLocale";

const SalesDeck = lazy(() => import("./pages/SalesDeck"));

function RootRedirect() {
  const lang = detectLanguage();
  return <Navigate to={`/${lang}`} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route
        path="/sales-deck"
        element={
          <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
            <SalesDeck />
          </Suspense>
        }
      />
      <Route path="/:lang" element={<LocaleWrapper />}>
        <Route index element={<ProductChatbot />} />
        <Route path="archive" element={<ArchivedLandingPage />} />
        <Route path="product/chatbot" element={<ProductChatbot />} />
        <Route path="product/dashboard" element={<ProductDashboard />} />
        <Route path="guide" element={<UserGuide />} />
        <Route path="demo" element={<DemoRequest />} />
      </Route>
    </Routes>
  );
}

export default App;
