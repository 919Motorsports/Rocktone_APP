
      import React, { useState } from 'react';
      import { useNavigate } from 'react-router-dom';
      import { motion } from 'framer-motion';
      import { Button } from '@/components/ui/button';
      import { Input } from '@/components/ui/input';
      import { Label } from '@/components/ui/label';
      import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
      import { useToast } from '@/components/ui/use-toast';
      import { usePlayerData } from '@/hooks/usePlayerData'; // Assuming hook manages player data

      const LoginPage = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const navigate = useNavigate();
        const { toast } = useToast();
        const { loginUser } = usePlayerData();

        const handleSubmit = (e) => {
          e.preventDefault();
          if (!name.trim() || !email.trim()) {
            toast({
              title: "Hold On, Rockstar!",
              description: "Name and email can't be empty.",
              variant: "destructive",
            });
            return;
          }

          // Basic email validation (optional but recommended)
          if (!/\S+@\S+\.\S+/.test(email)) {
             toast({
              title: "Check Your Email",
              description: "Please enter a valid email address.",
              variant: "destructive",
            });
            return;
          }


          const loginResult = loginUser(name, email);

          if (loginResult.success) {
            toast({
              title: `Welcome, ${loginResult.user.name}!`,
              description: `Get ready to rock! Your 15% discount code: ${loginResult.discountCode}`, // Display code immediately
            });
            // Optional: email the code in a real app using a backend service
            navigate('/trivia'); // Navigate to the trivia page
          } else {
              toast({
                title: "Login Failed",
                description: loginResult.message || "Could not log you in. Please try again.",
                variant: "destructive",
             });
          }
        };

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen p-4"
          >
            <Card className="w-full max-w-md bg-opacity-90 backdrop-blur-sm border-primary/30">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl mb-2">RockTone Trivia</CardTitle>
                <p className="text-muted-foreground font-sans">Enter the Arena!</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg">Stage Name (Your Name)</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g., Axel Rose"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg">Contact (Email)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-lg"
                    />
                  </div>
                   <Button type="submit" className="w-full text-lg" size="lg">
                    Enter the Mosh Pit
                  </Button>
                </form>
              </CardContent>
               <CardFooter className="flex justify-center text-xs text-muted-foreground mt-4">
                   <p>Login to play & get your 15% merch discount!</p>
               </CardFooter>
            </Card>
          </motion.div>
        );
      };

      export default LoginPage;
  