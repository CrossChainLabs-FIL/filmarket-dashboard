import merge from 'lodash/merge';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';

const CHART_DATA = [
  {
    year: 2021,
    data: [
      { name: 'North America', data: [0.054, 0.056, 0.058, 0.058, 0.06, 0.061, 0.062, 0.063, 0.064] },
      { name: 'Europe', data: [0.045, 0.046, 0.048, 0.047, 0.048, 0.049, 0.05, 0.051, 0.054] },
      { name: 'Asia', data: [0.041, 0.042, 0.040, 0.039, 0.038, 0.040, 0.042, 0.043, 0.045] },
      { name: 'Other', data: [0.048, 0.048, 0.049, 0.049, 0.051, 0.052, 0.053, 0.054, 0.055] }
    ]
  }
];

export default function StoragePriceChart() {
  const [seriesData, setSeriesData] = useState(2021);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(CustomChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    }
  });

  return (
    <Card>
      <CardHeader
        title="Average storage price (TiB/year)"
        subheader=""
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}

