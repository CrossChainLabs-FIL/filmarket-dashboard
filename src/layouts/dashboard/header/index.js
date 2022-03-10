import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import logo from "../../../logo.svg";

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

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: "center"
    },
    logo: {
      maxWidth: 40,
      marginRight: '10px'
    }
  })
);

export default function DashboardNavbar() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: BG_COLOR }}>
      <ToolbarStyle disableGutters>
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={12} md={0}/>
            <img src={logo} alt="" className={classes.logo} />
            <TextTypography>FilMarket</TextTypography>
          </Grid>
        </Container>
      </ToolbarStyle>
    </AppBar>
  );
}
