
    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { useGameLogic } from '@/hooks/useGameLogic';
    import { usePlayerData } from '@/hooks/usePlayerData'; // To save score at the end
    import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react'; // Icons

    const TriviaPage = () => {
      const {
        currentQuestion,
        currentQuestionIndex,
        score,
        userAnswers,
        handleAnswer,
        gamePhase,
        showBonusPrompt,
        startBonusRound,
        skipBonusRound,
        totalStandardQuestions,
        isBonusRound,
      } = useGameLogic();
      const { currentUser, savePlayerScore } = usePlayerData();
      const navigate = useNavigate();

      React.useEffect(() => {
        if (gamePhase === 'finished') {
          if (currentUser) {
            savePlayerScore(currentUser, score);
          }
          navigate('/score'); // Navigate to score page when finished
        }
      }, [gamePhase, navigate, currentUser, savePlayerScore, score]);

      if (!currentQuestion && gamePhase !== 'finished' && !showBonusPrompt) {
          // Handle loading state or error if needed
          return <div className="flex justify-center items-center min-h-screen"><p className="text-xl font-sans">Loading questions...</p></div>;
      }


      const getButtonVariant = (option) => {
          const answered = userAnswers[currentQuestion.id];
          if (!answered) return 'secondary'; // Default state
          if (option === answered) {
              return option === currentQuestion.correctAnswer ? 'default' : 'destructive'; // User's choice, correct or wrong
          }
          if (option === currentQuestion.correctAnswer) {
              return 'default'; // Show correct answer if user was wrong
          }
          return 'secondary'; // Other options remain secondary
      };

      const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
      };


      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <AnimatePresence mode="wait">
                {showBonusPrompt ? (
                    <motion.div
                        key="bonus-prompt"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-lg"
                    >
                        <Card className="text-center bg-opacity-90 backdrop-blur-sm border-primary/50">
                            <CardHeader>
                                <CardTitle className="text-3xl">Encore?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 font-sans">
                                <p>You've rocked the main set! Score: {score}</p>
                                <p>Ready for 3 tougher bonus questions?</p>
                                <p className="text-yellow-400 font-bold">Correct: +{BONUS_POINTS_CORRECT} points!</p>
                                <p className="text-red-500 font-bold">Wrong: -{Math.abs(BONUS_POINTS_WRONG)} points!</p>
                            </CardContent>
                            <CardFooter className="flex justify-around">
                                <Button onClick={startBonusRound} size="lg" variant="default">Bring it On!</Button>
                                <Button onClick={skipBonusRound} size="lg" variant="destructive">No Thanks, Finish</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ) : currentQuestion && gamePhase !== 'finished' ? (
                    <motion.div
                        key={currentQuestion.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full max-w-2xl"
                    >
                        <Card className="bg-opacity-90 backdrop-blur-sm border-secondary/30">
                            <CardHeader>
                                <div className="flex justify-between items-center mb-4 font-sans">
                                    <span className="text-lg font-bold text-primary">
                                        Question {isBonusRound ? 'Bonus ' + (currentQuestionIndex - totalStandardQuestions + 1) : currentQuestionIndex + 1}
                                        {isBonusRound && <span className="text-yellow-400 ml-2">(Bonus!)</span>}
                                    </span>
                                    <span className="text-xl font-bold text-accent-foreground/80">Score: {score}</span>
                                </div>
                                <CardTitle className="text-2xl md:text-3xl text-center mb-6">{currentQuestion.imagePrompt}</CardTitle>
                                <div className="flex justify-center mb-6 h-48 md:h-64 bg-black/30 rounded-md items-center border border-dashed border-muted">
                                     <img
                                        className="max-h-full max-w-full object-contain rounded"
                                        alt={currentQuestion.imagePrompt}
                                        src={currentQuestion.imageUrl || "https://images.unsplash.com/photo-1632998772668-afc7ae2bc054"}
                                     />
                                </div>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.options.map((option, index) => (
                                <Button
                                    key={index}
                                    variant={getButtonVariant(option)}
                                    size="lg"
                                    className={`w-full text-left justify-start p-4 h-auto text-base font-sans ${userAnswers[currentQuestion.id] ? 'opacity-80 pointer-events-none' : ''}`}
                                    onClick={() => handleAnswer(currentQuestion.id, option)}
                                    disabled={!!userAnswers[currentQuestion.id]}
                                >
                                    {userAnswers[currentQuestion.id] && option === currentQuestion.correctAnswer && <CheckCircle className="mr-2 h-5 w-5 text-green-400" />}
                                    {userAnswers[currentQuestion.id] && option !== currentQuestion.correctAnswer && option === userAnswers[currentQuestion.id] && <AlertCircle className="mr-2 h-5 w-5 text-red-400" />}
                                    {!userAnswers[currentQuestion.id] && <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground" />}
                                    {option}
                                </Button>
                                ))}
                            </CardContent>
                        </Card>
                     </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
      );
    };

    // Dummy points constants needed for the bonus prompt text
    const BONUS_POINTS_CORRECT = 20;
    const BONUS_POINTS_WRONG = -10;

    export default TriviaPage;
  