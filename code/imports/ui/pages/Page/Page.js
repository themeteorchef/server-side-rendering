import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';
import PageHeader from '../../components/PageHeader/PageHeader';
import Content from '../../components/Content/Content';

if (Meteor.isClient) import './Page.scss';

const Page = ({ title, subtitle, content }) => (
  <div className="Page">
    <PageHeader title={title} subtitle={subtitle} />
    <Content content={content} />
  </div>
);

Page.defaultProps = {
  subtitle: '',
};

Page.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  content: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  if (Meteor.isClient) window.scrollTo(0, 0); // Force window to top of page.

  return {
    content: state[props.page],
  };
};

export default connect(mapStateToProps)(Page);
