import React from 'react';
import { connect } from 'react-redux';

export const App = () => {
    return (
      <div>hi</div>  
    );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);