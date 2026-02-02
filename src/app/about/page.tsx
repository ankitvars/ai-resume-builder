import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/GridLegacy';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PeopleIcon from '@mui/icons-material/People';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

type Value = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

type Milestone = {
  year: string;
  title: string;
  description: string;
};

export default function AboutPage() {
  const values: Value[] = [
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 40 }} />,
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI technology to solve real problems faced by job seekers worldwide.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'User-Centered',
      description: 'Every feature we build starts with understanding our users\' needs and pain points.'
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
      title: 'Accessibility',
      description: 'Professional career tools should be available to everyone, regardless of their background or budget.'
    }
  ];

  const team: TeamMember[] = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-founder',
      bio: 'Former tech recruiter with 10+ years of experience. Passionate about making job search easier for everyone.'
    },
    {
      name: 'Sarah Martinez',
      role: 'CTO & Co-founder',
      bio: 'AI/ML expert with a background in NLP. Previously led engineering teams at major tech companies.'
    },
    {
      name: 'David Park',
      role: 'Head of Product',
      bio: 'Product designer focused on creating intuitive experiences. Former design lead at top SaaS companies.'
    },
    {
      name: 'Emily Johnson',
      role: 'Head of Growth',
      bio: 'Marketing strategist with expertise in helping people discover and use career tools effectively.'
    }
  ];

  const milestones: Milestone[] = [
    {
      year: '2023',
      title: 'Founded',
      description: 'Started with a simple idea: make resume building easier with AI'
    },
    {
      year: '2024',
      title: 'Product Launch',
      description: 'Launched our AI resume builder to the public with portfolio features'
    },
    {
      year: '2024',
      title: '10K Users',
      description: 'Reached 10,000 users and generated over 15,000 resumes'
    },
    {
      year: '2025',
      title: 'Expansion',
      description: 'Added enterprise features and expanded to international markets'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us | AI Resume Builder - Our Mission & Team</title>
        <meta
          name="description"
          content="Learn about AI Resume Builder's mission to help job seekers create professional resumes and portfolios. Meet our team and discover our story."
        />
        <meta
          name="keywords"
          content="about AI resume builder, company mission, team, career tools, resume builder team"
        />
        <link rel="canonical" href="https://yoursite.com/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Us | AI Resume Builder" />
        <meta property="og:description" content="Our mission is to help everyone create professional resumes and portfolios with AI-powered tools." />
        <meta property="og:type" content="website" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AI Resume Builder',
              description: 'AI-powered resume and portfolio builder',
              foundingDate: '2023',
              founders: [
                {
                  '@type': 'Person',
                  name: 'Alex Chen'
                },
                {
                  '@type': 'Person',
                  name: 'Sarah Martinez'
                }
              ]
            })
          }}
        />
      </Head>

      <Box component="main">
        <Header />

        {/* Hero Section */}
        <Box
          component="section"
          py={{ xs: 8, md: 12 }}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              fontWeight={700}
              textAlign="center"
            >
              About AI Resume Builder
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ opacity: 0.95 }}
            >
              We&apos;re on a mission to make professional career tools accessible to everyone,
              helping job seekers land their dream jobs with AI-powered resumes and portfolios.
            </Typography>
          </Container>
        </Box>

        {/* Mission Section */}
        <Box component="section" py={{ xs: 6, md: 12 }} bgcolor="background.default">
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                  Our Mission
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  In today&apos;s competitive job market, having a professional resume and online presence
                  is crucial. Yet, many talented individuals struggle with creating compelling application
                  materials that showcase their skills effectively.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We founded AI Resume Builder to solve this problem. By combining advanced AI technology
                  with years of recruiting experience, we&apos;ve created tools that help anyone create
                  professional, ATS-friendly resumes and portfolios in minutes, not hours.
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our goal is simple: empower every job seeker with the tools they need to succeed,
                  regardless of their background, experience level, or budget.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'grey.100',
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    [Mission Image Placeholder]
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Values Section */}
        <Box component="section" py={{ xs: 6, md: 12 }} bgcolor="background.paper">
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight={700}
              textAlign="center"
              mb={6}
            >
              Our Values
            </Typography>

            <Grid container spacing={4}>
              {values.map((value, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 2,
                          bgcolor: 'primary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1.5rem'
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Box component="section" py={{ xs: 6, md: 12 }} bgcolor="background.default">
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight={700}
              textAlign="center"
              mb={2}
            >
              Meet Our Team
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              mb={6}
              maxWidth="700px"
              mx="auto"
            >
              We&apos;re a diverse team of engineers, designers, and career experts dedicated to
              helping you succeed in your job search.
            </Typography>

            <Grid container spacing={4}>
              {team.map((member, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Card sx={{ height: '100%', textAlign: 'center' }}>
                    <CardContent>
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          margin: '0 auto 1rem',
                          bgcolor: 'primary.main',
                          fontSize: '2rem',
                          fontWeight: 700
                        }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                        {member.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        gutterBottom
                        fontWeight={600}
                      >
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Timeline Section */}
        <Box component="section" py={{ xs: 6, md: 12 }} bgcolor="background.paper">
          <Container maxWidth="md">
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight={700}
              textAlign="center"
              mb={6}
            >
              Our Journey
            </Typography>

            <Box sx={{ position: 'relative', pl: { xs: 2, md: 4 } }}>
              {/* Timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 0, md: 15 },
                  top: 0,
                  bottom: 0,
                  width: 2,
                  bgcolor: 'primary.main'
                }}
              />

              {milestones.map((milestone, index) => (
                <Box key={index} sx={{ mb: 4, position: 'relative' }}>
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: { xs: -10, md: 5 },
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      border: '4px solid',
                      borderColor: 'background.paper'
                    }}
                  />

                  <Box sx={{ ml: { xs: 3, md: 6 } }}>
                    <Typography variant="overline" color="primary" fontWeight={700}>
                      {milestone.year}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {milestone.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box
          component="section"
          py={{ xs: 8, md: 12 }}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Container maxWidth="md">
            <Box textAlign="center">
              <Typography variant="h3" component="h2" gutterBottom fontWeight={700}>
                Join Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ opacity: 0.95 }}>
                We&apos;re always looking for talented individuals who share our passion for
                helping people succeed in their careers.
              </Typography>
              <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap" mt={4}>
                <Box
                  component="a"
                  href="/careers"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    borderRadius: 1,
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-block',
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  View Open Positions
                </Box>
                <Box
                  component="a"
                  href="/contact"
                  sx={{
                    border: '2px solid white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 1,
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-block',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Get in Touch
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Footer />
      </Box>
    </>
  );
}