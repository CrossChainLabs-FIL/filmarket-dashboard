import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { number } from '../utils/format';
import { CustomChart } from '../components/chart';
import { Near } from '../utils/near';
import { useState, useEffect } from 'react';

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const nearClient = new Near();

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

export default function ActiveStorageProviders() {
  const [state, setState] = useState({ loading: true, chartData: [0, 0, 0, 0] });
  const theme = useTheme();

  useEffect(() => {
    setState({ loading: true });
    nearClient.callFunction("get_active_per_region").then((active_per_region) => {
      let north_america = (active_per_region?.north_america) ? active_per_region.north_america : 0;
      let europe =  (active_per_region?.europe) ? active_per_region.europe : 0;
      let asia = (active_per_region?.asia) ? active_per_region.asia : 0;
      let other = (active_per_region?.other) ? active_per_region.other : 0;
      setState({ loading: false, chartData: [north_america, europe, asia, other] });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.yellow[0],
      theme.palette.chart.blue[0],
      theme.palette.chart.violet[0]
    ],
    labels: ['North America', 'Europe', 'Asia', 'Other'],
    stroke: { colors: [theme.palette.background] },
    legend: { floating: true, horizontalAlign: 'center' },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => number(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '90%',
          labels: {
            value: {
              formatter: (val) => number(val)
            },
            total: {
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return number(sum);
              }
            }
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Active Storage Providers" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={state.chartData} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
