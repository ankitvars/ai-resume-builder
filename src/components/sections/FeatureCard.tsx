import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WebIcon from '@mui/icons-material/Web';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

type FeatureId = 'ai' | 'portfolio' | 'integrations';

type FeatureCardProps = {
  id: FeatureId;
  title: string;
  description: string;
};

const iconMap: Record<FeatureId, React.ReactNode> = {
  ai: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
  portfolio: <WebIcon sx={{ fontSize: 40 }} />,
  integrations: <IntegrationInstructionsIcon sx={{ fontSize: 40 }} />
};

const colorMap: Record<FeatureId, string> = {
  ai: '#6366f1',
  portfolio: '#8b5cf6',
  integrations: '#ec4899'
};

export default function FeatureCard({ id, title, description }: FeatureCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2,
            bgcolor: colorMap[id],
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {iconMap[id]}
        </Box>

        <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}