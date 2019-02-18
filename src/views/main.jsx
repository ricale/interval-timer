import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

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

const Container = styled.div`
  display: flex;
  flex-direction: row;

  position: relative;
  width: 100%;
  height: 100%;

  background-color: #EFEFEF;
`;

const Content = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex-grow: 1;
  height: 100%;

  background-color: #FFF;
`;

const Controller = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

class Main extends Component {
  state = {
    full: false,
  }

  componentDidMount () {
    if(this.props.list.length === 0) {
      this._sider.toggle();
    }
  }

  handleToggleFullScreen = () => {
    this.setState({full: !this.state.full}, () => this._fullScreenContainer.toggle());
  }

  handleChangeFull = (full) => {
    this.setState({full});
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
      <Container>
        <Content>
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
              full={this.state.full}
              onChangeFull={this.handleChangeFull}

              {...timer}
              />

          <Controller>
            <Button tooltip={{text: 'FullScreen', position: 'bottom'}} onClick={this.handleToggleFullScreen}>
              <Icon name='expand' />
            </Button>
            <Button tooltip={{text: 'Menu', position: 'bottom-right'}} onClick={this.handleToggleIntervalsSider}>
              <Icon name='wrench' />
            </Button>
          </Controller>
        </Content>

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
      </Container>
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
