import React from 'react'
import JsxToJs from './JsxToJs'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      txt: 'this is the initial txt key property value in state.',
      c: ''
    }
  }
  update (event) {
    this.setState({
      txt: event.target.value,
      a: 'a',
      b: 'b'
    })
  }
  refUpdate () {
    this.setState({
      a: this.refs.a.value,
      b: this.refs.b.value,
      c: this.c.refs.refBoxInput.value
    })
  }
  render () {
    return (
      <div>
        <JsxToJs />
        <p>----</p>
        <MagicTextBox update={this.update.bind(this)} />
        <h1>{this.state.txt}</h1>
        <TextAreaBox />
        <input ref='a' type='text' onChange={this.refUpdate.bind(this)} /> {this.state.a}
        <input ref='b' type='text' onChange={this.refUpdate.bind(this)} /> {this.state.b}
        <br />
        <h6>MagicTextBoxRefs</h6>
        <MagicTextBoxRefs
          ref={component => this.c = component}
          update={this.refUpdate.bind(this)}
        /> {this.state.c}
      </div>
    )
  }
}

const MagicTextBox = props => <input type='text' onChange={props.update} />
class MagicTextBoxRefs extends React.Component {
  render () {
    return (
      <input ref='refBoxInput' type='text' onChange={this.props.update} />
    )
  }
}

class TextAreaBox extends React.Component {
  constructor () {
    super()
    this.state = {
      eventType: 'default state text'
    }
    this.update = this.update.bind(this)
  }
  update (event) {
    this.setState({
      eventType: event.type
    })
  }
  render () {
    return (
      <div>
        <textarea
          cols='40'
          rows='15'
          onKeyPress={this.update}
          onCopy={this.update}
          onCut={this.update}
          onPaste={this.update}
          onFocus={this.update}
          onBlur={this.update}
          onMouseOver={this.update}
          onMouseLeave={this.update}
        />
        <h1>{this.state.eventType}</h1>
      </div>
    )
  }
}

export default App

// Class Component ( w/ JSX )
// class App extends React.Component {
//   render () {`
//     return <h1>Hello World!</h1>
//   }
// }

// Class Component ( sans-JSX )
// class App extends React.Component {
//   render () {
//     return React.createElement('h1', null, 'Hello World!')
//   }
// }

// Stateless functional component
// const App = () => <h1>Hello World!</h1>

/* A react components render method can only return a single node.

  class App extends React.Component {
    render () {
      return <h1>Hello Earth!</h1> <h1>Hello Mars!</h1>
    }
  }

   For example, the class component above will return an error message like:

     Syntax error: Adjacent JSX elements must be wrapped in an enclosing tag

  Why can the render method only contain a single node?
  Consider the following class component.  It should render the same output as the example above,
  but it does not use JSX.

  class App extends React.Component {
    render () {
      return React.createElement('h1', null, 'Hello Earth!') React.createElement('h1', null, 'Hello Mars!')
    }
  }

  Javascript's return statement only returns one value.
  JSX makes it difficult to see that render is returning more than one value if
  all elements are not wrapped inside of one element.
*/
