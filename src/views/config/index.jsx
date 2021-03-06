import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

import {Checkbox, Icon} from 'components';
import {GITHUB_REPOSITORY_URL, MY_EMAIL_ADDRESS} from 'constants';
import {getMapDispatchToProps} from 'lib';
import configActions from 'actions/config';

const Container = styled.div`
  max-width: 500px;
  padding: 0 15px;
`;

const CheckItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 5px;
  border-bottom: 1px solid #DDD;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 10px 5px;
  border-bottom: 1px solid #DDD;
`;

const Link = styled.a`
  margin-right: 5px;
`;

const ConfigCheckField = ({label, checked, onChange}) => (
  <CheckItem>
    <label>{label}</label>
    <div>
      <Checkbox checked={checked} primary={true} onChange={onChange} />
    </div>
  </CheckItem>
);

class SiderConfig extends Component {
  render () {
    const {
      ringable,
      animatable,
      enableNotification,

      toggleRingable,
      toggleAnimatable,
      toggleNotification,
    } = this.props;

    return (
      <Container>
        <ConfigCheckField
            label='Alarm sound'
            checked={ringable}
            onChange={toggleRingable}
            />
        <ConfigCheckField
            label='Alarm animation'
            checked={animatable}
            onChange={toggleAnimatable}
            />
        <ConfigCheckField
            label='Browser notification'
            checked={enableNotification}
            onChange={toggleNotification}
            />

        <Row>
          <Link
              href={GITHUB_REPOSITORY_URL}
              target='_blank'
              rel="noopener noreferrer"
              alt=''>
            <Icon name='github' option='brand' />
          </Link>
          <Link href={`mailto:${MY_EMAIL_ADDRESS}`} alt=''>
            <Icon name='at' />
          </Link>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...state.config,
});

const mapDispatchToProps = dispatch => getMapDispatchToProps({
  ...configActions,
});

export default connect(mapStateToProps, mapDispatchToProps)(SiderConfig);
