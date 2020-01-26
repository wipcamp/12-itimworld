import React from 'react'

export const isAuthenticated = {
  PassAuthen: true,
  NotAuthen: false
}

export const Authentication = React.createContext({
  user: isAuthenticated.NotAuthen,
  changeAuthen: () => {}
})
