
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
    import { usePlayerData } from '@/hooks/usePlayerData';
    import { Trophy, ArrowLeft } from 'lucide-react'; // Icons

    const LeaderboardPage = () => {
      const { getLeaderboard } = usePlayerData();
      const leaderboard = getLeaderboard(3); // Get top 3 players

      const formatDate = (isoString) => {
          if (!isoString) return 'N/A';
          try {
              return new Date(isoString).toLocaleString(undefined, {
                  dateStyle: 'short',
                  timeStyle: 'short',
              });
          } catch (e) {
              return 'Invalid Date';
          }
      };

      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-screen p-4"
        >
          <Card className="w-full max-w-lg text-center bg-opacity-90 backdrop-blur-sm border-secondary/30">
            <CardHeader>
              <Trophy className="mx-auto h-12 w-12 text-yellow-400 mb-3" />
              <CardTitle className="text-4xl">Top Rockers</CardTitle>
              <p className="text-muted-foreground font-sans">Current High Scores</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderboard.length === 0 ? (
                <p className="text-muted-foreground font-sans">The stage is empty... Be the first!</p>
              ) : (
                <ul className="space-y-3 font-sans text-lg">
                  {leaderboard.map((player, index) => (
                    <motion.li
                      key={player.id || index} // Use id if available, fallback to index
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex justify-between items-center p-3 rounded-md ${
                        index === 0 ? 'bg-yellow-400/20 border border-yellow-500' :
                        index === 1 ? 'bg-gray-400/20 border border-gray-500' :
                        index === 2 ? 'bg-orange-600/20 border border-orange-700' : ''
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="font-bold mr-3 text-xl">{index + 1}.</span>
                        <span className="truncate max-w-[150px] sm:max-w-[200px]">{player.name}</span>
                      </span>
                       <div className="text-right">
                          <span className="font-bold text-primary text-xl">{player.score} pts</span>
                          <p className="text-xs text-muted-foreground">{formatDate(player.completionTime)}</p>
                       </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter className="flex justify-center mt-6">
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Back to Start
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      );
    };

    export default LeaderboardPage;
  