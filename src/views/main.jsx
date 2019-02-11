import React, {Component} from 'react';
import {connect} from 'react-redux';
import {factoryBemClass} from 'factory-bem-class';

import {
  Accordion,
  Button,
  Icon,
} from 'components';
import {getMapDispatchToProps} from 'lib';
import {PLAY_STATE} from 'constants';

import configActions from 'actions/config';
import intervalActions from 'actions/intervals';
import timerActions from 'actions/timer';

import Timer from './timer';
import IntervalForm from './intervals/form';
import IntervalList from './intervals/list';
import HistoryList from './history/list';
import SiderConfig from './sider/config';

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
  }

  shouldComponentUpdate (nextProps) {
    if(this.props.list.length > 0 && nextProps.list.length === 0) {
      this._accordion.open();
    }
    return true;
  }

  handleValid = (d) => {
    return d.hours || d.minutes || d.seconds;
  }

  handleSubmit = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.createInterval({...d, timestamp});
  }

  handleUpdate = (d) => {
    const timestamp = (d.hours * 60 * 60 * 1000) + (d.minutes * 60 * 1000) + (d.seconds * 1000);
    this.props.updateInterval({...d, timestamp});
  }

  handleCancelEdit = () => {
    this.props.cancelEditInterval();
  }

  handleDelete = (id) => {
    this.props.deleteInterval(id);
  }

  handleDeleteAll = () => {
    this.props.deleteAllInterval();
  }

  handleToggleIntervalsSider = () => {
    this.toggleSiders('intervals');
  }

  handleToggleHistorySider = () => {
    this.toggleSiders('history');
  }

  handleToggleConfigSider = () => {
    this.toggleSiders('config');
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
              <Icon name='bars' />
            </Button>
            <Button tooltip={{text: 'History', position: 'bottom'}} onClick={this.handleToggleHistorySider}>
              <Icon name='history' />
            </Button>
            <Button tooltip={{text: 'Settings', position: 'bottom-right'}} onClick={this.handleToggleConfigSider}>
              <Icon name='cog' />
            </Button>
          </div>
        </div>

        <Sider
            title='Intervals'
            ref={r => this._siders.intervals = r}>
          <Accordion 
              className={cn('form-accordion')}
              title='Add Interval'
              ref={r => this._accordion = r}>
            <IntervalForm
                defaultName={`interval #${lastId}`} // FIXME: duplicated with createInterval on reducers/intervals
                isValid={this.handleValid}
                onSubmit={this.handleSubmit}
                />
          </Accordion>

          <IntervalList
              data={list}
              editing={editing}
              canEdit={timer.playState === PLAY_STATE.IDLE}
              onEdit={(id) => this.props.editInterval(id)}
              onCancelEdit={this.handleCancelEdit}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              onDeleteAll={this.handleDeleteAll}
              />
        </Sider>

        <SiderConfig
            {...config}
            siderRef={r => this._siders.config = r}
            toggleRingable={toggleRingable}
            toggleAnimatable={toggleAnimatable}
            toggleFilled={toggleFilled}
            />
        <Sider
            title='History'
            ref={r => this._siders.history = r}>
            <HistoryList
                data={history}
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
