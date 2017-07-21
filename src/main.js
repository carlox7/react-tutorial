import React from 'react'
import faker from 'faker'
import ReactDom from 'react-dom'
import cowsay from 'cowsay-browser'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: '',
    }

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({
      content: cowsay.say({text: faker.lorem.words(10)}),
    })
  }
  render(){
    return(
      <div>
        <h1> Generate Cowsay Lorem </h1>
        <button onClick={this.handleClick}> CLICK HERE </button>
        <pre> {this.state.content} </pre>
      </div>
    )
  }
}

// create a place to put the app
const container = document.createElement('div');
document.body.appendChild(container);
ReactDom.render(<App />, container);
