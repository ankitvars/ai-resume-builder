'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/GridLegacy';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro');
  const plans: PricingPlan[] = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '1 AI-generated resume',
        'Basic portfolio website',
        'PDF & DOCX downloads',
        'GitHub integration',
        'Standard templates'
      ],
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: '₹149',
      period: 'per month',
      description: 'For serious job seekers',
      features: [
        'Unlimited AI resumes',
        'Premium portfolio themes',
        'Custom domain support',
        'LinkedIn integration',
        'Priority support',
        'ATS optimization tools',
        'Cover letter generator',
        'No watermarks'
      ],
      highlighted: true,
      cta: 'Start Pro Trial'
    },
    {
      name: 'Teams',
      price: '₹499',
      period: 'per month',
      description: 'For recruiters and agencies',
      features: [
        'Everything in Pro',
        'Up to 10 team members',
        'Candidate tracking',
        'Bulk resume generation',
        'White-label options',
        'API access',
        'Dedicated account manager',
        'Custom integrations'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <Box
      component="section"
      py={{ xs: 6, md: 12 }}
      bgcolor="background.paper"
      id="pricing"
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
          Simple, Transparent Pricing
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={6}
          maxWidth="700px"
          mx="auto"
        >
          Choose the plan that fits your needs. All plans include core features with no hidden fees.
        </Typography>

        <Grid container spacing={3} alignItems="stretch">
          {plans.map((plan, index) => (
            <Grid key={index} item xs={12} md={4}>
              <Card
                onClick={() => setSelectedPlan(plan.name)}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: selectedPlan === plan.name ? 2 : 1,
                  borderColor:
                    selectedPlan === plan.name ? 'primary.main' : 'divider',
                  boxShadow:
                    selectedPlan === plan.name ? 6 : 1,
                  position: 'relative'
                }}
              >
                {plan.highlighted && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      my: 2
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                    {plan.name}
                  </Typography>
                  <Box mb={2}>
                    <Typography variant="h3" component="div" fontWeight={700} display="inline">
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" display="inline">
                      /{plan.period}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {plan.description}
                  </Typography>

                  <List dense sx={{ mb: 3 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} disableGutters>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box mt="auto">
                    <Button
                      variant={plan.highlighted ? 'contained' : 'outlined'}
                      color="primary"
                      fullWidth
                      size="large"
                    >
                      {plan.cta}
                    </Button>
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