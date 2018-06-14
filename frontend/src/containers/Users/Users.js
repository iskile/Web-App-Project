import React from "react"
import { Switch, Route } from "react-router"
import EmailConfirmation from "../EmailConfirmation"
import CompleteRegistration from "../CompleteRegistration"
import Login from "../Login/Login"

const Users = () => (
  <Switch>
    <Route path="/users/email-confirmation" component={EmailConfirmation} />
    <Route
      path="/users/complete-registration"
      component={CompleteRegistration}
    />
    <Route path="/users/login" component={Login} />
  </Switch>
)

export default Users
