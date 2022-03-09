import { alpha, styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HEIGHT = 92;
const BG_COLOR = '#f3f6f8';

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: HEIGHT,
    padding: theme.spacing(0, 5),

}));

const TextTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    lineHeight: theme.typography.h3.lineHeight,
}));

export default function DashboardNavbar() {
  const theme = useTheme();

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: BG_COLOR }}>
      <ToolbarStyle disableGutters>

          <TextTypography>FilMarket</TextTypography>

      </ToolbarStyle>
    </AppBar>
  );
}
