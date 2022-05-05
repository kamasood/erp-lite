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

const MaintenanceOrder = styled.button`
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

export default class Maintenance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      maint_orders: [],
      display: [],
      workstation_id: '',
      tool_id: '',
      expected_date: '',
      description: '',
      employee_id: '',
      sub_id: '',
      manager_id: 1,
      notes: '',
    };
    this.fetchMaintenance = this.fetchMaintenance.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterMaintenance = this.filterMaintenance.bind(this);
    this.addMaintenanceOrder = this.addMaintenanceOrder.bind(this);
  }

  componentDidMount() {
    this.fetchMaintenance();
  }

  fetchMaintenance() {
    axios.get('/maintenance')
      .then(({ data }) => {
        this.setState({
          maint_orders: data,
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

  filterMaintenance(e) {
    const { maint_orders } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: maint_orders
      });
    }
    let filtered = maint_orders.filter((mo) => {
      let name = mo.id.toLowerCase() + mo.description.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addMaintenanceOrder(e) {
    e.preventDefault();
    const { workstation_id, tool_id, expected_date, description, employee_id, sub_id, manager_id, notes } = this.state;
    const newMaintenanceOrder = {
      workstation_id,
      tool_id,
      expected_date,
      description,
      employee_id,
      sub_id,
      manager_id,
      notes
    };

    // TODO: post route in routes.js

    console.log(newMaintenanceOrder);

    // axios.post('/maintenance', newMaintenanceOrder)
    //   .then(() => this.fetchMaintenance())
    //   .catch(err => console.log(err));
  }

  render() {

    const { loading, maint_orders, display, workstation_id, tool_id, expected_date, description, employee_id, sub_id, manager_id, notes } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Create Maintenance Order</h2>
          <label>Workstation ID: </label>
          <input type="text" name="workstation_id" onChange={this.handleChange} value={workstation_id}/>
          <label>Tool ID: </label>
          <input type="text" name="tool_id" onChange={this.handleChange} value={tool_id}/>
          <label>Expected Date: </label>
          <input type="text" name="expected_date" onChange={this.handleChange} value={expected_date}/>
          <label>Description of Work: </label>
          <input type="text" name="description" onChange={this.handleChange} value={description}/>
          <label>Employee ID: </label>
          <input type="text" name="employee_id" onChange={this.handleChange} value={employee_id}/>
          <label>Subcontractor ID: </label>
          <input type="text" name="sub_id" onChange={this.handleChange} value={sub_id}/>
          <label>Manager: </label>
          <select name="manager_id" onChange={this.handleChange}>
            <option value="1">Paul</option>
            <option value="2">Kamran</option>
            <option value="5">Kevin</option>
          </select>
          <label>Notes: </label>
          <input type="text" name="notes" onChange={this.handleChange} value={notes}/>
          <button onClick={this.addMaintenanceOrder}>Add</button>
        </Form>
        <Search>
          <h2>Open Maintenance Orders</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterMaintenance}/>
          <section>
            {display.map((mo) => (
              <Link style={{textDecoration: "none"}} to={`/production/maintenance/${mo.id}`} key={mo.id}>
                <MaintenanceOrder>{mo.id + ' -' + mo.expected_date + '-'}</MaintenanceOrder>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={maint_orders}/>
      </View>
    );
  }
};
