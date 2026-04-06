import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy,
  Brain,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { riddles, type Riddle } from '@/data/riddles';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type GameState = 'playing' | 'correct' | 'wrong' | 'finished';

export function RiddleGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [usedHints, setUsedHints] = useState<Set<number>>(new Set());
  const [gameRiddles, setGameRiddles] = useState<Riddle[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<Set<number>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState<Set<number>>(new Set());

  // Initialize game with random riddles
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = useCallback(() => {
    const shuffled = [...riddles].sort(() => Math.random() - 0.5);
    setGameRiddles(shuffled.slice(0, 10));
    setCurrentIndex(0);
    setAnswer('');
    setGameState('playing');
    setScore(0);
    setShowHint(false);
    setUsedHints(new Set());
    setWrongAnswers(new Set());
    setCorrectAnswers(new Set());
  }, []);

  const currentRiddle = gameRiddles[currentIndex];

  const handleSubmit = useCallback(() => {
    if (!answer.trim() || gameState !== 'playing') return;

    const isCorrect = answer.trim().toLowerCase() === currentRiddle.answer.toLowerCase();
    
    if (isCorrect) {
      setGameState('correct');
      const hintPenalty = usedHints.has(currentRiddle.id) ? 0.5 : 1;
      setScore(prev => prev + 10 * hintPenalty);
      setCorrectAnswers(prev => new Set([...prev, currentRiddle.id]));
    } else {
      setGameState('wrong');
      setWrongAnswers(prev => new Set([...prev, currentRiddle.id]));
    }
  }, [answer, currentRiddle, gameState, usedHints]);

  const handleNext = useCallback(() => {
    if (currentIndex < gameRiddles.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setGameState('playing');
      setShowHint(false);
    } else {
      setGameState('finished');
    }
  }, [currentIndex, gameRiddles.length]);

  const handleShowHint = useCallback(() => {
    setShowHint(true);
    setUsedHints(prev => new Set([...prev, currentRiddle.id]));
  }, [currentRiddle]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (gameState === 'playing') {
        handleSubmit();
      } else if (gameState === 'correct' || gameState === 'wrong') {
        handleNext();
      }
    }
  }, [gameState, handleSubmit, handleNext]);

  if (gameRiddles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const totalRiddles = gameRiddles.length;
    const correctCount = correctAnswers.size;
    const wrongCount = wrongAnswers.size;
    const maxScore = totalRiddles * 10;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">游戏结束！</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">{correctCount}</div>
                <div className="text-sm text-green-700">答对</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">{wrongCount}</div>
                <div className="text-sm text-red-700">答错</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-blue-700">总分</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>正确率</span>
                <span className="font-bold">{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {percentage >= 80 ? '太棒了！你是字谜大师！🎉' : 
                 percentage >= 60 ? '不错哦！继续加油！💪' : 
                 '再接再厉，下次会更好！📚'}
              </p>
              <Button 
                size="lg" 
                onClick={startNewGame}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                再玩一次
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            <Brain className="w-4 h-4 mr-1" />
            {currentIndex + 1} / {gameRiddles.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Trophy className="w-4 h-4 mr-1" />
            {score} 分
          </Badge>
        </div>
      </div>

      <Progress 
        value={((currentIndex) / gameRiddles.length) * 100} 
        className="h-2"
      />

      {/* Riddle Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRiddle.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className={cn(
            "border-2 transition-colors duration-300",
            gameState === 'correct' && "border-green-500 bg-green-50/50",
            gameState === 'wrong' && "border-red-500 bg-red-50/50",
            gameState === 'playing' && "border-primary/20"
          )}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold leading-relaxed">
                {currentRiddle.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Hint Section */}
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-amber-900">提示</p>
                          <p className="text-amber-800">{currentRiddle.hint}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Answer Input */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="请输入答案..."
                    disabled={gameState !== 'playing'}
                    className={cn(
                      "text-center text-xl font-bold tracking-wider h-14",
                      gameState === 'correct' && "border-green-500 text-green-700",
                      gameState === 'wrong' && "border-red-500 text-red-700"
                    )}
                    maxLength={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {gameState === 'playing' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleShowHint}
                        disabled={showHint}
                        className="gap-2"
                      >
                        <Lightbulb className="w-4 h-4" />
                        {showHint ? '已使用提示' : '提示'}
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={!answer.trim()}
                        className="gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        提交答案
                      </Button>
                    </>
                  )}

                  {(gameState === 'correct' || gameState === 'wrong') && (
                    <Button 
                      onClick={handleNext}
                      className={cn(
                        "gap-2",
                        gameState === 'correct' ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                      )}
                    >
                      {currentIndex < gameRiddles.length - 1 ? (
                        <>
                          下一题
                          <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          查看结果
                          <Trophy className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Result Display */}
              <AnimatePresence>
                {gameState === 'correct' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-100 border border-green-300 rounded-lg text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-xl font-bold">回答正确！</span>
                    </div>
                    <p className="text-green-600 mt-2">{currentRiddle.explanation}</p>
                  </motion.div>
                )}

                {gameState === 'wrong' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-100 border border-red-300 rounded-lg text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-red-700">
                      <XCircle className="w-6 h-6" />
                      <span className="text-xl font-bold">回答错误</span>
                    </div>
                    <p className="text-red-600 mt-2">
                      正确答案是：<span className="font-bold text-2xl mx-2">{currentRiddle.answer}</span>
                    </p>
                    <p className="text-red-600 mt-1">{currentRiddle.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Restart Button */}
      <div className="text-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={startNewGame}
          className="text-muted-foreground"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          重新开始
        </Button>
      </div>
    </div>
  );
}
