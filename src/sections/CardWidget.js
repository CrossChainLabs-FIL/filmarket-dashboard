import PropTypes from 'prop-types';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
import { percentFormat } from '../utils/format';
import Iconify from '../components/Iconify';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

CardWidget.propTypes = {
  chartColor: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  since: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default function CardWidget({ title, percent, since, value, chartColor }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle">{title}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle">
            {percent > 0 && '+'}
            {percentFormat(percent)} {since}
          </Typography>
        </Stack>

        <Typography variant="h3">{value}</Typography>
      </Box>

    </Card>
  );
}
