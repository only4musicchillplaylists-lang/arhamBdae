import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { Play, Pause, Music, Volume2, SkipForward, SkipBack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const [volume, setVolume] = useState(50);
  const [isMinimized, setIsMinimized] = useState(false);

  // YEJI "AIR" ID
  const videoId = "TamDOXponnM"; 

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: videoId, // Required for loop to work
    },
  };

  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.setVolume(volume);
    // Attempt autoplay (might be blocked by browser policy until interaction)
    event.target.playVideo();
  };

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (player) {
      player.setVolume(value[0]);
    }
  };

  const onStateChange = (event: any) => {
    // 1 is playing, 2 is paused
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="hidden">
        <YouTube videoId={videoId} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-80 glass-panel rounded-2xl p-4 flex flex-col gap-3 border border-white/40 shadow-xl backdrop-blur-md bg-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-slow shadow-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate text-purple-900">AIR</h4>
                <p className="text-xs text-purple-700 truncate">YEJI (ITZY)</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-white/20"
                onClick={() => setIsMinimized(true)}
              >
                <div className="w-3 h-1 bg-purple-800/50 rounded-full" />
              </Button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-900 hover:bg-white/20 hover:text-pink-600">
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md transition-transform active:scale-95"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-purple-900 hover:bg-white/20 hover:text-pink-600">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 px-1">
              <Volume2 className="w-3 h-3 text-purple-700" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="cursor-pointer"
              />
            </div>
            
            {/* Progress bar visual only */}
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden mt-1">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "100%" : "0%" }}
                transition={{ duration: 180, ease: "linear", repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 180 }}
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg border-2 border-white/50"
        >
          <Music className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </div>
  );
}
