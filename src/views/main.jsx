import React, {Component} from 'react';
import {connect} from 'react-redux';
import {factoryBemClass} from 'factory-bem-class';

import {
  Button,
  Icon,
} from 'components';
import {getMapDispatchToProps} from 'lib';
import {PLAY_STATE} from 'constants';

import configActions from 'actions/config';
import intervalActions from 'actions/intervals';
import timerActions from 'actions/timer';

import Timer from './timer';
import HistoryList from './history/list';
import Config from './config';
import Intervals from './intervals';

import Sider from './_sider';

import './main.less';

const cn = factoryBemClass('it-main');

class Main extends Component {
  componentDidMount () {
    if(this.props.list.length === 0) {
      this._sider.toggle();
    }
  }

  handleToggleIntervalsSider = () => {
    this._sider.toggle();
  }

  render () {
    const {
      list,
      lastId,
      editing,
      timer: {current, ...timer},
      config,
      history,

      start,
      stop,
      pause,
      resume,
      goToNext,
      ringAlarm,
      stopAlarm,

      toggleRingable,
      toggleAnimatable,
      toggleFilled,
      editInterval,
      updateInterval,
      cancelEditInterval,
      deleteInterval,
      deleteAllInterval,
      createInterval,
    } = this.props;

    return (
      <div className={cn()}>
        <div className={cn('content')}>
          <Timer
              onStart={start}
              onStop={stop}
              onPause={pause}
              onResume={resume}
              onDone={goToNext}
              ringAlarm={ringAlarm}
              stopAlarm={stopAlarm}

              data={list[current % list.length]}
              index={current}
              disabled={list.length === 0}
              config={config}

              fullScreenContainerRef={r => this._fullScreenContainer = r}

              {...timer}
              />

          <div className={cn('controller')}>
            <Button tooltip={{text: 'Fullscreen', position: 'bottom'}} onClick={() => this._fullScreenContainer.toggle()}>
              <Icon name='expand' />
            </Button>
            <Button tooltip={{text: 'Menu', position: 'bottom-right'}} onClick={this.handleToggleIntervalsSider}>
              <Icon name='wrench' />
            </Button>
          </div>
        </div>

        <Sider ref={r => this._sider = r}>
          <Intervals
              title={<Icon name='bars' />}
              list={list}
              defaultName={`interval #${lastId}`} // FIXME: duplicated with createInterval on reducers/intervals
              editing={editing}
              canEdit={timer.playState === PLAY_STATE.IDLE}
              editInterval={editInterval}
              cancelEditInterval={cancelEditInterval}
              updateInterval={updateInterval}
              deleteInterval={deleteInterval}
              deleteAllInterval={deleteAllInterval}
              createInterval={createInterval}
              />
          <HistoryList
              title={<Icon name='history' />}
              data={history}
              />
          <Config
              {...config}
              title={<Icon name='cog' />}
              toggleRingable={toggleRingable}
              toggleAnimatable={toggleAnimatable}
              toggleFilled={toggleFilled}
              />
        </Sider>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  list: state.intervals.list,
  lastId: state.intervals.lastId,
  editing: state.intervals.editing,
  timer: state.timer,
  config: state.config,
  history: state.history.list,
});

const mapDispatchToProps = getMapDispatchToProps({
  ...configActions,
  ...intervalActions,
  ...timerActions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
