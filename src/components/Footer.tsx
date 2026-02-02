'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/GridLegacy';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Roadmap', href: '/roadmap' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Templates', href: '/templates' },
        { label: 'Examples', href: '/examples' },
        { label: 'API Docs', href: '/docs' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
    { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box py={6}>
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                AI Resume Builder
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                paragraph
                sx={{ maxWidth: 300 }}
              >
                Create professional, ATS-friendly resumes and stunning developer portfolios with AI-powered tools.
              </Typography>

              {/* Social Links */}
              <Box display="flex" gap={1} mt={2}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    size="small"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <Grid key={section.title} item xs={6} sm={6} md={2}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  gutterBottom
                  color="text.primary"
                >
                  {section.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {section.links.map((link) => (
                    <Box component="li" key={link.label} sx={{ mb: 1 }}>
                      <Link
                        href={link.href}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                        >
                          {link.label}
                        </Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        {/* Bottom Footer */}
        <Box
          py={3}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Built with ❤️ using Next.js and Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}