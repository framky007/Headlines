import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher/HeadlineDispatcher';

/**
 * Represents Article's store.
 */
class AllArticle extends EventEmitter {

  /**
   * sets default url for getting articles
   * @return {void}
   */
  constructor() {
    super();

    this.getArticleUrl = {
      sortBy: '',
      source: '',
      URL_ARTICLE: 'https://newsapi.org/v1/articles',
      API_KEY: process.env.NEWS_API_KEY,
    };
    this.status = 'ok';
    this.sortAvailable = [];
    this.highlightedSource = 'all';
    this.articles = [];
    this.articlesErrorMsg = 'loading';
  }

  /**
   * returns Article object
   * @return {object} contains available articles in the store
   */
  getAllArticles() {
    return this.articles;
  }

   /**
   * returns Article Error message
   * @return {object} contains available articles in the store
   */
  getErrorMsg() {
    return this.articlesErrorMsg;
  }

  /**
   * returns available sort in the selected news source
   * @return {array} contains available filter for the selected source
   */
  getAvailableSorts() {
    return this.sortAvailable;
  }

  /**
   * returns the id of the selected source
   * @return {array} contains the id in an array
   */
  getSelectedSourceID() {
    return this.highlightedSource;
  }

  /**
   * handles actions based on specified action type
   * @param {Object} action - the action type and text - Articles
   * @return {void}
   */
  handleAction(action) {
    switch (action.type) {
    case 'GOT_NEW_ARTICLES':
      this.getArticleUrl.source = action.text;
      this.sortAvailable = action.sort;
      this.status = action.response;
      this.articles = action.articles;
      this.highlightedSource = action.text;
      this.articlesErrorMsg = action.error;
      this.emit('articleChange');
      break;
    case 'SET_SORTBY':
      this.getArticleUrl.sortBy = action.text;
      this.articles = action.articles;
      this.status = action.response;
      this.articlesErrorMsg = action.error;
      this.emit('articleChange');
      break;
    case 'FETCH_SOURCES':
      this.getArticleUrl.source = action.text;
      this.sortAvailable = action.sort;
      this.status = action.response;
      this.articles = action.articles;
      this.highlightedSource = action.text;
      this.articlesErrorMsg = action.error;
      this.emit('articleChange');
      break;
    default:
      this.emit('ActionTypeNotAvailable');
    }
  }
}

const ArticlesStore = new AllArticle();
Dispatcher.register(ArticlesStore.handleAction.bind(ArticlesStore));
export default ArticlesStore;
