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
  constructor (props) {
    super(props);
    this.state = {
      sider: null,
    };
    this._siders = {};
  }

  componentDidMount () {
    if(this.props.list.length === 0) {
      this.toggleSiders('intervals');
      this._accordion.open();
    }
    this.toggleSiders('intervals');
  }

  shouldComponentUpdate (nextProps) {
    if(this.props.list.length > 0 && nextProps.list.length === 0) {
      this._accordion.open();
    }
    return true;
  }

  handleToggleIntervalsSider = () => {
    this.toggleSiders('intervals');
  }

  toggleSiders (siderName) {
    const prevSider = this.state.sider;
    const nextSider = this.state.sider === siderName ? null : siderName;

    this.setState({sider: nextSider}, () => {
      if(prevSider === null || prevSider === siderName) {
        this._siders[siderName].toggle();

      } else {
        Object.keys(this._siders).forEach(key => {
          if(siderName !== key) {
            this._siders[key].close();
          }
        });
        this._siders[siderName].toggle();
      }
    });
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
            <Button tooltip={{text: 'Intervals', position: 'bottom'}} onClick={this.handleToggleIntervalsSider}>
              <Icon name='wrench' />
            </Button>
          </div>
        </div>

        <Sider ref={r => this._siders.intervals = r}>
          <Intervals
              title={<Icon name='bars' />}
              list={list}
              defaultName={`interval #${lastId}`} // FIXME: duplicated with createInterval on reducers/intervals
              editing={editing}
              canEdit={timer.playState === PLAY_STATE.IDLE}
              editInterval={editInterval}
              cancelEditInterval={cancelEditInterval}
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
