import React from 'react';

import Footer from '../component/Footer';
import Header from '../component/Header';
import Navbar from '../component/HeadlineNavbar';

import ArticleComponent from '../component/ArticleComponent';
import SourcesComponent from '../component/SourcesComponent';

import ArticleStore from '../stores/Article';
import SourcesStore from '../stores/Sources';

import * as myActions from '../actions/HeadlineActions';


export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.setSources = this.setSources.bind(this);
    this.setArticles = this.setArticles.bind(this);
    this.state = { title: 'Ajaps Franklin that BOSS!!',
      article: ArticleStore.getAll(),
      sources: SourcesStore.getAll(),
      searchTerm: '',
    };
  }

  componentWillMount() {
    SourcesStore.on('sourceChange', this.setSources);
    ArticleStore.on('articleChange', this.setArticles);
  }
  componentWillUnmount() {
    SourcesStore.removeListener('sourceChange', this.setSources);
    ArticleStore.removeListener('articleChange', this.setArticles);
  }

  // Get all sources from store
  setSources() {
    this.setState({
      sources: SourcesStore.getAll(),
    });
  }

  // Get All Article from store
  setArticles() {
    this.setState({
      article: ArticleStore.getAll(),
    });
  }

  // Function to trigger Flux Action to Get Sources based on set criteria
  getSources() {
    myActions.getNewSources();
  }

  // Function to trigger Flux Action to Get Articles
  getArticle() {
    myActions.getNewArticles();
  }

  // Search input box
  searchSource(e) {
    const searchString = e.target.value;
    this.setState({
      searchTerm: searchString,
    });
  }

    // Logout from Applicaton
  logout() {
    this.props.logout();
  }

  render() {
    const { article, sources } = this.state;

    const articleComponents = article.map((articleItem) => {
      return <ArticleComponent key={articleItem.url}{...articleItem} />;
    });

    const sourcesComponents = sources.map((sourcesItem) => {
      const reg = RegExp(this.state.searchTerm, 'gi');
      if (sourcesItem.name.search(reg) !== -1) {
        return <SourcesComponent key={sourcesItem.id}{...sourcesItem} />;
      }
    });

    return (
      <div>
        <Header logout={this.logout.bind(this)}/>
        <button hidden onClick={this.logout.bind(this)}>SignOut </button>
        <button hidden onClick={this.getSources.bind(this)}> Get Sources </button>
        <button hidden onClick={this.getArticle.bind(this)}> Get Articles </button>
        <Navbar />
        <div className="">
          <div className="row">
            <div className="">
              <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar article-Source-Container">
                  <input type="text" className="form-control" placeholder="Search..." onChange={this.searchSource.bind(this)} />
                  <li className="active"><h4>All Sources <span className="sr-only">(current)</span></h4></li>
                  {sourcesComponents}
                </ul>
              </div>
                <div className="container">
                  <div className="row article-Source-Container">{articleComponents} </div>
                </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
