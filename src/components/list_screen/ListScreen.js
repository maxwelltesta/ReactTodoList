import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;
        const id = this.props.todoList.id;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        getFirestore().collection('todoLists').doc(id).update({
            [target.id]: target.value
        });
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="owner">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
                <div className="center-align">
                    <Link to={"/todoList/" + todoList.id + "/item/"} className="btn-floating btn-large grey"><i class="material-icons">add</i></Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);