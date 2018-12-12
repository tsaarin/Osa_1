import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: new Array(anecdotes.length).fill(0)
        }
    }

    randomIntHighExclusive = (low, high) => {
        return Math.floor(Math.random() * (high - low) ) + low
    }

    getAnecdote = () => {
        const high = anecdotes.length
        const random = this.randomIntHighExclusive(0, high)
        return () => {
            this.setState({ selected: random }) 
        }
    }

    vote = () => {
        const votesCopy = [...this.state.votes]
        votesCopy[this.state.selected] += 1
        return () => {
            this.setState({votes: votesCopy})
        }
    }

    getMostVoted = () => {
        const max = Math.max(...this.state.votes)
        return {
            index: this.state.votes.indexOf(max),
            votecount: max
        }
    }
    
    render() {
        return (
            <div>
                <Display text={this.props.anecdotes[this.state.selected]} />
                <Stat votecount={this.state.votes[this.state.selected]} />
                <Button text="next anecdote" handleClick={this.getAnecdote()} />
                <Button text="vote" handleClick={this.vote()}/>
                <Heading text="anecdote with most votes:" />
                <Topvote voteobject={this.getMostVoted()} />
            </div>
        )
    }
}

const Display = ({ text }) =>
    <div> {text} </div>

const Stat = ({ votecount }) =>
<div> has {votecount} votes </div>

const Button = ({ handleClick, text }) =>
    <button onClick={handleClick}>
        {text}
    </button>

const Heading = ({ text }) => <h2>{text}</h2>   
    
const Topvote = ({ voteobject }) => {
    return (
        <div>
            <Display text={anecdotes[voteobject.index]} />
            <Stat votecount={voteobject.votecount} />
        </div>
    )
}    

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)