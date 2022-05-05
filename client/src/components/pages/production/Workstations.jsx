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

const WorkStation = styled.button`
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

export default class Workstations extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      workstations: [],
      display: [],
      name: '',
      department_id: 1,
      cost: 0,
      maintenance_cycle: 3,
    };
    this.fetchWorkstations = this.fetchWorkstations.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterWorkStations = this.filterWorkStations.bind(this);
    this.addWorkstation = this.addWorkstation.bind(this);
  }

  componentDidMount() {
    this.fetchWorkstations();
  }

  fetchWorkstations() {
    axios.get('/workstations')
      .then(({ data }) => {
        this.setState({
          workstations: data,
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

  filterWorkStations(e) {
    const { workstations } = this.state;
    let search = e.target.value.toLowerCase();
    if (search === '') {
      this.setState({
        display: workstations
      });
    }
    let filtered = workstations.filter((ws) => {
      let name = ws.name.toLowerCase();
      return name.includes(search);
    });
    this.setState({
      display: filtered
    })
  }

  addWorkstation(e) {
    e.preventDefault();
    const { name, department_id, cost, maintenance_cycle } = this.state;
    const newWorkstation = {
      name,
      department_id,
      cost,
      maintenance_cycle,
    };

    console.log(newWorkstation);

    axios.post('/workstations', newWorkstation)
      .then(() => this.fetchWorkstations())
      .catch(err => console.log(err));
  }

  render() {

    const { loading, workstations, display, name, department_id, cost, maintenance_cycle } = this.state;

    return (
      loading ? null :
      <View>
        <Form>
          <h2>Add Workstation</h2>
          <label>Name: </label>
          <input type="text" name="name" onChange={this.handleChange} value={name}/>
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
          <label>Cost: </label>
          <input type="text" name="cost" onChange={this.handleChange} value={cost}/>
          <label>Maintenance Cycle: </label>
          <select onChange={this.handleChange}>
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
            <option value={24}>24 months</option>
          </select>
          <button onClick={this.addWorkstation}>Add</button>
        </Form>
        <Search>
          <h2>Search Workstations</h2>
          <br/>
          <input style={{ height: "20px" }} type="text" name="search" onChange={this.filterWorkStations}/>
          <section>
            {display.map((ws) => (
              <Link style={{textDecoration: "none"}} to={`/production/workstations/${ws.id}`} key={ws.id}>
                <WorkStation>{ws.name + ' -' + ws.id + '-'}</WorkStation>
              </Link>
            ))}
          </section>
        </Search>
        <Outlet context={workstations}/>
      </View>
    );
  }
};
