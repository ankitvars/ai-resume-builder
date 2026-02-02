import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/GridLegacy';
import Typography from '@mui/material/Typography';

type Stat = {
  value: string;
  label: string;
};

export default function StatsSection() {
  const stats: Stat[] = [
    { value: '10K+', label: 'Resumes Generated' },
    { value: '5K+', label: 'Portfolios Created' },
    { value: '95%', label: 'User Satisfaction' },
    { value: '24/7', label: 'AI Assistance' }
  ];

  return (
    <Box
      component="section"
      py={{ xs: 6, md: 10 }}
      bgcolor="primary.main"
      color="primary.contrastText"
    >
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight={700}
          textAlign="center"
          mb={6}
        >
          Trusted by Thousands of Professionals
        </Typography>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid key={index} item xs={6} md={3}>
              <Box textAlign="center">
                <Typography variant="h3" component="div" fontWeight={700} gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body1">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}