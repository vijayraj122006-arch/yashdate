import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Sparkles, RotateCcw, Share2, MessageCircle } from 'lucide-react';
import { cleanPhoneNumber } from '../utils/whatsappHelper';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    score: number;
    badge: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What's your height vibe?",
    subtitle: "Yash is 6ft tall and has a soft spot for shorter girls.",
    options: [
      { text: "Under 5'4\" (Petite & cute)", score: 25, badge: "🎯 Yash's Dream" },
      { text: "5'4\" – 5'7\" (Balanced & elegant)", score: 20, badge: "✨ Great Match" },
      { text: "5'8\"+ (Tall & model energy)", score: 15, badge: "💫 Power Duo" },
    ],
  },
  {
    id: 2,
    question: "Anuv Jain comes on during a late-night drive...",
    subtitle: "Acoustic indie vibes are sacred in Yash's playlist.",
    options: [
      { text: "Singing along word-for-word to 'Baarishein' & 'Husn'", score: 25, badge: "🎶 Playlist Soulmate" },
      { text: "Quietly vibing with the windows down and warm coffee", score: 22, badge: "☕ Cozy Aesthetic" },
      { text: "Skipping immediately to high-tempo techno / metal", score: 10, badge: "⚡ Wildcard Energy" },
    ],
  },
  {
    id: 3,
    question: "Yash is training to be an airline pilot. Your flight plan?",
    subtitle: "Looking for someone ready for high-altitude adventures.",
    options: [
      { text: "Sunset flights & window seats forever — I'm your co-pilot!", score: 25, badge: "✈️ Co-Pilot Material" },
      { text: "As long as we stop in Chennai for authentic filter coffee & food", score: 23, badge: "🌴 Chennai Warmth" },
      { text: "I'll wait in the lounge with a good book", score: 14, badge: "📖 Ground Crew" },
    ],
  },
  {
    id: 4,
    question: "What is your daily vibe & sense of humor?",
    subtitle: "Yash loves someone cute and funny but pretty, with witty banter.",
    options: [
      { text: "Cute, witty, sarcastic dry humor & sweet gestures", score: 25, badge: "👑 10/10 Chemistry" },
      { text: "Thoughtful, loves long conversations & cooking good pasta", score: 23, badge: "🍝 Pure Green Flag" },
      { text: "Strictly serious, memes only on Tuesdays", score: 10, badge: "💼 Formal Mode" },
    ],
  },
];

export const CompatibilityQuizModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { daterProfile, triggerConfetti, addToast } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (score: number) => {
    const nextAnswers = [...selectedAnswers, score];
    setSelectedAnswers(nextAnswers);

    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
      triggerConfetti();
    }
  };

  const calculateTotalScore = () => {
    if (selectedAnswers.length === 0) return 0;
    return selectedAnswers.reduce((a, b) => a + b, 0);
  };

  const finalScore = calculateTotalScore();

  const getVerdict = (score: number) => {
    if (score >= 90) {
      return {
        title: "🔥 98% Match: Certified Co-Pilot Material!",
        desc: "You and Yash are a match made in heaven. From Anuv Jain melodies to height chemistry and witty banter, you hit every single green flag.",
        badge: "Highest Compatibility",
        color: "text-rose-400",
        border: "border-rose-500/40",
      };
    }
    if (score >= 75) {
      return {
        title: "✨ 85% Match: High Chemistry Ahead!",
        desc: "Huge compatibility! You share the same warmth, humor, and easy-going energy. A filter coffee date is definitely overdue.",
        badge: "Strong Match",
        color: "text-emerald-400",
        border: "border-emerald-500/40",
      };
    }
    return {
      title: "🌱 68% Match: Opposites Attract!",
      desc: "Different tastes make for the best conversations. Maybe you can introduce him to new tracks while he takes you on a scenic flight.",
      badge: "Intriguing Dynamic",
      color: "text-sky-400",
      border: "border-sky-500/40",
    };
  };

  const verdict = getVerdict(finalScore);

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsFinished(false);
  };

  const handleCopyScore = () => {
    const text = `I just scored ${finalScore}% on Yash Sunil's Compatibility Quiz! 🎯✨ Check it out here!`;
    navigator.clipboard.writeText(text);
    addToast('Quiz score copied to clipboard!', 'success');
  };

  const handleNotifyWhatsapp = () => {
    const phone = cleanPhoneNumber(daterProfile.whatsappNumber || '919487548740');
    const msg = encodeURIComponent(
      `Hey Yash! ✨ I took your compatibility quiz on your profile and scored ${finalScore}% (${verdict.badge})! Let's grab that filter coffee or play Anuv Jain songs!`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const progressPercent = ((currentStep + 1) / totalQuestions) * 100;
  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#13131c] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-7 text-zinc-100 my-8 text-left">
        <button
          onClick={onClose}
          data-testid="quiz-modal-close"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-[#181824] hover:bg-[#222232] border border-white/5 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isFinished ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 text-white rounded-xl shadow-md shadow-rose-500/25">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Are You Yash's Type? 💘
                </h2>
                <p className="text-xs text-zinc-400">
                  Question {currentStep + 1} of {totalQuestions}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#181824] h-1.5 rounded-full mb-6 overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="space-y-2 mb-5">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {currentQ.question}
              </h3>
              <p className="text-xs text-zinc-400">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  data-testid={`quiz-opt-${currentStep}-${idx}`}
                  className="w-full p-4 rounded-2xl bg-[#181824] hover:bg-[#202030] border border-white/5 hover:border-rose-500/40 text-left transition group cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition">
                      {opt.text}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 group-hover:bg-rose-500/20 group-hover:text-rose-300 font-medium border border-white/5 transition ml-2 whitespace-nowrap">
                    {opt.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Finished Result View */
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 mx-auto flex items-center justify-center text-white shadow-xl shadow-rose-500/30">
              <Heart className="w-8 h-8 fill-white" />
            </div>

            <div className="space-y-1">
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-rose-300 mb-1">
                {verdict.badge}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {verdict.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed pt-1">
                {verdict.desc}
              </p>
            </div>

            {/* Score Ring / Bar */}
            <div className="p-4 rounded-2xl bg-[#181824] border border-white/5 flex items-center justify-around">
              <div>
                <span className="text-2xl font-bold text-white">{finalScore}%</span>
                <p className="text-[11px] text-zinc-400">Match Score</p>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <span className="text-2xl font-bold text-rose-400">4 / 4</span>
                <p className="text-[11px] text-zinc-400">Questions Answered</p>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div>
                <span className="text-2xl font-bold text-emerald-400">100%</span>
                <p className="text-[11px] text-zinc-400">Vibe Check</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleNotifyWhatsapp}
                data-testid="quiz-share-whatsapp-btn"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Result to Yash on WhatsApp</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleCopyScore}
                  data-testid="quiz-copy-score-btn"
                  className="py-2.5 rounded-xl bg-[#181824] hover:bg-[#222232] text-zinc-200 border border-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Score</span>
                </button>
                <button
                  onClick={handleRestart}
                  data-testid="quiz-retake-btn"
                  className="py-2.5 rounded-xl bg-[#181824] hover:bg-[#222232] text-zinc-200 border border-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
