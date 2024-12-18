export const formSelectStyles = (error) => ({
  control: (base, state) => ({
    ...base,
    borderColor: error ? 'red' : state.isFocused ? '#4caf50' : '#3C4242',
    borderRadius: '0px',
    padding: '8px 4px',
    height: '56px',
    fontSize: '18px',
    fontFamily: 'Lato, sans-serif',
    boxShadow: state.isFocused
      ? error
        ? '0 0 0 1px red'
        : '0 0 0 1px #4caf50'
      : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#4caf50' : '#3C4242',
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: 'gray',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (base) => ({
    ...base,
    color: '000',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'gray',
  }),
});
