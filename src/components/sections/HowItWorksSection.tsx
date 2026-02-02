import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/GridLegacy';
import Typography from '@mui/material/Typography';

type Step = {
  number: number;
  title: string;
  description: string;
};

export default function HowItWorksSection() {
  const steps: Step[] = [
    {
      number: 1,
      title: 'Connect Your Accounts',
      description: 'Link your GitHub and LinkedIn to import your professional data automatically. No manual data entry required.'
    },
    {
      number: 2,
      title: 'Customize Your Content',
      description: 'Use AI to generate tailored resumes and portfolios that match your target roles. Choose from professional templates.'
    },
    {
      number: 3,
      title: 'Deploy & Share',
      description: 'Publish your portfolio with a custom domain and download your resume in PDF, DOCX, or other formats instantly.'
    }
  ];

  return (
    <Box
      component="section"
      py={{ xs: 6, md: 12 }}
      bgcolor="background.paper"
      id="how-it-works"
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
          How It Works
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={6}
          maxWidth="700px"
          mx="auto"
        >
          Get started in three simple steps. Build your professional brand in minutes, not hours.
        </Typography>

        <Grid container spacing={4}>
          {steps.map((step) => (
            <Grid key={step.number} item xs={12} md={4}>
              <Box textAlign="center">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: '0 auto 1rem'
                  }}
                >
                  {step.number}
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}