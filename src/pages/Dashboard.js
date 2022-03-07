import { useTheme } from '@mui/material/styles';
import { Container, Grid, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import Page from '../components/Page';
import { StorageProvidersTable, StoragePriceChart, CardWidget, ActiveStorageProviders } from '../sections';
import { Near } from '../utils/near';
import { formatDigits, formatSizeFromTiB } from '../utils/format';

const nearClient = new Near();

export default function Dashboard() {
  const [state, setState] = useState({ loading: true, globalPrice: '', filPrice: '', power: '' });

  useEffect(() => {
    setState({ loading: true });

    nearClient.callFunction("get_price_per_region_list").then((price_per_region_list) => {
      let history = price_per_region_list.sort((a, b) => parseFloat(b.timestamp) - parseFloat(a.timestamp));
      let filPricePercentage = 0.0;
      let globalPricePercentage = 0.0;
      let powerPercentage = 0.0;
      let powerPercentageMonth = false;
      
      if (history.length >= 2) {
        filPricePercentage = ((history[0].fil_price - history[1].fil_price) / history[1].fil_price) * 100;
      }

      if (history.length >= 8) {
        globalPricePercentage = ((history[0].global - history[7].global) / history[7].global) * 100;
        powerPercentage = ((history[0].power - history[7].power) / history[7].power) * 100;
      }

      if (history.length >= 31) {
        powerPercentageMonth = true;
        powerPercentage = ((history[0].power - history[30].power) / history[30].power) * 100;
      }

      console.log(history);

      nearClient.callFunction("get_latest_price_per_region").then((latest_price_per_region) => {
        let global_price = latest_price_per_region.global;
        let fil_price = latest_price_per_region.fil_price;
        let power = latest_price_per_region.power;
        setState({
          loading: false,
          globalPrice: formatDigits(global_price),
          filPrice: formatDigits(fil_price),
          power: formatSizeFromTiB(power),
          filPricePercentage: filPricePercentage,
          globalPricePercentage: globalPricePercentage,
          powerPercentage: powerPercentage,
          powerPercentageMonth: powerPercentageMonth,
        })
      });
    });
  }, [setState]);

  const theme = useTheme();
  const  themeStretch  = false;

  return (
    <Page title="FilMarket">

    <div style={{marginLeft: '45%',}}>
      {state.loading && <CircularProgress color='primary' />} 
    </div>

    {!state.loading &&
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <CardWidget
              title="Average storage price (TiB/year)"
              percent={((state.globalPricePercentage) ? (state.globalPricePercentage) : '')}
              since='than last week'
              value={'$ ' + ((state.globalPrice) ? (state.globalPrice) : '')}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CardWidget
              title="FIL price"
              percent={((state.filPricePercentage) ? (state.filPricePercentage) : '')}
              since='than last 24 hours'
              value={'$ ' + ((state.filPrice) ? (state.filPrice) : '')}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <CardWidget
              title="Network Power"
              percent={((state.powerPercentage) ? (state.powerPercentage) : '')}
              since={((state.powerPercentageMonth) ? 'than last month' : 'than last week')}
              value={((state.power) ? (state.power) : '')}
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
      </Container>}
    </Page>
  );
}
