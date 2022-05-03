import merge from 'lodash/merge';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import { CustomChart } from '../components/chart';
import { Near } from '../utils/near';

const nearClient = new Near();

export default function StoragePriceChart() {
  const [state, setState] = useState({
    loading: true, data: [
      { name: 'North America', data: [] },
      { name: 'Europe', data: [] },
      { name: 'Asia', data: [] },
      { name: 'Other', data: [] }
    ]
  });

  useEffect(() => {
    nearClient.callFunction("get_price_per_region_list").then((price_per_region_list) => {
      let history = price_per_region_list.sort((a, b) => parseFloat(a.timestamp) - parseFloat(b.timestamp));

      if (history.length > 20) {
        history = history.slice(-20);
      }

      let dataNorthAmerica = [];
      let dataEurope = [];
      let dataAsia = [];
      let dataOther = [];
      let categories = [];

      var options = { day: 'numeric', month: 'short' };

      history.forEach(item => {
        dataNorthAmerica.push(item.north_america.toFixed(2));
        dataEurope.push(item.europe.toFixed(2));
        dataAsia.push(item.asia.toFixed(2));
        dataOther.push(item.other.toFixed(2));
        categories.push(new Date(item.timestamp * 1000).toLocaleDateString('en-US', options));
      });

      setState({
        loading: false, 
        categories: categories,
        data: [
          { name: 'North America', data: dataNorthAmerica },
          { name: 'Europe', data: dataEurope },
          { name: 'Asia', data: dataAsia },
          { name: 'Other', data: dataOther }
        ]
      });
    });
  }, [setState]);

  const chartOptions = merge(CustomChart(), {
    xaxis: {
      categories: state.categories
    }
  });

  return (
    <Card>
      <CardHeader
        title="Average storage price (TiB/year)"
        subheader=""
      />

        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
            <ReactApexChart type="line" series={state.data} options={chartOptions} height={364} />
        </Box>
    </Card>
  );
}

