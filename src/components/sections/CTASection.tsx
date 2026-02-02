import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function CTASection() {
  return (
    <Box
      component="section"
      py={{ xs: 8, md: 12 }}
      bgcolor="background.paper"
      id="get-started"
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
            Ready to Build Your Professional Brand?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph mb={4}>
            Join thousands of developers who have already created their perfect resume and portfolio. Start for free today and take control of your career.
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Button variant="contained" size="large" color="primary">
              Get Started Free
            </Button>
            <Button variant="outlined" size="large" color="primary">
              View Examples
            </Button>
          </Box>
          <Box mt={3} display="flex" gap={1} justifyContent="center" flexWrap="wrap">
            <Chip label="No credit card required" size="small" />
            <Chip label="Free forever" size="small" />
            <Chip label="Cancel anytime" size="small" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}