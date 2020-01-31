import React from 'react'

export const Authentication = React.createContext({
  isAuthenticated: true,
  changeAuthen: () => {}
})

export const LineCheck = React.createContext({
  loginObj: null,
  changeLineStatus: () => { }
})
