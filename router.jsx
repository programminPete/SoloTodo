import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import calendar from './modules/calendar'
import stocks from './modules/stocks'
import todo from './modules/todo'
import weather from './modules/weather'

class Router extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={StarterApp}/>
        <Route path='/calendar' component={calendar}/>
        <Route path='/stocks' component={stocks}/>
        <Route path='/todo' component={todo}/>
        <Route path='/weather' component={weather}/>
      </Switch>
    )
  }
}
export default Router
