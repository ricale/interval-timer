import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  Accordion,
  Button,
  Icon,
} from 'components';
import {getMapDispatchToProps} from 'lib';
import intervalActions from 'actions/intervals';
import timerActions from 'actions/timer';

import Timer from './timer';
import IntervalForm from './intervals/form';
import IntervalList from './intervals/list';

import Sider from './_sider';

import './main.less';

class Main extends Component {
  state = {
    filled: false,
  }

  componentDidMount () {
    if(this.props.list.length === 0) {
      this._sider.open();
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
    this.props.cancelEditInterva();
  }

  handleDelete = (id) => {
    this.props.deleteInterval(id);
  }

  handleDeleteAll = () => {
    this.props.deleteAllInterval();
  }

  render () {
    const {
      list,
      lastId,
      editing,
      timer: {current, ...timer},

      start,
      stop,
      pause,
      resume,
      goToNext,
      turnOffAlarm,
      turnOnAlarm,
      ringAlarm,
      stopAlarm,
    } = this.props;

    return (
      <div className='it-main'>
        <div className='it-main__content'>
          <Timer
              onStart={start}
              onStop={stop}
              onPause={pause}
              onResume={resume}
              onDone={goToNext}
              turnOffAlarm={turnOffAlarm}
              turnOnAlarm={turnOnAlarm}
              ringAlarm={ringAlarm}
              stopAlarm={stopAlarm}

              data={list[current % list.length]}
              index={current}
              disabled={list.length === 0}
              filled={this.state.filled}

              fullScreenContainerRef={r => this._fullScreenContainer = r}

              {...timer}
              />

          <div className='it-main__controller'>
            <Button onClick={() => this.setState({filled: !this.state.filled})}>
              <Icon name={this.state.filled ? 'fill' : 'fill-drip'} />
            </Button>
            <Button className='it-fullscreen__button' onClick={() => this._fullScreenContainer.toggle()}>
              <Icon name='expand' />
            </Button>
            <Button onClick={() => this._sider.toggle()}>
              <Icon name='bars' />
            </Button>
          </div>
        </div>

        <Sider
            title='Intervals'
            ref={r => this._sider = r}>
          <Accordion 
              className='it-main__form-accordion'
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
              onEdit={(id) => this.props.editInterval(id)}
              onCancelEdit={this.handleCancelEdit}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
              onDeleteAll={this.handleDeleteAll}
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
});

const mapDispatchToProps = getMapDispatchToProps({
  ...intervalActions,
  ...timerActions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
