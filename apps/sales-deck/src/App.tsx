import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, BarChart3, Clock, Zap, MessageSquare,
    ShieldCheck, Code, CheckCircle2
} from 'lucide-react';
import adminScreenshot from './assets/admin-screenshot.png';
import { AIIcon } from '@pavy/ui';

const slideViewportClass = 'min-h-[100svh] md:h-full py-16 sm:py-20 md:py-0';

const slides = [
    {
        id: 1,
        theme: 'dark',
        content: (
            <div className={`flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 ${slideViewportClass}`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] sm:text-sm tracking-[0.2em] font-bold mb-6 sm:mb-10">
                    <AIIcon family="wave" className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" glass={false} />
                    <span>망설임을 구매로 바꾸는 AI</span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight leading-tight mb-6 sm:mb-8">
                    고객이 묻는 순간이<br />
                    <span className="text-indigo-400">곧 결제의 순간입니다.</span>
                </h1>
                <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl font-light">
                    상세페이지를 읽고, 리뷰를 분석하고, 고객에게 바로 답하는 Pavy.ai
                </p>
            </div>
        )
    },
    {
        id: 2,
        theme: 'light',
        content: (
            <div className={`flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 gap-8 lg:gap-24 ${slideViewportClass}`}>
                <div className="flex-1 w-full relative z-10 flex flex-col justify-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-3 sm:mb-6 block sm:whitespace-nowrap">01 / Introduction</span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 sm:mb-8 break-keep">
                        상세페이지를 읽는 AI,<br />
                        <span className="text-indigo-600 sm:whitespace-nowrap">Pavy.ai란 무엇인가요?</span>
                    </h2>
                    <ul className="space-y-3 sm:space-y-6 text-sm sm:text-lg md:text-xl text-slate-600 break-keep">
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">스스로 상품 공부 완료:</b> 스크립트 한 줄이면 쇼핑몰의 상세페이지(PDP)를 AI가 스스로 읽고 100% 이해합니다.</div></li>
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">24시간 친절한 점원:</b> 고객이 묻는 사이즈, 색상, 배송 정보를 잠도 안 자고 가장 정확하게 안내합니다.</div></li>
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">매출 수직 상승:</b> 결제를 망설이는 순간, 즉각적인 답변으로 이탈을 막고 지갑을 열게 만듭니다.</div></li>
                    </ul>
                </div>
                <div className="flex-1 w-full mt-4 lg:mt-0 max-w-sm lg:max-w-md bg-white border border-slate-200 rounded-[24px] shadow-2xl relative z-10 overflow-hidden hidden sm:flex flex-col">
                    <div className="bg-indigo-600 p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center -ml-1"><AIIcon family="wave" className="w-5 h-5 text-white" glass={false} /></div>
                        <div>
                            <div className="text-white font-bold text-sm leading-tight">Pavy AI 점원</div>
                            <div className="text-white/80 text-[10px] leading-tight mt-0.5">평균 3초 내로 응답합니다.</div>
                        </div>
                    </div>
                    <div className="p-4 bg-slate-50 flex flex-col gap-3 flex-1">
                        <div className="bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] shadow-sm">모델분이 입으신 스커트 M사이즈 맞나요?</div>
                        <div className="bg-indigo-50 text-indigo-900 border border-indigo-100 text-xs sm:text-sm p-3 rounded-2xl rounded-tl-sm self-start max-w-[90%] shadow-sm">네! 사진 속 모델분(168cm, 52kg)은 스커트 <b>M사이즈</b>를 착용하셨습니다. 허리 27 입으시면 M 추천드려요!</div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        theme: 'light',
        content: (
            <div className={`flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 gap-8 lg:gap-24 ${slideViewportClass}`}>
                <div className="flex-1 w-full relative z-10">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-2 sm:mb-6 block sm:whitespace-nowrap">02 / The Problem</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 sm:mb-8 break-keep">
                        <span className="sm:whitespace-nowrap">고객은 기다리지 않습니다.</span><br />
                        <span className="sm:whitespace-nowrap">질문을 남기고 <span className="text-red-500">떠납니다.</span></span>
                    </h2>
                    <ul className="space-y-3 sm:space-y-6 text-sm sm:text-lg md:text-xl text-slate-600 break-keep">
                        <li className="flex gap-2 sm:gap-4 items-start"><AlertIcon /> <div className="leading-snug">질문이 있는 고객은 <b>지갑을 열 준비가 된 고객</b>입니다.</div></li>
                        <li className="flex gap-2 sm:gap-4 items-start"><AlertIcon /> <div className="leading-snug">하지만 기존 게시판이나 톡 상담은 답변을 받기까지 평균 <b>10분 이상</b> 걸립니다.</div></li>
                        <li className="flex gap-2 sm:gap-4 items-start"><AlertIcon /> <div className="leading-snug">기다리는 사이 고객은 다른 곳으로 갑니다. CS 직원을 계속해서 늘리는 것도 한계가 있죠.</div></li>
                    </ul>
                </div>
                <div className="flex-1 bg-white p-6 lg:p-10 rounded-[20px] lg:rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col items-center gap-6 lg:gap-8 w-full max-w-md mx-auto relative z-10 mt-6 lg:mt-0">
                    <div className="w-full bg-slate-50 p-4 lg:p-6 rounded-2xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-slate-100">
                        <div className="flex items-center gap-3 lg:gap-4"><div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-200 rounded-full flex items-center justify-center shrink-0"><Clock className="text-slate-500 w-5 h-5 lg:w-6 lg:h-6" /></div><span className="text-base lg:text-xl font-bold">기존 게시판 상담</span></div>
                        <span className="text-2xl lg:text-3xl font-black text-slate-400">10분+</span>
                    </div>
                    <div className="h-6 lg:h-12 w-1 bg-slate-200 shrink-0" />
                    <div className="w-full bg-indigo-50 p-4 lg:p-6 rounded-2xl flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border border-indigo-100">
                        <div className="flex items-center gap-3 lg:gap-4"><div className="w-10 h-10 lg:w-12 lg:h-12 bg-indigo-500 rounded-full flex items-center justify-center shrink-0"><AIIcon family="wave" className="text-white w-5 h-5 lg:w-6 lg:h-6" glass={false} /></div><span className="text-base lg:text-xl font-bold text-indigo-900">Pavy.ai 도입 시</span></div>
                        <span className="text-3xl lg:text-4xl font-black text-indigo-600">3초</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        theme: 'light',
        content: (
            <div className={`flex flex-col max-w-6xl mx-auto px-6 justify-center ${slideViewportClass}`}>
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-3 sm:mb-6 block text-center sm:whitespace-nowrap">03 / The Solution</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 text-center mb-8 sm:mb-16 break-keep">
                    단 <span className="text-indigo-600">3초 만에</span> 질문을 끝냅니다.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    <FeatureCard
                        icon={<Zap className="w-6 h-6 sm:w-8 sm:h-8" />}
                        title="상품 질문, 3초 컷"
                        desc="상세페이지 글과 사진을 똑똑하게 파악하고, 3초 안에 가장 친절한 맞춤형 답변을 내놓습니다."
                    />
                    <FeatureCard
                        icon={<Clock className="w-6 h-6 sm:w-8 sm:h-8" />}
                        title="고객의 귀찮음 해결"
                        desc="긴 상세페이지를 폰으로 쓱쓱 내리며 읽기 귀찮은 고객! 그냥 AI에게 물어보면 바로 답이 나옵니다."
                    />
                    <FeatureCard
                        icon={<BarChart3 className="w-6 h-6 sm:w-8 sm:h-8" />}
                        title="CS 감소, 결제율 폭발"
                        desc="단순 반복되는 사이즈/배송 문의는 AI가 다 해결하니 직원분들은 중요한 일에만 집중하세요."
                    />
                </div>
            </div>
        )
    },
    {
        id: 5,
        theme: 'dark',
        content: (
            <div className={`flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-6 gap-8 lg:gap-16 ${slideViewportClass}`}>
                <div className="flex-1 w-full relative z-10">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-400 mb-2 sm:mb-6 block sm:whitespace-nowrap">04 / Trust & Safety</span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 sm:mb-8 break-keep">
                        AI가 <span className="text-emerald-400">거짓말</span>을 할까 봐<br /> 걱정이신가요?
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed break-keep">
                        Pavy.ai는 우리 쇼핑몰에 <b>있는 상품 내용으로만</b> 대답하도록 학습되어 있습니다. 학습되지 않은 내용은 절대 지어내지 않습니다.
                    </p>
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-[11px] sm:text-sm md:text-base whitespace-normal sm:whitespace-nowrap text-left w-fit">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> 사실 기반 답변
                    </div>
                </div>
                <div className="flex-1 w-full bg-slate-800 p-5 sm:p-8 rounded-[20px] sm:rounded-[32px] border border-slate-700 shadow-2xl relative z-10 mt-6 lg:mt-0 max-w-md mx-auto">
                    <div className="flex flex-col gap-3 sm:gap-6">
                        <div className="self-end bg-slate-700 text-white p-3 sm:p-4 rounded-2xl rounded-tr-sm max-w-[90%] text-xs sm:text-base break-words">
                            "블랙 색상은 언제 재입고 되나요?"
                        </div>
                        <div className="self-start bg-indigo-600 text-white p-3 sm:p-4 rounded-2xl rounded-tl-sm max-w-[95%] shadow-lg text-xs sm:text-base break-words leading-relaxed">
                            죄송합니다만 현재 상품 안내에는 <b>블랙 재입고 일정</b>이 없습니다. 번거로우시겠지만 Q&A 게시판에 남겨주시면 담당자가 답변드리겠습니다!
                        </div>
                        <div className="self-start flex items-center gap-1 sm:gap-2 text-[10px] sm:text-[11px] md:text-xs text-indigo-300 bg-indigo-300/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mt-2">
                            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" /> 사실이 아닌 내용은 솔직히 "모른다"고 응답
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 6,
        theme: 'light',
        content: (
            <div className={`flex flex-col max-w-6xl mx-auto px-6 justify-center items-center text-center ${slideViewportClass}`}>
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-3 sm:mb-6 block sm:whitespace-nowrap">05 / Review Intelligence</span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-8 break-keep">
                    수만 개의 리얼 구매 후기도<br />
                    <span className="text-indigo-600 sm:whitespace-nowrap">AI가 싹 다 읽어줍니다.</span>
                </h2>
                <p className="text-sm sm:text-lg md:text-2xl text-slate-600 mb-8 sm:mb-16 max-w-3xl break-keep">
                    "정사이즈인가요? 발 안 아픈가요?"<br />
                    사장님도 잘 모르는 실제 착용감! AI가 수많은 <b>리뷰들을 모아 분석한 뒤</b><br />
                    기존 고객 경험에 기반한 착한 답변을 제공합니다.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 w-full">
                    <ReviewBadge text="3시간 걸어도 편하다는 후기가 412건이나 있어요" />
                    <ReviewBadge text="소음 차단이 뛰어나다는 후기가 890건 있습니다" />
                </div>
            </div>
        )
    },
    {
        id: 7,
        theme: 'light',
        content: (
            <div className={`flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-6 gap-8 lg:gap-16 ${slideViewportClass}`}>
                <div className="flex-1 order-2 lg:order-1 relative w-full mt-4 lg:mt-0 z-10">
                    <div className="absolute inset-0 bg-indigo-100/50 blur-[60px] lg:blur-[80px] rounded-full transition-all" />
                    <div className="relative bg-slate-50 rounded-[20px] lg:rounded-[32px] overflow-hidden shadow-2xl border border-slate-200">
                        <img src={adminScreenshot} alt="Admin Dashboard" className="w-full h-auto object-cover" />
                    </div>
                </div>
                <div className="flex-1 order-1 lg:order-2 w-full relative z-10 flex flex-col justify-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-2 sm:mb-6 block sm:whitespace-nowrap">06 / Dashboard</span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4 sm:mb-8 break-keep">
                        고객의 속마음을,<br />
                        <span className="text-indigo-600 sm:whitespace-nowrap">데이터로 속 시원히.</span>
                    </h2>
                    <ul className="space-y-3 sm:space-y-6 text-sm sm:text-lg md:text-xl text-slate-600 break-keep">
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">진짜 관심사 파악:</b> 쇼핑몰 고객들이 어떤 상품에서 무엇을 망설이는지 한눈에 봅니다.</div></li>
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">즉각적인 피드백 적용:</b> 자주 묻는 질문을 바로 상세페이지 썸네일에 추가해 구매율을 올립니다.</div></li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 8,
        theme: 'light',
        content: (
            <div className={`flex flex-col lg:flex-row items-center max-w-6xl mx-auto px-6 gap-8 lg:gap-16 ${slideViewportClass}`}>
                <div className="flex-1 w-full relative z-10 flex flex-col justify-center">
                    <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-3 sm:mb-6 block sm:whitespace-nowrap">07 / Customization</span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-5 sm:mb-8 break-keep">
                        브랜드 정체성에 맞게,<br />
                        <span className="text-indigo-600 sm:whitespace-nowrap">마음대로 디자인하세요.</span>
                    </h2>
                    <ul className="space-y-4 sm:space-y-6 text-sm sm:text-lg md:text-xl text-slate-600 break-keep">
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">브랜드 컬러 매칭:</b> 베이지, 스카이 블루 등 쇼핑몰 분위기에 딱 맞는 테마 색상을 직접 고릅니다.</div></li>
                        <li className="flex gap-2 sm:gap-4 items-start"><CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" /> <div className="leading-snug"><b className="text-indigo-600">맞춤형 호칭 & 어투:</b> "고객님" 대신 "언니!", 딱딱한 존댓말 대신 친절한 말투 등 우리 몰 구조에 딱 맞춥니다.</div></li>
                    </ul>
                </div>
                <div className="flex-1 w-full flex flex-col items-center gap-4 lg:gap-6 mt-8 lg:mt-0 relative z-10">
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-100 p-4 lg:p-6 flex items-start sm:items-center gap-4 lg:gap-6 transform hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-rose-100 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/30">
                            <AIIcon alias="coral-rose" glass={false} className="scale-75 text-white" />
                        </div>
                        <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-sm lg:text-lg mb-1">여성 패션 쇼핑몰</div>
                            <div className="text-[10px] lg:text-sm bg-rose-50 px-2 lg:px-3 py-1 rounded-full text-rose-600 font-bold inline-block whitespace-normal break-words leading-snug">"언니, 이거 좀 핏하게 나왔어요!"</div>
                        </div>
                    </div>
                    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-100 p-4 lg:p-6 flex items-start sm:items-center gap-4 lg:gap-6 transform lg:-translate-x-6 hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-brand-primary flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                            <AIIcon alias="blue-orbit" glass={false} className="scale-75 text-white" />
                        </div>
                        <div className="min-w-0">
                            <div className="font-bold text-slate-900 text-sm lg:text-lg mb-1">IT 기기 전문몰</div>
                            <div className="text-[10px] lg:text-sm bg-blue-50 px-2 lg:px-3 py-1 rounded-full text-blue-600 font-bold inline-block whitespace-normal break-words leading-snug">"고객님, 해당 모델은 220V 전용입니다."</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 9,
        theme: 'dark',
        content: (
            <div className={`flex flex-col max-w-5xl mx-auto px-6 justify-center items-center text-center ${slideViewportClass}`}>
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-400 mb-3 sm:mb-6 block sm:whitespace-nowrap">08 / Easy Setup</span>
                <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black text-white mb-6 sm:mb-10 break-keep">
                    개발을 몰라도,<br />복사 붙여넣기 1분 끝.
                </h2>
                <div className="bg-slate-800/80 backdrop-blur border border-slate-700 p-4 sm:p-8 rounded-[20px] w-full max-w-3xl mb-6 sm:mb-10 shadow-2xl relative overflow-hidden z-10 mx-auto">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><Code className="w-12 h-12 sm:w-24 sm:h-24 text-white" /></div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 text-slate-400 text-xs sm:text-base relative z-10">
                        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> <span className="text-emerald-400">카페24 / 메이크샵 등 스킨 관리자</span>
                    </div>
                    <code className="text-[10px] sm:text-sm lg:text-lg text-emerald-300 block text-left bg-slate-900/80 p-3 sm:p-6 rounded-xl overflow-x-auto whitespace-nowrap relative z-10 border border-slate-800">
                        &lt;script src="https://cdn.pavy.ai/widget.js"&gt;&lt;/script&gt;
                    </code>
                </div>
                <p className="text-sm sm:text-xl lg:text-2xl text-slate-300 font-light max-w-2xl break-keep">
                    지금 쓰는 호스팅 어디에든 호환됩니다. 스크립트 코드 하나만 사이트 하단에 붙여넣으면 즉시 우리 쇼핑몰 전용 AI가 출근합니다.
                </p>
            </div>
        )
    },
    {
        id: 10,
        theme: 'light',
        content: (
            <div className={`flex flex-col max-w-6xl mx-auto px-6 justify-center ${slideViewportClass}`}>
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-indigo-500 mb-3 sm:mb-6 block text-center sm:whitespace-nowrap">09 / ROI</span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 text-center mb-8 sm:mb-16 break-keep">
                    CS 스트레스는 덜고,<br />매출은 끌어올립니다.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                    <StatCard value="↓ 70%" label="단순 문의 감소" desc="사이즈·배송·재입고 같은 반복 질문, AI가 즉시 해결해 CS 부담을 확 줄여줍니다." />
                    <StatCard value="↑ 23%" label="결제 전환율 상승" desc="구매를 망설이는 그 순간, 즉각 답변으로 이탈을 막고 결제까지 이끕니다." />
                    <StatCard value="24/7" label="무인 영업 사원" desc="밤늦게나 주말에 몰리는 예비 고객들을 절대로 놓치지 않고 응대합니다." />
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 text-center mt-6 sm:mt-10">
                    * AI 챗봇 도입 이커머스 업계 평균 수치 (Glassix 2024, Forrester Research)
                </p>
            </div>
        )
    },
    {
        id: 11,
        theme: 'dark',
        content: (
            <div className={`flex flex-col max-w-5xl mx-auto px-6 justify-center items-center text-center ${slideViewportClass}`}>
                <div className="mb-6 sm:mb-10 z-10">
                    <AIIcon family="wave" className="w-12 h-12 sm:w-20 sm:h-20 text-white" glass />
                </div>
                <h2 className="text-2xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6 break-keep z-10">
                    최고의 점원을<br />지금 바로 고용하세요.
                </h2>
                <p className="text-sm sm:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-16 font-light max-w-2xl break-keep z-10 w-full px-4">
                    어려운 설정 없이 클릭 몇 번으로 바로 적용.<br />지금 시작하세요!
                </p>
            </div>
        )
    }
];

function AlertIcon() {
    return <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1"><div className="w-2 h-2 rounded-full bg-red-500" /></div>;
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="bg-white p-5 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-indigo-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-indigo-600 mb-4 sm:mb-6">
                {icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-4">{title}</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{desc}</p>
        </div>
    );
}

function StatCard({ value, label, desc }: { value: string, label: string, desc: string }) {
    return (
        <div className="flex flex-col items-center text-center p-4 sm:p-8">
            <div className="text-5xl sm:text-7xl font-black text-indigo-600 mb-2 sm:mb-4 tracking-tighter">{value}</div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-3">{label}</h3>
            <p className="text-sm sm:text-base text-slate-500 font-medium">{desc}</p>
        </div>
    );
}

function ReviewBadge({ text }: { text: string }) {
    return (
        <div className="w-full sm:w-auto bg-white px-5 sm:px-6 py-4 rounded-3xl sm:rounded-full border border-slate-200 shadow-md flex items-start sm:items-center gap-3 text-slate-700 font-bold text-left">
            <MessageSquare className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 sm:mt-0" /> <span>{text}</span>
        </div>
    );
}

export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                setCurrentSlide(p => Math.min(slides.length - 1, p + 1));
            } else if (e.key === 'ArrowLeft') {
                setCurrentSlide(p => Math.max(0, p - 1));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useLayoutEffect(() => {
        containerRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [currentSlide]);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.changedTouches[0];
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchStartRef.current) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;
        touchStartRef.current = null;

        if (Math.abs(deltaX) < 50 || Math.abs(deltaY) > 80) return;

        if (deltaX < 0) {
            setCurrentSlide(p => Math.min(slides.length - 1, p + 1));
            return;
        }

        setCurrentSlide(p => Math.max(0, p - 1));
    };

    const slide = slides[currentSlide];

    return (
        <div ref={containerRef} className={`fixed inset-0 overflow-x-hidden overflow-y-auto overscroll-y-contain scrollbar-hidden transition-colors duration-700 md:overflow-y-hidden ${slide.theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'}`}>

            {/* Background aesthetics */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {slide.theme === 'dark' ? (
                    <>
                        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-500/20 blur-[150px] rounded-full" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[150px] rounded-full" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-indigo-100/60 blur-[150px] rounded-full" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-50/60 blur-[120px] rounded-full" />
                    </>
                )}
            </div>

            {/* Main Slide Content */}
            <div className="relative z-10 w-full min-h-full md:h-full flex items-start md:items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.05, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full min-h-full md:h-full pb-28 sm:pb-24 md:pb-20"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {slide.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 sm:bottom-8 left-0 w-full px-6 sm:px-10 flex items-center justify-between z-50 pointer-events-none">
                <div className={`text-[10px] sm:text-sm font-bold tracking-widest hidden xs:block ${slide.theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    PAVY.AI SALES DECK
                </div>

                <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto mx-auto xs:mx-0">
                    <button
                        onClick={() => setCurrentSlide(p => Math.max(0, p - 1))}
                        disabled={currentSlide === 0}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${slide.theme === 'dark'
                            ? 'bg-white/10 text-white hover:bg-white/20 disabled:opacity-30'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:opacity-30'
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" />
                    </button>
                    <div className={`text-xs sm:text-base font-bold tracking-widest px-2 sm:px-4 ${slide.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {currentSlide + 1} / {slides.length}
                    </div>
                    <button
                        onClick={() => setCurrentSlide(p => Math.min(slides.length - 1, p + 1))}
                        disabled={currentSlide === slides.length - 1}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${slide.theme === 'dark'
                            ? 'bg-white/10 text-white hover:bg-white/20 disabled:opacity-30'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:opacity-30'
                            }`}
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
