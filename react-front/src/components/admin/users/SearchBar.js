import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this._parent = props._parent;
    this.state = {
      searchQuery: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value
    });
  }

  handleSearchClick = () => {
    // Aquí se puede implementar la lógica de búsqueda
    // console.log(`Buscar por: ${this.state.searchQuery}`);
    this._parent.handleSearchQueryChange(this.state.searchQuery);
  }

  render() {
    return (
      <div className='d-flex justify-content-center'>
        <input type="text"  className="bordered" value={this.state.searchQuery} onChange={this.handleInputChange} onKeyUp={this.handleSearchClick} />
        <button className='btn btn-success btn-sm' onClick={this.handleSearchClick}>Buscar</button>
      </div>
    );
  }
}