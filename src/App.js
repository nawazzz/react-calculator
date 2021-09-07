import logo from './logo.svg';
import './App.scss';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: ["AC", "+", "-", "x", "/", "%", 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, "=", "del"],
      clickedValue: '',
      displayValue: '',
      operatorValue: '',
    }
  }

  handleCalculation = (e) => {
    this.setState((prevState) => {
      return {
      clickedValue: prevState.clickedValue + e.target.innerText
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <input type="text" value={this.state.clickedValue}style={{width: "300px", height: "50px"}}>

          </input>
        </div>
        <div className="calculatorUI">
          {this.state.squares.map((elm, index) => {
            return(
                <div className="digitSquare"
                     onClick={this.handleCalculation}
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
