import { RiddleGame } from '@/components/RiddleGame';
import { Toaster } from '@/components/ui/sonner';
import { Brain, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              猜字谜
            </h1>
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <BookOpen className="w-4 h-4" />
            挑战你的汉字智慧，解开谜题的乐趣
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8">
        <RiddleGame />
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-muted-foreground text-sm">
        <p>按 Enter 键快速提交答案或进入下一题</p>
      </footer>

      <Toaster />
    </div>
  );
}

export default App;
