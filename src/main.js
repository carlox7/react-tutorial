import React from 'react'
import faker from 'faker'
import ReactDom from 'react-dom'
import cowsay from 'cowsay-browser'
import superagent from 'superagent'

const API_URL = 'http://pokeapi.co/api/v2'

// create a form container component every time you create a Form
// a form container is a component that holds the state for a forms inputs

class PokemonForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokeName: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePokemonNameChange = this.handlePokemonNameChange.bind(this)
  }
  handlePokemonNameChange(e){
    this.setState({pokeName: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.pokemonSelect(this.state.pokeName)
  }
  render(){
    return(
      // all inputs should hae their values bound to a state
      //this is called controlled input
      <form onSubmit={this.handleSubmit} >
        <input
          type='text'
          name='pokemonName'
          placeholder='Pokemon Name'
          value={this.state.pokeName}
          onChange={this.handlePokemonNameChange}
          />
          <p>Name</p>
          <p>{ this.state.pokeName }</p>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pokemonLookup: [],
      pokemonSelected: null,
      pokemonNameError: '',
    }
    }

    componentDidUpdate(){
      console.log('__SATE__', this.state);
    }

    componentDidMount(){
      superagent.get(`${API_URL}/pokemon/`)
      .then(res => {
        let pokemonLookup = res.body.results.reduce((lookup, n) => {
            lookup[n.name] = n.url;
          return lookup
        }, {})
        console.log('pokemonLookup', pokemonLookup);
        this.setState({pokemonLookup})
      })
      .catch(err => {
        console.error(err)
      })
    }

    pokemonSelect(name){
      if(!pokemonLookup[name]){
        //do something on state that enables the iew to show an error that the pokemon does not exist
        this.setState({
          pokemonSelected: null,
          pokemonNameError: name,
        })
      } else{
        //make a request to the pokemon api and do something on state to store the pokemon details to be displatd to the user
        superagent.get(pokemonLookup[name])
        .then(res => {
          console.log('selected pokemon', res.body);
        })
        .catch(console.error)

      }
    }

  render(){
    return(
      <div>
        <h1> Form Demo </h1>
        <PokemonForm pokemonSelect={this.pokemonSelect} />
        <p>pokemon name error: {this.state.pokemonNameError}</p>
      </div>
    )
  }
}

// create a place to put the app
const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
