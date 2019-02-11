export default function getActionHistoryMiddleware (historyReducer = 'history', historyAddActionType = 'HISTORY/ADD') {

  const addHistory = (prevState, action, result) => {
    const {[historyReducer]: _,  ..._prevState} = prevState;
    const {[historyReducer]: __, ..._result} = result;

    return {
      type: historyAddActionType,
      payload: {
        prevState: _prevState,
        action,
        result: _result,
      },
    };
  };

  return store => next => action => {
    const {recording} = (action.meta || {});

    let prevState;
    if(recording) {
      prevState = store.getState();
    }

    next(action);

    let result;
    if(recording) {
      result = store.getState();
      next(addHistory(prevState, action, result));
    }
  };
}
