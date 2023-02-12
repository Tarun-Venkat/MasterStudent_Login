import {Route, Switch} from 'react-router-dom'

import Home from './components/Home/index'
import StudentPage from './components/student/index'
import Master from './components/Master/index'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />

    <Route exact path="/student" component={StudentPage} />
    <Route exact path="/Master" component={Master} />
  </Switch>
)

export default App
