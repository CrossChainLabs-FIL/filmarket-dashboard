import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import Page from '../components/Page';
import { StorageProvidersTable, StoragePriceChart, CardWidget, ActiveStorageProviders } from '../sections';

export default function Dashboard() {
  const theme = useTheme();
  const  themeStretch  = false;

  return (
    <Page title="FilMarket">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardWidget
              title="Average storage price (TB/year)"
              percent={2.6}
              since='than last week'
              value='$ 0.05'
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CardWidget
              title="FIL price"
              percent={0.2}
              since='than last 24 hours'
              value='$ 250.6'
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CardWidget
              title="Network Power"
              percent={-0.1}
              since='than last month'
              value='12.04 EB'
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <ActiveStorageProviders />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <StoragePriceChart />
          </Grid>

          <Grid item xs={12} lg={12}>
            <StorageProvidersTable />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
