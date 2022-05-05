import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const View = styled.section`
  display: grid;
  height: 625px;
  grid-template-columns: 33% 33% 33%;
  justify-content: center;
`

const Form = styled.form`
  grid-column-start: 1;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
`

const Search = styled.section`
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding-top: 20px;
`

const Part = styled.button`
  display: block;
  color: black;
  font-family: Roboto;
  font-size: 20px;
  border: 1px solid gray;
  border-top: none;
  background: none;
  text-decoration: none;
  height: 50px;
  width: 400px;
  cursor: pointer;
  &:hover {
    background-color: #f2f3f4;
  }
`

export default class Parts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      parts: [],
      display: [],
      part_number: '',
      description: '',
      subclass: '',
      department_id: 1,
      list_price: '',
      retail_price: '',
      keywords: '',
      notes: '',
    };
    this.fetchParts = this.fetchParts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterParts = this.filterParts.bind(this);
    this.addPart = this.addPart.bind(this);
  }

  componentDidMount() {
    this.fetchParts();
  }

  fetchParts() {
    axios.get('/parts')
      .then(({ data }) => {
        this.setState({
          parts: data,
          display: data,
          loading: false
        })
      })
      .catch(err=> console.log(err));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  filterParts(e) {
    const { parts } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: parts
      });
    }
    let filtered = parts.filter((part) => {
      let name = part.part_number.toLowerCase() + part.description.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addPart(e) {
    e.preventDefault();
    const { part_number, description, subclass, department_id, list_price, retail_price, keywords, notes } = this.state;
    const newPart = {
      part_number,
      description,
      subclass,
      department_id,
      list_price,
      retail_price,
      keywords,
      notes
    };

    console.log(newPart);

    axios.post('/parts', newPart)
      .then(() => this.fetchParts())
      .catch(err => console.log(err));
  }

  render() {

    const { loading, parts, display, part_number, description, subclass, department_id, list_price, retail_price, keywords, notes } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Add Part</h2>
          <label>Part Number: </label>
          <input type="text" name="part_number" onChange={this.handleChange} value={part_number}/>
          <label>Description: </label>
          <input type="text" name="description" onChange={this.handleChange} value={description}/>
          <label>Subclass: </label>
          <input type="text" name="subclass" onChange={this.handleChange} value={subclass}/>
          <label>Department: </label>
          <select name="department_id" onChange={this.handleChange}>
              <option value={1}>General</option>
              <option value={2}>Electronics</option>
              <option value={3}>Electrical</option>
              <option value={4}>Plastics</option>
              <option value={5}>Machining</option>
              <option value={6}>Chemicals</option>
              <option value={7}>Painting</option>
          </select>
          <label>List Price: </label>
          <input type="text" name="list_price" onChange={this.handleChange} value={list_price}/>
          <label>Retail Price: </label>
          <input type="text" name="retail_price" onChange={this.handleChange} value={retail_price}/>
          <label>Keywords: </label>
          <input type="text" name="keywords" onChange={this.handleChange} value={keywords}/>
          <label>Notes: </label>
          <input type="text" name="notes" onChange={this.handleChange} value={notes}/>
          <button onClick={this.addPart}>Add</button>
        </Form>
        <Search>
          <h2>Search Parts</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterParts}/>
          <section>
            {display.map((part) => (
              <Link style={{textDecoration: "none"}} to={`/inventory/${part.id}`} key={part.id}>
                <Part>{part.part_number}</Part>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={parts}/>
      </View>
    );
  }
};
