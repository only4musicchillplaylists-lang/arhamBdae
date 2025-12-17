import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import { Shuffle, HelpCircle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Import all member images
import nayeonImg from "@assets/stock_images/twice_nayeon_k-pop_i_61dbad76.jpg";
import jeongyeonImg from "@assets/stock_images/twice_jeongyeon_k-po_2d4e38ef.jpg";
import momoImg from "@assets/stock_images/twice_momo_k-pop_ido_848360bd.jpg";
import sanaImg from "@assets/stock_images/twice_sana_k-pop_ido_1fe2ab26.jpg";
import jihyoImg from "@assets/stock_images/twice_jihyo_k-pop_id_f32fb2d5.jpg";
import minaImg from "@assets/stock_images/twice_mina_k-pop_ido_f3cca9c9.jpg";
import dahyunImg from "@assets/stock_images/twice_dahyun_k-pop_i_452ea851.jpg";
import chaeyoungImg from "@assets/stock_images/twice_chaeyoung_k-po_ca74029c.jpg";
import tzuyuImg from "@assets/stock_images/twice_tzuyu_k-pop_id_52cce674.jpg";

const MEMBERS = [
  { id: 1, name: "Nayeon", image: nayeonImg, hints: ["Oldest member", "Bunny teeth", "Pop!"] },
  { id: 2, name: "Jeongyeon", image: jeongyeonImg, hints: ["Girl crush", "Lead Vocalist", "Short hair era icon"] },
  { id: 3, name: "Momo", image: momoImg, hints: ["Dancing machine", "Loves jokbal", "Made in Japan"] },
  { id: 4, name: "Sana", image: sanaImg, hints: ["No Sana No Life", "Shy Shy Shy", "Clumsy princess"] },
  { id: 5, name: "Jihyo", image: jihyoImg, hints: ["God Jihyo", "Leader", "Power vocal"] },
  { id: 6, name: "Mina", image: minaImg, hints: ["Black Swan", "Ballerina", "Penguin"] },
  { id: 7, name: "Dahyun", image: dahyunImg, hints: ["Tofu", "Camera spotter", "Rapper"] },
  { id: 8, name: "Chaeyoung", image: chaeyoungImg, hints: ["Baby Beast", "Artist", "Main Rapper"] },
  { id: 9, name: "Tzuyu", image: tzuyuImg, hints: ["Maknae", "Tallest member", "Visual Goddess"] },
];

export default function Fun() {
  const [currentMember, setCurrentMember] = useState(MEMBERS[0]);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [playedMembers, setPlayedMembers] = useState<number[]>([]);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    // Filter out recently played members unless all have been played
    let availableMembers = MEMBERS.filter(m => !playedMembers.includes(m.id));
    
    if (availableMembers.length === 0) {
      setPlayedMembers([]);
      availableMembers = MEMBERS;
    }

    const randomMember = availableMembers[Math.floor(Math.random() * availableMembers.length)];
    setCurrentMember(randomMember);
    setGuess("");
    setShowHint(false);
    setStatus("idle");
    setPlayedMembers(prev => [...prev, randomMember.id]);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedName = currentMember.name.toLowerCase();

    if (normalizedGuess === normalizedName) {
      setStatus("correct");
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d946ef', '#a855f7', '#f472b6']
      });

      setTimeout(startNewRound, 1500);
    } else {
      setStatus("wrong");
      setStreak(0);
      
      // Shake effect logic handled by framer motion below
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-900 font-heading mb-2">Guess the Member!</h2>
        <p className="text-purple-600">Can you name all 9 members of TWICE?</p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 items-center max-w-3xl mx-auto">
        {/* Score Card */}
        <div className="md:order-2 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md flex-1 text-center border border-purple-100">
              <span className="block text-xs text-purple-500 uppercase font-bold tracking-wider">Score</span>
              <span className="text-3xl font-bold text-purple-900">{score}</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md flex-1 text-center border border-purple-100">
              <span className="block text-xs text-purple-500 uppercase font-bold tracking-wider">Streak</span>
              <span className="text-3xl font-bold text-pink-500">🔥 {streak}</span>
            </div>
          </div>

          <form onSubmit={handleGuess} className="glass-card p-6 rounded-2xl space-y-4">
             <div className="space-y-2">
               <label className="text-sm font-medium text-purple-900 ml-1">Who is this?</label>
               <div className="flex gap-2">
                 <Input 
                   value={guess}
                   onChange={(e) => {
                     setGuess(e.target.value);
                     setStatus("idle");
                   }}
                   placeholder="Type name here..."
                   className={cn(
                     "border-2 h-12 text-lg focus-visible:ring-0",
                     status === "correct" && "border-green-500 bg-green-50",
                     status === "wrong" && "border-red-500 bg-red-50 animate-shake"
                   )}
                 />
                 <Button type="submit" size="icon" className="h-12 w-12 shrink-0 bg-purple-600 hover:bg-purple-700">
                   <CheckCircle className="w-5 h-5" />
                 </Button>
               </div>
             </div>

             {status === "correct" && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-green-600 font-bold flex items-center gap-2 justify-center"
               >
                 <CheckCircle className="w-5 h-5" /> Correct! It's {currentMember.name}!
               </motion.div>
             )}

             {status === "wrong" && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-red-500 font-bold flex items-center gap-2 justify-center"
               >
                 <XCircle className="w-5 h-5" /> Try again!
               </motion.div>
             )}

             <div className="pt-2 flex justify-between items-center">
               <Button 
                 type="button" 
                 variant="ghost" 
                 className="text-purple-600 hover:bg-purple-50 text-xs"
                 onClick={() => setShowHint(!showHint)}
               >
                 <HelpCircle className="w-3 h-3 mr-1" />
                 {showHint ? "Hide Hint" : "Need a Hint?"}
               </Button>
               
               <Button 
                 type="button" 
                 variant="ghost" 
                 className="text-gray-400 hover:text-purple-600 text-xs"
                 onClick={startNewRound}
               >
                 <Shuffle className="w-3 h-3 mr-1" /> Skip
               </Button>
             </div>

             <AnimatePresence>
               {showHint && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: "auto", opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm text-yellow-800 mt-2">
                     💡 Hint: {currentMember.hints[Math.floor(Math.random() * currentMember.hints.length)]}
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </form>
        </div>

        {/* Image Card */}
        <div className="md:order-1 flex justify-center">
           <motion.div
             key={currentMember.id}
             initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
             animate={{ scale: 1, opacity: 1, rotate: 0 }}
             transition={{ type: "spring", bounce: 0.4 }}
             className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
           >
             <img 
               src={currentMember.image} 
               alt="Guess the member" 
               className="w-full h-full object-cover"
             />
             
             {/* Overlay for suspense - optional, currently clear */}
             <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent pointer-events-none" />
           </motion.div>
        </div>
      </div>
    </div>
  );
}
