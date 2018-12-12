import React from 'react'
import ReactDOM from 'react-dom'

const Headline = ({name}) =>
    <div> 
        <h1>{name}</h1> 
    </div>

const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}>
        {text}
    </button>

const Statistic = ({ name, counter, unit }) => 
    <tr>
        <td>{name}</td>
        <td>{counter}</td>
        <td>{unit}</td>
    </tr>  

const Statistics = ({feedback}) => {
    const sum = feedback.counter1 + feedback.counter2 + feedback.counter3
    const totalRating = feedback.counter1 - feedback.counter3
    const average = sum > 0 ? totalRating/sum : 0
    const positives = sum > 0 ? feedback.counter1/sum * 100 : 0

    if (!sum) {
        return ( <p>ei yhtään palautetta annettu</p> )
    }
    return ( 
        <table> 
            <tbody>
                <Statistic name="hyvä" counter={feedback.counter1} />
                <Statistic name="neutraali" counter={feedback.counter2} />
                <Statistic name="huono" counter={feedback.counter3} />
                <Statistic name="keskiarvo" counter={average} />
                <Statistic name="positiivisia" counter={positives} unit={"%"}/>
            </tbody>
        </table> 
    )
}  

class App extends React.Component { 
    constructor() {
        super()
        let i = 0
        this.state = {
            ['counter' + ++i]: 0,
            ['counter' + ++i]: 0,
            ['counter' + ++i]: 0
        }
    }

    giveFeedback = (counter, value) => { 
        let newState = {}
        newState[counter] = value
        return () => {
            this.setState(newState) 
        }
    }
    
    render(){
        const mainHeading = "anna palautetta"
        const subHeading = "statistiikka"

        return (
            <div>
                <Headline name={mainHeading} />
                <Button 
                    text="hyvä" 
                    handleClick={this.giveFeedback("counter1", this.state["counter1"] + 1)}
                />
                <Button 
                    text="neutraali" 
                    handleClick={this.giveFeedback("counter2", this.state["counter2"] + 1)}
                />
                <Button
                    text="huono" 
                    handleClick={this.giveFeedback("counter3", this.state["counter3"] + 1)}
                />
                <Headline name={subHeading} />   
                <Statistics feedback={this.state} />           
            </div>
        )
    }
}
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
