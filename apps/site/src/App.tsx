import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LocaleWrapper from "./components/LocaleWrapper";
import ArchivedLandingPage from "./pages/ArchivedLandingPage";
import ProductChatbot from "./pages/ProductChatbot";
import ProductDashboard from "./pages/ProductDashboard";
import UserGuide from "./pages/UserGuide";
import DemoRequest from "./pages/DemoRequest";
import { detectLanguage } from "./hooks/useLocale";
import CookieBanner from "./components/legal/CookieBanner";

const SalesDeck = lazy(() => import("./pages/SalesDeck"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));

function RootRedirect() {
  const lang = detectLanguage();
  return <Navigate to={`/${lang}`} replace />;
}

function App() {
  return (
    <>
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
          <Route path="blog" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-32 pb-24 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}>
              <Blog />
            </Suspense>
          } />
          <Route path="blog/:slug" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-32 pb-24 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}>
              <BlogPost />
            </Suspense>
          } />
          <Route path="pricing" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
              <Pricing />
            </Suspense>
          } />
          <Route path="legal/privacy" element={
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
              <PrivacyPolicy />
            </Suspense>
          } />
          <Route path="legal/terms" element={
            <Suspense fallback={<div className="min-h-screen bg-white" />}>
              <TermsOfService />
            </Suspense>
          } />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;
