import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/GridLegacy';
import Typography from '@mui/material/Typography';
import FeatureCard from '@/components/sections/FeatureCard';

type FeatureId = 'ai' | 'portfolio' | 'integrations';

type Feature = {
  id: FeatureId;
  title: string;
  description: string;
};

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      id: 'ai',
      title: 'AI Resume Builder',
      description: 'Generate ATS-friendly resumes tailored to specific roles using advanced AI technology.'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Websites',
      description: 'Create and deploy a clean, professional developer portfolio in minutes with custom domains.'
    },
    {
      id: 'integrations',
      title: 'Smart Imports',
      description: 'Import data from GitHub and LinkedIn automatically to build your professional profile faster.'
    }
  ];

  return (
    <Box
      component="section"
      py={{ xs: 6, md: 12 }}
      bgcolor="background.default"
      id="features"
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          fontWeight={700}
          textAlign="center"
          mb={2}
        >
          Powerful Features for Your Career Success
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={6}
          maxWidth="800px"
          mx="auto"
        >
          Everything you need to create professional resumes and portfolios that get you noticed by recruiters and hiring managers.
        </Typography>

        <Grid container spacing={3}>
          {features.map((f) => (
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
  );
}