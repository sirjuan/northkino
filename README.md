## NORTHKINO

This is a project for Animations course in [Oulu University of Applied Sciences](). It utilises [Finnkinos XML API](http://www.finnkino.fi/XML) to showcase movies running in theaters and focuses on animations. Demo is running at [https://northkino.herokuapp.com/](https://northkino.herokuapp.com/) (API restart may take a while if it's idling, a Heroku feature).

It is built with [React](https://reactjs.org/)+[Redux](https://redux.js.org/) and [Express](https://expressjs.com/), with [Bootstrap](https://getbootstrap.com/)([Reactstrap](http://reactstrap.github.io/)) base css styles. Animations are mainly made with CSS and [React Transition Group](https://github.com/reactjs/react-transition-group), but changing Theater/Area content fade-out-in is made with custom componentWillReceiveProps handler. 

## Installation and running (development)

```
git clone git@github.com:sirjuan/northkino.git
npm install
npm run start-dev
```

## Building for production

```
npm run build
npm run start-api
```
