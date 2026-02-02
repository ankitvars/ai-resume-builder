import Box from '@mui/material/Box';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/sections/FeatureSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialSection';
import CTASection from '@/components/sections/CTASection';
import FAQSection from '@/components/sections/FAQSection';
import PricingSection from '@/components/sections/PricingSection';
import TrustedBySection from '@/components/sections/TrustedBySection';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>AI Resume Builder & Portfolio Generator | Build ATS-Friendly Resumes in Minutes</title>
        <meta
          name="description"
          content="Create professional, ATS-optimized resumes and stunning developer portfolios with AI. Import from GitHub & LinkedIn. Free templates, instant deployment, and smart formatting."
        />
        <meta
          name="keywords"
          content="AI resume builder, ATS resume, portfolio generator, developer portfolio, resume maker, free resume builder, CV creator, GitHub portfolio, LinkedIn resume"
        />
        <meta property="og:title" content="AI Resume Builder & Portfolio Generator" />
        <meta
          property="og:description"
          content="Build professional resumes and portfolios in minutes with AI-powered tools. Optimize for ATS, import from GitHub & LinkedIn."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Resume Builder & Portfolio Generator" />
        <meta
          name="twitter:description"
          content="Create ATS-friendly resumes and developer portfolios with AI assistance"
        />
        <link rel="canonical" href="https://yoursite.com" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'AI Resume Builder & Portfolio Generator',
              applicationCategory: 'BusinessApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '10000'
              }
            })
          }}
        />
      </Head>

      <Box component="main">
        <Header />
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <TrustedBySection />
        <StatsSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </Box>
    </>
  );
}