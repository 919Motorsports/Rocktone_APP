
      import React from 'react';
      import { Link } from 'react-router-dom';
      import { motion } from 'framer-motion';
      import { Button } from '@/components/ui/button';
      import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
      import { usePlayerData } from '@/hooks/usePlayerData';
      import { ArrowLeft, UserCog } from 'lucide-react'; // Icons

      const AdminPage = () => {
        const { getAllPlayers } = usePlayerData();
        const allPlayers = getAllPlayers(); // Get all player data

        // NOTE: This is NOT secure. In a real application, this page
        // MUST be protected by proper authentication and authorization.
        // This is just a placeholder to display the collected data.

         const formatDate = (isoString) => {
            if (!isoString) return 'N/A';
            try {
                return new Date(isoString).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                });
            } catch (e) {
                return 'Invalid Date';
            }
        };


        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen p-4"
          >
            <Card className="w-full max-w-3xl bg-opacity-95 backdrop-blur-sm border-secondary/30">
              <CardHeader className="text-center">
                 <UserCog className="mx-auto h-12 w-12 text-secondary-foreground mb-3" />
                <CardTitle className="text-3xl">Admin Backstage</CardTitle>
                 <p className="text-muted-foreground font-sans">(DEV ONLY - Unsecured)</p>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto font-sans">
                {allPlayers.length === 0 ? (
                  <p className="text-muted-foreground text-center">No players yet.</p>
                ) : (
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-border">
                      <table className="w-full text-sm text-left text-gray-400">
                          <thead className="text-xs text-gray-300 uppercase bg-secondary/50">
                              <tr>
                                  <th scope="col" className="px-6 py-3">Name</th>
                                  <th scope="col" className="px-6 py-3">Email</th>
                                  <th scope="col" className="px-6 py-3">Score</th>
                                  <th scope="col" className="px-6 py-3">Completed At</th>
                              </tr>
                          </thead>
                          <tbody>
                              {allPlayers.map((player, index) => (
                                  <tr key={player.id || index} className="border-b bg-card/80 border-gray-700 hover:bg-muted/50">
                                      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                          {player.name}
                                      </th>
                                      <td className="px-6 py-4">{player.email}</td>
                                      <td className="px-6 py-4 font-bold text-primary">{player.score}</td>
                                      <td className="px-6 py-4 text-xs">{formatDate(player.completionTime)}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
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

      export default AdminPage;
  