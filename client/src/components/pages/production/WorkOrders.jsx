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

const WorkOrder = styled.button`
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

export default class WorkOrders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      workorders: [],
      display: [],
      customer_id: '',
      asset_id: '',
      name: '',
      description: '',
      begin_date: '',
      location_id: 1,
      manager_id: 1,
    };
    this.fetchWorkOrders = this.fetchWorkOrders.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterWorkOrders = this.filterWorkOrders.bind(this);
    this.addWorkOrder = this.addWorkOrder.bind(this);
  }

  componentDidMount() {
    this.fetchWorkOrders();
  }

  fetchWorkOrders() {
    axios.get('/workorders')
      .then(({ data }) => {
        this.setState({
          workorders: data,
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

  filterWorkOrders(e) {
    const { workorders } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: workorders
      });
    }
    let filtered = workorders.filter((wo) => {
      let name = wo.name.toLowerCase() + wo.description.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addWorkOrder(e) {
    e.preventDefault();
    const { customer_id, asset_id, name, description, begin_date, location_id, manager_id } = this.state;
    const newWorkOrder = {
      customer_id,
      asset_id,
      name,
      description,
      begin_date,
      location_id,
      manager_id,
    };

    console.log(newWorkOrder);

    axios.post('/workorders', newWorkOrder)
      .then(() => this.fetchWorkOrders())
      .catch(err => console.log(err));
  }

  render() {

    const { loading, workorders, display, customer_id, asset_id, name, description, begin_date, location_id, manager_id } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Create Work Order</h2>
          <label>Customer ID: </label>
          <input type="text" name="customer_id" onChange={this.handleChange} value={customer_id}/>
          <label>Asset ID: </label>
          <input type="text" name="asset_id" onChange={this.handleChange} value={asset_id}/>
          <label>Name: </label>
          <input type="text" name="name" onChange={this.handleChange} value={name}/>
          <label>Description of Work: </label>
          <input type="text" name="description" onChange={this.handleChange} value={description}/>
          <label>Start Date: </label>
          <input type="text" name="begin_date" onChange={this.handleChange} value={begin_date}/>
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
          <button onClick={this.addWorkOrder}>Add</button>
        </Form>
        <Search>
          <h2>Open Work Orders</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterWorkOrders}/>
          <section>
            {display.map((wo) => (
              <Link style={{textDecoration: "none"}} to={`/production/${wo.id}`} key={wo.id}>
                <WorkOrder>{wo.name + ' -' + wo.customer_id + '-'}</WorkOrder>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={workorders}/>
      </View>
    );
  }
};
