import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import TrustedBySection from '../components/TrustedBySection';
import HowItWorksSection from '../components/HowItWorksSection';
import ProductHighlightSection from '../components/ProductHighlightSection';
import CustomPDPSection from '../components/CustomPDPSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    return (
        <div ref={containerRef} className="relative w-full bg-slate-50 min-h-screen font-sans selection:bg-indigo-500/20 text-slate-900 flex flex-col items-center">
            <SEOHead
                title="Archived Landing Page | Pavy.ai"
                description="Archived version of an earlier Pavy.ai landing page, kept for reference."
                path="/archive"
                noIndex
            />
            {/* Bright Spatial Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-white">
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-50/50 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-50/40 blur-[120px] rounded-full"></div>
            </div>

            <Header />

            <main className="relative z-10 flex flex-col items-center w-full">
                <HeroSection scrollYProgress={scrollYProgress} />

                {/* Bento Grid Containers / Vertical Spacing */}
                <div className="w-full flex flex-col items-center space-y-40 pb-40">
                    <ProblemSection />
                    <SolutionSection />
                    <TrustedBySection />
                    <HowItWorksSection />
                    <ProductHighlightSection />
                    <CustomPDPSection />
                    <FAQSection />
                </div>

                <Footer />
            </main>
        </div>
    );
}
