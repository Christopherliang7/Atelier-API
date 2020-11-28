import React from 'react';
import QAsearch from './QAsearch';
import '../../styles/main.scss';
import qaData from './qa-sample-data';
import QAlist from './QAlist';
import AddModal from '../shared/AddModal';
import axios from 'axios';

class QAmodule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: qaData.questions,
      product: '',
      search: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
      this.setState({search: e.target.value});
  }

  componentDidMount() {
      var pid = this.props.prodID;
      axios.get(`http://3.21.164.220/qa/questions/`, {params: {product_id: 16, count: 50}})
      .then((result) => {
          console.log(result);
          this.setState({questions: result.data});
      })
      .then(()=> {
          console.log(pid);
          axios.get(`http://3.21.164.220/products/${pid}`)
          .then((result) =>{
              console.log(result);
              this.setState({product: result.data.name});
          })
      })
      .catch((err) => {
          console.log(err);
      })
  }
  render() {
    {if (this.state.questions === null) {
        var showQAlist = false;
    }}
    return (
      <div
        className='qa-container'
        style={{
          display: 'grid',
          gridTemplateRows: '.5fr 1fr 3fr 1 fr',
          gridTemplateColumns: '3fr .5fr .25fr 1.25fr',
          // took out the margin here so i can apply it to the App.js Grid
          gap: '10px',
          fontFamily: 'Arial, Helvetica, sans-serif'
        }}>
        <div
          className='qa-header'
          style={{
            gridColumnEnd: 'span 4',
            fontSize: '16px',
            height: '30px'
          }}>
          QUESTIONS & ANSWERS
        </div>
        <QAsearch search={this.handleSearch}/>
        <QAlist
          answers={this.state.answers}
          product={this.state.product}
          questions={this.state.questions.results}
          search={this.state.search.length > 3 ? this.state.search : null}
        />
        <AddModal name={'question'} pid={this.props.prodID} title={'Ask A Question'} prodName={this.state.product}/>
      </div>
    );
  }
}

export default QAmodule;