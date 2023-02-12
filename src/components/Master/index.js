/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Master extends Component {
  constructor(props) {
    super(props)
    this.state = {
      calculation: '',
      activities: [],
      isLoggedOut: false,
    }
  }

  componentDidMount() {
    const activities = JSON.parse(localStorage.getItem('activities')) || []
    this.setState({activities})
  }

  handleChange = event => {
    this.setState({calculation: event.target.value})
  }

  handleLogout = () => {
    localStorage.removeItem('activities')
    this.setState({isLoggedOut: true})
  }

  handleSubmit = event => {
    event.preventDefault()
    const result = this.calculateResult(this.state.calculation)
    const activities = [
      ...this.state.activities,
      {calculation: this.state.calculation, result},
    ]
    localStorage.setItem('activities', JSON.stringify(activities))
    this.setState({calculation: '', activities})
  }

  calculateResult = calculation => {
    const numbers = [
      'zero',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ]
    const operations = {
      plus: (a, b) => a + b,
      minus: (a, b) => a - b,
      times: (a, b) => a * b,
      divided_by: (a, b) => Math.floor(a / b),
    }

    const [left, operation, right] = calculation.split(' ')
    const leftNum = numbers.indexOf(left)
    const rightNum = numbers.indexOf(right)
    return operations[operation](leftNum, rightNum)
  }

  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to="/" />
    }
    return (
      <>
        <nav className="nav">
          <h1>Master</h1>
          <div>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        </nav>
        <div className="mainBg">
          <div className="holder">
            <form onSubmit={this.handleSubmit} className="formbox">
              <input
                type="text"
                className="input"
                value={this.state.calculation}
                onChange={this.handleChange}
                placeholder="Enter calculation"
              />
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
            <div className="ex">
              <h2>List of operations</h2>
              <ul>
                <li>times</li>
                <li>plus</li>
                <li>minus</li>
                <li>divided_by</li>
              </ul>
            </div>
            <div className="activity-log">
              <h2>Activity Log</h2>
              <ul>
                {this.state.activities.map((activity, index) => (
                  <li key={index}>
                    {activity.calculation} = {activity.result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Master
