/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Student extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities: JSON.parse(localStorage.getItem('activities')) || [],
      isLoggedOut: false,
    }
  }

  componentDidMount() {
    window.addEventListener('storage', this.updateActivities)
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.updateActivities)
  }

  handleLogout = () => {
    localStorage.removeItem('activities')
    this.setState({isLoggedOut: true})
  }

  updateActivities = () => {
    this.setState({
      activities: JSON.parse(localStorage.getItem('activities')) || [],
    })
  }

  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to="/" />
    }
    return (
      <>
        <nav className="nav">
          <h1>Student</h1>
          <div>
            <button onClick={this.handleLogout}>Logout</button>
          </div>
        </nav>
        <div className="student-container">
          <h3 className="student-title">Student</h3>
          <div className="activity-log">
            Activity Log:
            <ul className="activity-list">
              {this.state.activities.map((activity, index) => (
                <li key={index} className="activity-item">
                  {activity.calculation} = {activity.result}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Student
