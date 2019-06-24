import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

class Cadastro extends React.Component {

    constructor(props) {
        super(props);

        this.state = {name: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addNameToList(this.state.name);
        this.setState({name: ''});
        this.inputName.value = '';
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input 
                    ref={ (ref) => this.inputName=ref }
                    type="text" id="nome" name="nome" 
                    value={ this.state.value } onChange={ this.handleChange } />
                <button type="submit">Add</button>
            </form>
        );
    }
}

class Lista extends React.Component {

    render() {
        const names = this.props.names;
        const items = names.map((name, key) => 
            <li key={key}>
                <span>{ name }</span>
                <button onClick={(k) => this.props.removeNameByKey(k)}>x</button>
            </li>
        )

        return(<ul className="lista">{items}</ul>);
    }
}

// class ItemList extends React.Component {
    
//     render() {
//         const name = this.props.name
//     }

// }

class Container extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            names: []
        };
    }

    removeNameByKey(key) {
        const names = this.state.names;
        names.splice(key, 1);
        this.setState({
            names: names,
        })
    }

    addNameToList(name) {
        const names = this.state.names;
        this.setState({
            names: [...names, name],
        });

    }

    render() {
        const names = this.state.names;

        return(
            <div className="container">
                <div className="column">
                    <Cadastro addNameToList={ (name) => this.addNameToList(name) } />
                </div>
                <div className="column">
                    <Lista names={ names } removeNameByKey={ (key) => this.removeNameByKey(key) } />
                </div>
            </div>
        );
    }

}

ReactDOM.render(
    <Container />,
    document.getElementById('root')
)
