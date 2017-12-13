## NORTHKINO

This is a project for Animations course in Oulu University of Applied Sciences. It utilizes Finnkinos XML API to showcase movies running in theaters and focuses on animations. Demo is running at [https://northkino.herokuapp.com/](https://northkino.herokuapp.com/).

It is built with React and Express, with Bootstrap base css styles. Animations are mainly made with CSS and [React Transition Group](https://github.com/reactjs/react-transition-group), but changing Theater/Area content fade-out-in is made with custom componentWillReceiveProps handler. 

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
