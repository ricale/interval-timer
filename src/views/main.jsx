import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled, {css} from 'styled-components';

import {
  Button,
  FullScreenContainer,
  Icon,
  Tooltip,
} from 'components';
import {PLAY_STATE} from 'constants';

import Timer from './timer';
import HistoryList from './history/list';
import Config from './config';
import Intervals from './intervals';

import Sider from './_sider';

const Container = styled(FullScreenContainer)`
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

  ${p => p.hide && css`
    display: none;
  `}
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
    } = this.props;

    const {
      full,
    } = this.state;

    return (
      <Container
          ref={r => this._fullScreenContainer = r}
          onChange={this.handleChangeFull}>
        <Content>
          <Timer
              data={list[current % list.length]}
              index={current}
              disabled={list.length === 0}
              config={config}
              full={full}
              {...timer}
              />

          <Controller hide={full}>
            <Button 
                onClick={this.handleToggleFullScreen}
                as={Tooltip}
                tooltip={{text: 'FullScreen', position: 'bottom'}} >
              <Icon name='expand' />
            </Button>
            <Button 
                onClick={this.handleToggleIntervalsSider}
                as={Tooltip}
                tooltip={{text: 'Menu', position: 'bottom-right'}} >
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
              />
          <HistoryList
              title={<Icon name='history' />}
              data={history}
              />
          <Config
              {...config}
              title={<Icon name='cog' />}
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

export default connect(mapStateToProps)(Main);
