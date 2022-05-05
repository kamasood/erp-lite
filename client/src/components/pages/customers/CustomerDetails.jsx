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

const Customer = styled.button`
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

export default class Customers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      customers: [],
      display: [],
      first_name: '',
      last_name: '',
      email: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      manager_id: 1,
    };
    this.fetchCustomers = this.fetchCustomers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterCustomers = this.filterCustomers.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    axios.get('/customers')
      .then(({ data }) => {
        this.setState({
          customers: data,
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

  filterCustomers(e) {
    const { customers } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: customers
      });
    }
    let filtered = customers.filter((customer) => {
      let name = customer.first_name.toLowerCase() + customer.last_name.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addCustomer(e) {
    e.preventDefault();
    const { first_name, last_name, email, address_1, address_2, city, state, zip, phone, manager_id } = this.state;
    const newCustomer = {
      first_name,
      last_name,
      email,
      address_1,
      address_2,
      city,
      state,
      zip,
      phone,
      manager_id
    };

    axios.post('/customers', newCustomer)
      .then(() => this.fetchCustomers())
      .catch(err => console.log(err));
  }

  render() {

    const { loading, customers, display, first_name, last_name, email, address_1, address_2, city, state, zip, phone, text_msg, manager_id } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Add Customer</h2>
          <label>First: </label>
          <input type="text" name="first_name" onChange={this.handleChange} value={first_name}/>
          <label>Last: </label>
          <input type="text" name="last_name" onChange={this.handleChange} value={last_name}/>
          <label>Email: </label>
          <input type="text" name="email" onChange={this.handleChange} value={email}/>
          <label>Phone: </label>
          <input type="text" name="phone" onChange={this.handleChange} value={phone}/>
          <label>Address 1: </label>
          <input type="text" name="address_1" onChange={this.handleChange} value={address_1}/>
          <label>Address 2: </label>
          <input type="text" name="address_2" onChange={this.handleChange} value={address_2}/>
          <label>City: </label>
          <input type="text" name="city" onChange={this.handleChange} value={city}/>
          <label>State: </label>
          <input type="text" name="state" onChange={this.handleChange} value={state}/>
          <label>Zip: </label>
          <input type="text" name="zip" onChange={this.handleChange} value={zip}/>
          <label>Manager: </label>
          <select name="manager_id" onChange={this.handleChange}>
            <option value="1">Paul</option>
            <option value="2">Kamran</option>
            <option value="5">Kevin</option>
          </select>
          <button onClick={this.addCustomer}>Add</button>
        </Form>
        <Search>
          <h2>Search Customers</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterCustomers}/>
          <section>
            {display.map((customer) => (
              <Link style={{textDecoration: "none"}} to={`/customers/${customer.id}`} key={customer.id}>
                <Customer>{customer.first_name + ' ' + customer.last_name}</Customer>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={customers}/>
      </View>
    );
  }
};
