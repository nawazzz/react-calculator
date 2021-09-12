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
      ops: ['/', '*', '-', '+', '.'],
      calc: "",
      result: "",
    }
  }

  createDigits = () => {
		const digits = [];
		for (let i = 1; i < 10; i++) {
			digits.push(<button 
          onClick={(e) => this.setState((prevState) => {
            return {
              calc: prevState.calc + i.toString() 
            }
          })} key={i}>
            {i}
        </button>);
		}

		return digits;
	}

  updateCalc = (value) => {
    if(
      (this.state.ops.includes(value) && this.state.calc === "") || 
      (this.state.ops.includes(value) && this.state.ops.includes(this.state.calc.slice(-1)))
    ) {
      return
    }
    this.setState((prevState) => {
      return {
        calc: prevState.calc + value
      }
    })
    if (!this.state.ops.includes(value)) {
      this.setState((prevState) => {
        return {
          result: eval(prevState.calc + value).toString()
        }
      })
    }
  }

  calculate = () => {
    this.setState((prevState) => {
      return {
        calc: eval((this.state.calc).toString())
      }
    })
  }

  deleteLast = () => {
    if (this.state.calc === "") {
      return
    } 
    const value = this.state.calc.toString().slice(0, -1);
    this.setState({
      calc: value
    })
  }

  render() {
    return (
      <div style={{width: "180px", margin: "0 auto"}}>
        <div className="display">
					<span>{this.state.result ? '(' + this.state.result + ')' : ''}</span> {this.state.calc || 0}
				</div>
        <div className="operators">
          <button className="operatorButtons" onClick={() => this.updateCalc("/")}>/</button>
          <button className="operatorButtons" onClick={() => this.updateCalc("*")}>x</button>
          <button className="operatorButtons" onClick={() => this.updateCalc("+")}>+</button>
          <button className="operatorButtons" onClick={() => this.updateCalc("-")}>-</button>
          <button className="operatorButtons" onClick={this.deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {this.createDigits()}
          <button style={{borderBottomLeftRadius: "8px"}} className="operatorButtons" onClick={() => this.setState({calc: "0"})}>0</button>
          <button className="operatorButtons" onClick={() => this.updateCalc(".")}>.</button>
          <button style={{borderBottomRightRadius: "8px"}} className="operatorButtons" onClick={this.calculate}>=</button>
        </div>
      </div>
    );
  }
}

export default App;
