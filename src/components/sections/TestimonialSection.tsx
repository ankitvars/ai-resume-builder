import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/GridLegacy';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
};

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer',
      company: 'Tech Corp',
      content: 'This tool helped me land my dream job. The AI-generated resume was perfectly tailored to the role I was applying for.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      content: 'I created a professional portfolio in under 10 minutes. The GitHub integration saved me hours of manual work.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Frontend Developer',
      company: 'Design Studios',
      content: 'The ATS-friendly resumes actually work. I got 3x more interview callbacks after using this platform.',
      rating: 5
    }
  ];

  return (
    <Box
      component="section"
      py={{ xs: 6, md: 12 }}
      bgcolor="background.default"
      id="testimonials"
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
          What Our Users Say
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={6}
          maxWidth="700px"
          mx="auto"
        >
          Join thousands of successful job seekers who have transformed their careers with our platform.
        </Typography>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid key={index} item xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" gap={0.5} mb={2}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: 'warning.main', fontSize: '1.2rem' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {testimonial.content}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.role} at {testimonial.company}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}