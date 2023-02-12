/* eslint-disable no-restricted-globals */
import {createBrowserHistory} from 'history'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Login from '../Login/index'
import Register from '../Register/index'

import './Home.css'

class Home extends Component {
  state = {
    form: 'login',
    users: [],
  }

  componentDidMount() {
    const users = JSON.parse(localStorage.getItem('users')) || []
    this.setState({users})
  }

  handleLogin = user => {
    const {users} = this.state

    const foundUser = users.find(
      storedUser =>
        storedUser.email === user.email &&
        storedUser.password === user.password,
    )
    if (foundUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser))
      this.setState({loggedInUser: foundUser})
    } else {
      alert('Incorrect email or password')
    }
  }

  handleRegister = user => {
    const {users} = this.state
    users.push(user)
    this.setState({users})
    localStorage.setItem('users', JSON.stringify(users))
    this.setState({form: 'login'})
  }

  toggleForm = () => {
    this.setState(prevState => ({
      form: prevState.form === 'login' ? 'register' : 'login',
    }))
  }

  render() {
    const {form, loggedInUser} = this.state
    const history = createBrowserHistory()
    if (loggedInUser) {
      const {role} = loggedInUser
      if (role === 'student') {
        return <Redirect to="/student" />
      }
      return <Redirect to="/Master" />
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Teacher & Student Login</h1>
          <div className="form-container">
            {form === 'login' ? (
              <Login
                handleLogin={this.handleLogin}
                toggleForm={this.toggleForm}
              />
            ) : (
              <Register
                handleRegister={this.handleRegister}
                toggleForm={this.toggleForm}
              />
            )}
          </div>
        </header>
      </div>
    )
  }
}

export default Home
