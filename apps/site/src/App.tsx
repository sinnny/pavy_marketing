import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LocaleWrapper from "./components/LocaleWrapper";
import ArchivedLandingPage from "./pages/ArchivedLandingPage";
import ProductDashboard from "./pages/ProductDashboard";
import UserGuide from "./pages/UserGuide";
import DemoRequest from "./pages/DemoRequest";
import { detectLanguage } from "./hooks/useLocale";
import CookieBanner from "./components/legal/CookieBanner";
import { initGA4, grantAnalyticsConsent } from "./lib/analytics";
import { usePageTracking } from "./hooks/use-page-tracking";
import { useCookieConsent } from "./hooks/use-cookie-consent";

const ProductChatbot = lazy(() => import("./pages/ProductChatbot"));
const SalesDeck = lazy(() => import("./pages/SalesDeck"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Customers = lazy(() => import("./pages/Customers"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));

function RootRedirect() {
  const lang = detectLanguage();
  return <Navigate to={`/${lang}`} replace />;
}

const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

function App() {
  usePageTracking();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (GA4_MEASUREMENT_ID) {
      initGA4(GA4_MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    if (consent?.analytics) {
      grantAnalyticsConsent();
    }
  }, [consent?.analytics]);

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
          <Route index element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
              <ProductChatbot isHome />
            </Suspense>
          } />
          <Route path="archive" element={<ArchivedLandingPage />} />
          <Route path="product/chatbot" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
              <ProductChatbot />
            </Suspense>
          } />
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
          <Route path="customers" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-32 pb-24 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}>
              <Customers />
            </Suspense>
          } />
          <Route path="customers/:slug" element={
            <Suspense fallback={<div className="min-h-screen bg-slate-50 pt-32 pb-24 flex justify-center"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>}>
              <CaseStudyDetail />
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
