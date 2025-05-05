
    import React from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { usePlayerData } from '@/hooks/usePlayerData';
    import { Award, Repeat, Share2, Trophy } from 'lucide-react'; // Icons
    import { useGameLogic } from '@/hooks/useGameLogic'; // To reset game


    const ScorePage = () => {
      const { currentUser, score } = usePlayerData(); // Get score from player data context now
      const { resetGame } = useGameLogic(); // Get reset function
      const navigate = useNavigate();

      // In a real app, this would generate a share link or use Web Share API
      const handleShare = () => {
        const shareText = `I rocked the RockTone Trivia challenge with a score of ${score}! Can you beat me? #RockToneTrivia`;
        if (navigator.share) {
          navigator.share({
            title: 'RockTone Trivia Score!',
            text: shareText,
            // url: window.location.origin, // Optional: Link to the game
          }).catch((error) => console.log('Error sharing', error));
        } else {
          // Fallback for browsers that don't support Web Share API
          navigator.clipboard.writeText(shareText).then(() => {
             alert('Score copied to clipboard! Share it with your friends.');
          });
        }
      };

      const handlePlayAgain = () => {
          resetGame(); // Reset game state
          navigate('/trivia'); // Go back to trivia start
      };


      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-screen p-4"
        >
          <Card className="w-full max-w-md text-center bg-opacity-90 backdrop-blur-sm border-primary/30">
            <CardHeader>
              <Award className="mx-auto h-16 w-16 text-yellow-400 mb-4" />
              <CardTitle className="text-4xl mb-2">Final Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-6xl font-bold text-primary">{score ?? 'N/A'}</p>
              <p className="text-xl text-muted-foreground font-sans">
                {currentUser ? `Great job, ${currentUser.name}!` : "Well played!"}
              </p>
              {/* Placeholder for contest winner info */}
              <p className="text-sm text-accent-foreground/70 font-sans">
                  Check the leaderboard! Highest score this week wins a free RockTone T-Shirt!
              </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-around gap-4 mt-6">
               <Button onClick={handlePlayAgain} variant="secondary" size="lg">
                  <Repeat className="mr-2 h-5 w-5" /> Play Again
               </Button>
               <Button onClick={handleShare} variant="default" size="lg">
                   <Share2 className="mr-2 h-5 w-5" /> Share Score
               </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/leaderboard">
                      <Trophy className="mr-2 h-5 w-5" /> Leaderboard
                  </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default ScorePage;
  