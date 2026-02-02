import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: 'What is an ATS-friendly resume?',
      answer: 'An ATS (Applicant Tracking System) friendly resume is formatted to be easily read by automated systems that companies use to screen applications. Our AI ensures your resume uses proper formatting, keywords, and structure to pass ATS screening and reach human recruiters.'
    },
    {
      question: 'Can I customize the generated resume?',
      answer: 'Yes! Our AI generates a tailored resume based on your profile and target role, but you have full control to edit, customize, and refine every section. Choose from multiple professional templates and adjust content to match your personal brand.'
    },
    {
      question: 'How does the GitHub integration work?',
      answer: 'Connect your GitHub account to automatically import your repositories, contributions, and technical skills. Our system analyzes your projects and presents them professionally in your resume and portfolio, saving you hours of manual work.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade encryption to protect your data. Your information is stored securely and we never share your personal information with third parties. You maintain full control and can delete your data at any time.'
    },
    {
      question: 'What file formats can I download my resume in?',
      answer: 'You can download your resume in multiple formats including PDF, DOCX (Microsoft Word), and TXT. PDF is recommended for most applications as it preserves formatting across all devices and platforms.'
    },
    {
      question: 'Can I create multiple resumes for different jobs?',
      answer: 'Yes! Create unlimited resumes tailored to different roles, industries, or companies. Our AI helps you optimize each resume for specific job descriptions, increasing your chances of getting interviews.'
    },
    {
      question: 'How long does it take to create a portfolio?',
      answer: 'With our smart import features, you can have a professional portfolio deployed in under 10 minutes. The AI automatically generates content from your GitHub and LinkedIn profiles, and you can customize the design to match your style.'
    },
    {
      question: 'Do I need coding knowledge to use this platform?',
      answer: 'Not at all! Our platform is designed for everyone, from non-technical professionals to experienced developers. The interface is intuitive and user-friendly, with step-by-step guidance throughout the process.'
    }
  ];

  return (
    <Box
      component="section"
      py={{ xs: 6, md: 12 }}
      bgcolor="background.default"
      id="faq"
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          fontWeight={700}
          textAlign="center"
          mb={2}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mb={6}
        >
          Everything you need to know about our AI resume builder and portfolio generator.
        </Typography>

        {faqs.map((faq, index) => (
          <Accordion key={index} sx={{ mb: 1 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-content-${index}`}
              id={`faq-header-${index}`}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Structured data for FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            })
          }}
        />
      </Container>
    </Box>
  );
}