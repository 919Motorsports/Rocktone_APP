
    import React, { useState, useCallback } from 'react';
    import questionsData from '@/data/questions';

    const STANDARD_QUESTIONS_COUNT = 10;
    const STANDARD_POINTS = 10;
    const BONUS_POINTS_CORRECT = 20;
    const BONUS_POINTS_WRONG = -10;

    export const useGameLogic = () => {
      const [questions] = useState(questionsData);
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [userAnswers, setUserAnswers] = useState({}); // { questionId: answer }
      const [showBonusPrompt, setShowBonusPrompt] = useState(false);
      const [gamePhase, setGamePhase] = useState('standard'); // 'standard', 'bonus', 'finished'
      const [isBonusRound, setIsBonusRound] = useState(false);


      const currentQuestion = questions[currentQuestionIndex];
      const isLastStandardQuestion = currentQuestionIndex === STANDARD_QUESTIONS_COUNT - 1;
      const isLastBonusQuestion = isBonusRound && currentQuestionIndex === questions.length - 1;


      const handleAnswer = useCallback((questionId, selectedAnswer) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));

        const question = questions.find(q => q.id === questionId);
        if (!question) return;

        let pointsEarned = 0;
        if (selectedAnswer === question.correctAnswer) {
          pointsEarned = isBonusRound ? BONUS_POINTS_CORRECT : STANDARD_POINTS;
        } else {
          pointsEarned = isBonusRound ? BONUS_POINTS_WRONG : 0;
        }

        setScore(prevScore => prevScore + pointsEarned);

        // Move to next question or phase
         if (isLastStandardQuestion && !isBonusRound) {
            setShowBonusPrompt(true); // Show prompt after last standard question
        } else if (isLastBonusQuestion) {
            setGamePhase('finished');
        }
         else {
             setTimeout(() => { // Add a small delay for visual feedback
                 setCurrentQuestionIndex(prevIndex => prevIndex + 1);
             }, 500); // 0.5 second delay
        }

      }, [questions, currentQuestionIndex, isBonusRound, isLastStandardQuestion, isLastBonusQuestion]);

       const startBonusRound = useCallback(() => {
        setShowBonusPrompt(false);
        setIsBonusRound(true);
        setGamePhase('bonus');
        setCurrentQuestionIndex(STANDARD_QUESTIONS_COUNT); // Start from the first bonus question
      }, []);

      const skipBonusRound = useCallback(() => {
          setShowBonusPrompt(false);
          setGamePhase('finished');
      }, []);


      const resetGame = useCallback(() => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers({});
        setShowBonusPrompt(false);
        setGamePhase('standard');
        setIsBonusRound(false);
      }, []);

      return {
        currentQuestion,
        currentQuestionIndex,
        score,
        userAnswers,
        handleAnswer,
        gamePhase,
        showBonusPrompt,
        startBonusRound,
        skipBonusRound,
        totalStandardQuestions: STANDARD_QUESTIONS_COUNT,
        totalQuestions: questions.length,
        isBonusRound,
        resetGame,
      };
    };

  