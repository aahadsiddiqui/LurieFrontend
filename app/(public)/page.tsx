'use client';

import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginRequest } from '@/lib/msal';
import { LogIn, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  // For testing UI without Azure config
  const isConfigured = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID && 
                      !process.env.NEXT_PUBLIC_AZURE_CLIENT_ID.includes('your-');

  // Only use MSAL if configured
  const msalHook = isConfigured ? useMsal() : null;
  const router = useRouter();

  useEffect(() => {
    if (isConfigured && msalHook) {
      const { accounts, inProgress } = msalHook;
      if (!inProgress && accounts.length > 0) {
        router.push('/episodes');
      }
    }
  }, [isConfigured, msalHook, router]);

  const handleSignIn = () => {
    if (isConfigured && msalHook) {
      msalHook.instance.loginRedirect(loginRequest);
    } else {
      alert('Please configure Azure settings in .env.local first');
    }
  };

  // Show loading only if configured and MSAL is in progress
  if (isConfigured && msalHook && msalHook.inProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we set up your session.</p>
        </div>
      </div>
    );
  }

  // Show landing page even if not configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Hero section */}
            <div className="mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl font-bold tracking-tight mb-6"
              >
                Welcome to{' '}
                <span className="text-primary">Lurie</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                A modern, secure platform for data analysis and insights. 
                Sign in with your Microsoft account to get started.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  size="lg"
                  onClick={handleSignIn}
                  className="text-lg px-8 py-6"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign in with Microsoft
                </Button>
              </motion.div>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Secure Access</CardTitle>
                  <CardDescription>
                    Enterprise-grade security with Microsoft Entra ID integration
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Fast & Modern</CardTitle>
                  <CardDescription>
                    Built with Next.js 14 and the latest web technologies
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <LogIn className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Easy Sign In</CardTitle>
                  <CardDescription>
                    Single sign-on with your existing Microsoft account
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Hero section */}
          <div className="mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight mb-6"
            >
              Welcome to{' '}
              <span className="text-primary">Lurie</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              A modern, secure platform for data analysis and insights. 
              Sign in with your Microsoft account to get started.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={handleSignIn}
                className="text-lg px-8 py-6"
              >
                <LogIn className="mr-2 h-5 w-5" />
                Sign in with Microsoft
              </Button>
            </motion.div>
          </div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Secure Access</CardTitle>
                <CardDescription>
                  Enterprise-grade security with Microsoft Entra ID integration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Fast & Modern</CardTitle>
                <CardDescription>
                  Built with Next.js 14 and the latest web technologies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <LogIn className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Easy Sign In</CardTitle>
                <CardDescription>
                  Single sign-on with your existing Microsoft account
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
