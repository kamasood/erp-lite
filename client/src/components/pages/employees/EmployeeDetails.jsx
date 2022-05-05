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

const Employee = styled.button`
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

export default class Employees extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      employees: [],
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
      location_id: 1,
      manager_id: 1,
    };
    this.fetchEmployees = this.fetchEmployees.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterEmployees = this.filterEmployees.bind(this);
    this.addEmployee = this.addEmployee.bind(this);
  }

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    axios.get('/employees')
      .then(({ data }) => {
        this.setState({
          employees: data,
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

  filterEmployees(e) {
    const { employees } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: employees
      });
    }
    let filtered = employees.filter((employee) => {
      let name = employee.first_name.toLowerCase() + employee.last_name.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addEmployee(e) {
    e.preventDefault();
    const { first_name, last_name, email, address_1, address_2, city, state, zip, phone, location_id, manager_id } = this.state;
    const newEmployee = {
      first_name,
      last_name,
      email,
      address_1,
      address_2,
      city,
      state,
      zip,
      phone,
      location_id,
      manager_id
    };

    console.log(newEmployee);

    axios.post('/employees', newEmployee)
      .then(() => this.fetchEmployees())
      .catch(err => console.log(err));
  }

  render() {

    const { loading, employees, display, first_name, last_name, email, address_1, address_2, city, state, zip, phone, text_msg, location_id, manager_id } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Add Employee</h2>
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
          <label>Location: </label>
          <select name="location_id" onChange={this.handleChange}>
            <option value="1">Plant 1</option>
            <option value="2">Plant 2</option>
            <option value="3">Offsite</option>
          </select>
          <label>Manager: </label>
          <select name="manager_id" onChange={this.handleChange}>
            <option value="1">Paul</option>
            <option value="2">Kamran</option>
            <option value="5">Kevin</option>
          </select>
          <button onClick={this.addEmployee}>Add</button>
        </Form>
        <Search>
          <h2>Search Employees</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterEmployees}/>
          <section>
            {display.map((employee) => (
              <Link style={{textDecoration: "none"}} to={`/employees/${employee.id}`} key={employee.id}>
                <Employee>{employee.first_name + ' ' + employee.last_name}</Employee>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={employees}/>
      </View>
    );
  }
};
