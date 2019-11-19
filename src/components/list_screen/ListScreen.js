import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal, Button } from 'react-materialize';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleAddItem = () => {
        const todoList = this.props.todoList.items;
        const id = this.props.todoList.id;
        const history = this.props.history;
        history.push("/todoList/" + id + "/item/" + todoList.length);
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

    handleDelete = (e) => {
        const id = this.props.todoList.id;
        const history = this.props.history;
        history.push("/");
        getFirestore().collection('todoLists').doc(id).delete();
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container white">
                <div class="row">
                    <h5 className="grey-text text-darken-3 col s11">Todo List</h5>
                    <Modal header="Delete List?" trigger={<p className="trash_can" style={{cursor:"pointer"}}>&#128465;</p>} actions={[<Button onClick={this.handleDelete}>Yes</Button>, <Button modal="close">No</Button>]}>
                        <p>Are you sure you want to delete the list? The list will not be retreivable.</p>
                    </Modal>
                </div>
                <div className="input-field">
                    <label htmlFor="name">Name</label>
                    <input class="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="owner">Owner</label>
                    <input class="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
                <div className="center-align">
                    <a className="btn-floating btn-large grey" style={{marginBottom:30}} onClick={this.handleAddItem}><i class="material-icons">add</i></a>
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