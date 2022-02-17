import { currency } from '../utils/format';
import Scrollbar from '../components/Scrollbar';
import {
  Card,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer
} from '@mui/material';


const MOCK_DATA = [
  {
    id: 'f0121768',
    region: 'Asia',
    power: '5.05 PB',
    price: '0.048',
    priceFIL: '0.6271 nanoFIL'
  },
  {
    id: 'f02301',
    region: 'North America',
    power: '2.23 PB',
    price: '0.05',
    priceFIL: '0.6520 nanoFIL'
  },
  {
    id: 'f024006',
    region: 'Asia',
    power: '1.76 PB',
    price: '0.05',
    priceFIL: '0.6525 nanoFIL'
  },
  {
    id: 'f03364',
    region: 'Asia',
    power: '1.11 PB',
    price: '0.04',
    priceFIL: '0.5584 nanoFIL'
  },
  {
    id: 'f022352',
    region: 'Europe',
    power: '1.01 PB',
    price: '0.05',
    priceFIL: '0.6525 nanoFIL'
  },
];

export default function StorageProvidersTable() {
  return (
    <Card>
      <CardHeader title="Storage Providers" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Power</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Price FIL</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_DATA.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.power}</TableCell>
                  <TableCell>{currency(row.price)}</TableCell>
                  <TableCell>{row.priceFIL}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

    </Card>
  );
}
