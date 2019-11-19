import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Checkbox } from 'react-materialize';
import DatePicker from 'react-materialize/lib/DatePicker';

class ItemScreen extends Component {
    state = {
        description: this.props.todoItem !== undefined ? this.props.todoItem.description : "", 
        assigned_to: this.props.todoItem !== undefined ? this.props.todoItem.assigned_to : "",
        due_date: this.props.todoItem !== undefined ? this.props.todoItem.due_date : "",
        completed: this.props.todoItem !== undefined ? this.props.todoItem.completed : false
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value
        }));
    }
    handleCancel = () => {
        const history = this.props.history;
        const listID = this.props.listID
        history.push("/todoList/" + listID);
    }

    handleSumbit = () => {
        const todoList = this.props.todoList;
        const keyA = this.props.keyA;
        const length = todoList.items.length
        const history = this.props.history;
        const listID = this.props.listID

            let newItem = {
                description: this.state.description ? this.state.description : "Default",
                assigned_to: this.state.assigned_to ? this.state.assigned_to : "Default",
                due_date: this.state.due_date ? this.state.due_date : "2000-01-01",
                completed: this.state.completed,
                key: keyA
            }
            const newItems = this.props.todoList.items;
            if (length > keyA) {
                newItems[keyA] = newItem;
            }
            else {
                newItems.push(newItem);
            }
            getFirestore().collection('todoLists').doc(listID).update({
                items: newItems
            });
            history.push("/todoList/" + listID);
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        const keyA = this.props.keyA;
        const length = todoList.items.length
        console.log(keyA);
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <input className="active" type="text" name="description" id="description" onChange={this.handleChange} defaultValue={length > keyA ? todoList.items[keyA].description : this.state.description} />
                </div>
                <div className="input-field">
                    <label htmlFor="assigned_to">Assigned To</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} defaultValue={length > keyA ? todoList.items[keyA].assigned_to : this.state.assigned_to} />
                </div>
                <div className="input-field">
                    <label htmlFor="due_date">Due Date</label>
                    <input className="active" type="text" class="datepicker" name="due_date" id="due_date" onChange={this.handleChange} defaultValue={length > keyA ? todoList.items[keyA].due_date : this.state.due_date} />
                </div>
                <div className="input-field">
                    <div>
                        <label htmlFor="completed">Completed</label>
                        <Checkbox onChange={this.handleChange} filledIn={length > keyA ? todoList.items[keyA].completed : this.state.completed}/>
                    </div>
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0" onClick={this.handleSumbit}>Submit</button>
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0" onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const listID = ownProps.match.params.listID;
    const keyA = ownProps.match.params.key;
    console.log(keyA);
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[listID] : null;
    const todoItem = todoList.items[keyA];

    return {
      keyA,
      todoItem,
      listID,
      todoList,
      auth: state.firebase.auth
    };
  };
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);