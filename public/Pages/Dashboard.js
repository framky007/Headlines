import React from 'react';

import Footer from '../component/Footer';
import Header from '../component/Header';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = { title: 'Ajaps Franklin that BOSS!!' };
  }

  changeTitle(title) {
    this.setState({ title });
  }

  render() {
    /*
    setTimeout(() => {
      this.setState({ name: 'Tunde Abiola' });
    }, 6000);
    */
    return <div>
      <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
      <h4>Dashboard from {this.state.title}</h4>
      <Footer />
    </div>;
  }
}