/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {Component} from 'react'

class Register extends Component {
  state = {
    email: '',
    password: '',
    role: 'student',
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.handleRegister(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <label>
          <input
            type="radio"
            name="role"
            value="student"
            checked={this.state.role === 'student'}
            onChange={this.handleChange}
          />
          Student
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="teacher"
            checked={this.state.role === 'teacher'}
            onChange={this.handleChange}
          />
          Teacher
        </label>
        <button type="submit">Submit</button>
        <p>
          Already a member? <a onClick={this.props.toggleForm}>Login</a>
        </p>
      </form>
    )
  }
}
export default Register
