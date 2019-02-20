import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import food from './foods.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      calories: 0,
      image: '',
      quantity: 0,
      search: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    food.push(this.state);
    this.setState({
      name: '',
      calories: 0,
      image: '',
      quantity: 0,
      search: ''
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    this.setState({
      quantity: this.state.quantity + 1
    });
  }

  render() {
    return (
      <div className="App">
        <Search onChange={this.handleChange}/>
        <form onSubmit={e => this.handleSubmit(e)}>
          <AddNewFoodField name="name" type="text" onChange={this.handleChange} value={this.state.name}/>
          <AddNewFoodField name="calories" type="number" onChange={this.handleChange} value={this.state.calories}/>
          <AddNewFoodField name="image" type="text" onChange={this.handleChange} value={this.state.image}/>
          <AddNewFoodField name="quantity" type="number" onChange={this.handleChange} value={this.state.quantity} onClick={this.handleClick}/>
          <button>Submit</button>
        </form>

        {food
          .filter((item) => item.name.toLowerCase().includes(this.state.search))
          .map((item, index) => {
          return <FoodBox key={index} name={item.name} calories={item.calories} image={item.image} quantity={item.quantity}/>
        })}
      </div>
    );
  }
}

class Search extends Component {

  render() {
    return(
      <input name="search" className="input" type="text" placeholder="Search..." onChange={this.props.onChange}/>
    )
  }
}

class AddNewFoodField extends Component {

  render() {
    return(
      <div className="field">
        <label className="label">{this.props.name}</label>
        <div className="control">
          <input className="input" type={this.props.type} name={this.props.name} onChange={e => this.props.onChange(e)} value={this.props.value}/>
        </div>
      </div>
    )
  }
}

class FoodBox extends Component {
  render() {
    return(
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img alt={this.props.name} src={this.props.image} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.name}</strong> <br />
                <small>{this.props.calories}</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={this.props.quantity}
                />
              </div>
              <div className="control">
                <button className="button is-info" onClick={e => this.props.onClick(e)}>
                  +
          </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default App;
