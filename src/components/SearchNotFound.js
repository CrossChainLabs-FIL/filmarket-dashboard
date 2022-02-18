import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '' }) {
  return (
      <Typography gutterBottom align="center" variant="subtitle1">
        Storage provider <strong>&quot;{searchQuery}&quot;</strong> not found.
      </Typography>
  );
}
