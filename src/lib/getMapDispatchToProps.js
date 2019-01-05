export default function getMapDispatchToProps (f) {
  if(typeof f === 'function') {
    return f;
  }

  return (dispatch) =>
    Object.keys(f).reduce((hash, key) => {
      hash[key] = (...args) => dispatch(f[key](...args));
      return hash;
    }, {});
}
