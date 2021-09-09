import logo from './logo.svg';
import './App.scss';
import React from 'react';

// pseudo code:
// First user input will go in the state key clickedValueOne, it will keep on going until an operator key is pressed
// operator key is saved in state as operatorValue
// values entered following operator key press will be saved in state as clickedValueTwo until another operator key or equal key is pressed
// As soon as operator key is pressed, the JS will perform arithmatic operation based on the key saved in state and the resulting value will replace the value in inputValueOne


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: ["AC", "+", "-", "x", "/", "%", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "=", "del"],
      clickedValueOne: '',
      clickedValueTwo: '',
      displayValue: '',
      operatorValue: '',
    }
  }

  handleDigits = (e) => {
    console.log(e)
    if ((this.state.operatorValue.length === 0) && !["x" , "+", "-", "/", "%", "del", "AC"].includes(e.target.dataset.name)) {
      console.log('first block')
      this.setState((prevState) => {
        return {
        clickedValueOne: prevState.clickedValueOne + e.target.innerText
        }
      }, () => {console.log(this.state)})
    }

    if (["x" , "+", "-", "/", "%"].includes(e.target.dataset.name) && e.target.dataset.name !== "=") {
      console.log('second block')

      this.setState({
        operatorValue: e.target.dataset.name
      })
    }

    if ((this.state.operatorValue.length !== 0) && ["x" , "+", "-", "/", "%", "del", "AC", "="].includes(e.target.dataset.name) === false) {
      console.log('third block')

      this.setState((prevState) => {
        return {
          clickedValueTwo: prevState.clickedValueTwo + e.target.innerText
        }
      }, () => {console.log(this.state.clickedValueTwo)})
    }

    if ((this.state.operatorValue) && (this.state.clickedValueOne) && (this.state.clickedValueTwo) && ["x" , "+", "-", "/", "%", "del", "AC", "="].includes(e.target.dataset.name)) {
      console.log('4th block')
      console.log(eval(this.state.clickedValueOne + this.state.operatorValue + this.state.clickedValueTwo))

          this.setState({
            clickedValueOne: eval((this.state.clickedValueOne + this.state.operatorValue + this.state.clickedValueTwo))
          })
    }
  }



  render() {
    return (
      <React.Fragment>
        <div>
          <input type="text" value={this.state.clickedValueOne}style={{width: "300px", height: "50px"}}>

          </input>
        </div>
        <div className="calculatorUI">
          {this.state.squares.map((elm, index) => {
            return(
                <div className="digitSquare"
                     onClick={this.handleDigits}
                     data-name={elm}
                >
                  {elm}
                </div>
            )
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
