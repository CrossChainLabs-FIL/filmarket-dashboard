import StorageProvidersHeader from '../components/StorageProvidersHeader';
import StorageProvidersToolbar from '../components/StorageProvidersToolbar';
import SearchNotFound from '../components/SearchNotFound';
import { useState, useEffect } from 'react';
import { filter } from 'lodash';
import { Near } from '../utils/near';
import { toUSD, formatDigits, formatSizeFromGiB } from '../utils/format';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';

const nearClient = new Near();

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false, width: "60%" },
  { id: 'region', label: 'Region', alignRight: false , width: "25%" },
  { id: 'power', label: 'Power', alignRight: false , width: "25%" },
  { id: 'price', label: 'Storage Price (TiB/year) USD', alignRight: false , width: "25%" },
  { id: 'price_fil', label: 'Storage Price (TiB/year) FIL', alignRight: false , width: "25%" }
];

function descendingComparator(a, b, orderBy) {
  let a_to_cmp = a[orderBy];
  let b_to_cmp = b[orderBy];

  if (orderBy === 'price' || orderBy === 'price_fil') {
    a_to_cmp = parseFloat(a[orderBy]);
    b_to_cmp = parseFloat(b[orderBy]);
  }

  if (b_to_cmp < a_to_cmp) {
    return -1;
  }
  if (b_to_cmp > a_to_cmp) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}



function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_sp) => _sp.id.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

function ValidateNumber(n) {
  if(isNaN(n)){
    return false;
  }

  return true;
}

const Regions = {
  1: "North America", 
  2: "Europe", 
  3: "Asia", 
  4: "Other" 
};

export default function StorageProvidersTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [state, setState] = useState({ loading: true, storageProviders: [] });

  useEffect(() => {
    setState({ loading: true });

    nearClient.callFunction("get_latest_price_per_region").then((latest_price_per_region) => {
      let fil_price = latest_price_per_region?.fil_price;
      nearClient.callFunction("get_storage_providers").then((storage_providers) => {
        setState({
          loading: false, storageProviders: storage_providers.filter(function (sp) {
            if (ValidateNumber(sp.price) && ValidateNumber(sp.power)) {
              return sp;
            }
          }).map((sp) => (
            {
              id: sp.id,
              region: Regions[sp.region],
              price: formatDigits(toUSD(sp.price, fil_price)),
              price_fil: formatDigits(sp.price),
              power: sp.power,
              powerFormatSize: formatSizeFromGiB(formatDigits(sp.power))
            }))
        });
      });


    });

  }, [setState]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state?.storageProviders?.length) : 0;
  const filteredStorageProviders = applySortFilter(state?.storageProviders, getComparator(order, orderBy), filterName);

  const isSPNotFound = filteredStorageProviders?.length === 0;

  return (
    <Card>
      <StorageProvidersToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
          <StorageProvidersHeader
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={state?.storageProviders?.length}
                  onRequestSort={handleRequestSort} 
                />
            <TableBody>
              {filteredStorageProviders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell style={{ width: "20%" }}>{row.id}</TableCell>
                    <TableCell style={{ width: "20%" }}>{row.region}</TableCell>
                    <TableCell style={{ width: "20%" }}>{row.powerFormatSize}</TableCell>
                    <TableCell style={{ width: "20%" }}>{row.price + " USD"}</TableCell>
                    <TableCell style={{ width: "20%" }}>{row.price_fil + " FIL"}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isSPNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
          </Table>
        </TableContainer>


      <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={(state?.storageProviders?.length) ? (state?.storageProviders?.length): 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

    </Card>
  );
}
