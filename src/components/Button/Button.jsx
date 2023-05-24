import PropTypes from 'prop-types';
// import { MagnifyingGlass } from 'react-loader-spinner';
import './ButtonStyled.css';

function Button({ onNextFetch }) {
  return (
    <button className="Btn__loadMore" type="button" onClick={onNextFetch}>
      Load more
    </button>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};

export default Button;
