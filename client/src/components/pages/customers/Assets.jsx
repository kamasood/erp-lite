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

const Asset = styled.button`
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

export default class Assets extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assets: [],
      display: [],
      customer_id: '',
      name: '',
      manufacturer: '',
      model: '',
      year: '',
      size: '',
      location: '',
    };
    this.fetchAssets = this.fetchAssets.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterAssets = this.filterAssets.bind(this);
    this.addAsset = this.addAsset.bind(this);
  }

  componentDidMount() {
    this.fetchAssets();
  }

  fetchAssets() {
    axios.get('/assets')
      .then(({ data }) => {
        this.setState({
          assets: data,
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

  filterAssets(e) {
    const { assets } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: assets
      });
    }
    let filtered = assets.filter((asset) => {
      let name = asset.name.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addAsset(e) {
    e.preventDefault();
    const { customer_id, name, manufacturer, model, year, size, location } = this.state;
    const newAsset = {
      customer_id,
      name,
      manufacturer,
      model,
      year,
      size,
      location
    };

    console.log(newAsset);

    axios.post('/assets', newAsset)
      .then(() => this.fetchAssets())
      .catch(err => console.log(err));
  }

  render() {

    const { loading, assets, display, customer_id, name, manufacturer, model, year, size, location } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Add Asset</h2>
          <label>Customer ID: </label>
          <input type="text" name="customer_id" onChange={this.handleChange} value={customer_id}/>
          <label>Name: </label>
          <input type="text" name="name" onChange={this.handleChange} value={name}/>
          <label>Manufacturer: </label>
          <input type="text" name="manufacturer" onChange={this.handleChange} value={manufacturer}/>
          <label>Model: </label>
          <input type="text" name="model" onChange={this.handleChange} value={model}/>
          <label>Year: </label>
          <input type="text" name="year" onChange={this.handleChange} value={year}/>
          <label>Size: </label>
          <input type="text" name="size" onChange={this.handleChange} value={size}/>
          <label>Location: </label>
          <input type="text" name="location" onChange={this.handleChange} value={location}/>
          <button onClick={this.addAsset}>Add</button>
        </Form>
        <Search>
          <h2>Search Assets</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterAssets}/>
          <section>
            {display.map((asset) => (
              <Link style={{textDecoration: "none"}} to={`/customers/assets/${asset.id}`} key={asset.id}>
                <Asset>{asset.name + ' -' + asset.customer_id + '-'}</Asset>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={assets}/>
      </View>
    );
  }
};
