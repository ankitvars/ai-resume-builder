import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function TrustedBySection() {
  const companies = [
    'Google',
    'Microsoft',
    'Amazon',
    'Meta',
    'Apple',
    'Netflix',
    'Spotify',
    'Adobe'
  ];

  return (
    <Box
      component="section"
      py={{ xs: 4, md: 6 }}
      bgcolor="background.paper"
    >
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          component="p"
          textAlign="center"
          color="text.secondary"
          mb={3}
          display="block"
        >
          Our users work at leading companies worldwide
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 3, md: 5 }}
        >
          {companies.map((company, index) => (
            <Box
              key={index}
              sx={{
                opacity: 0.6,
                transition: 'opacity 0.3s',
                '&:hover': {
                  opacity: 1
                }
              }}
            >
              <Typography
                variant="h6"
                component="span"
                fontWeight={600}
                color="text.secondary"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                {company}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Trusted by professionals from Fortune 500 companies and top tech startups
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}