'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';

const iconMap: Record<string, React.ReactNode> = {
  ai: <AutoAwesomeOutlinedIcon />,
  portfolio: <PublicOutlinedIcon />,
  integrations: <SyncAltOutlinedIcon />
};

export default function FeatureCard({
  id,
  title,
  description
}: {
  id: 'ai' | 'portfolio' | 'integrations';
  title: string;
  description: string;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Box color="primary.main">{iconMap[id]}</Box>

          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
