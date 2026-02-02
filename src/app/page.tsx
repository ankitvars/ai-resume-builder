import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';
import Grid from '@mui/material/GridLegacy';
import Typography from '@mui/material/Typography';

type FeatureId = 'ai' | 'portfolio' | 'integrations';

type Feature = {
  id: FeatureId;
  title: string;
  description: string;
};

export default function HomePage() {
  const features: Feature[] = [
    {
      id: 'ai',
      title: 'AI Resume Builder',
      description: 'Generate ATS-friendly resumes tailored to specific roles.'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Websites',
      description: 'Create and deploy a clean developer portfolio in minutes.'
    },
    {
      id: 'integrations',
      title: 'Smart Imports',
      description: 'Import data from GitHub and LinkedIn automatically.'
    }
  ];


  return (
    <>
      <Header />
      <Hero />
      <Box component="section" py={{ xs: 6, md: 12 }} bgcolor="background.default">
        <Container maxWidth="lg">
          <Typography variant="h5" component="h2" gutterBottom fontWeight={700}>
            What you get
          </Typography>

          <Grid container spacing={3}>
            {features.map((f, index) => (
              <Grid key={f.id} item xs={12} sm={6} md={4}>
                <FeatureCard
                  id={f.id}
                  title={f.title}
                  description={f.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
