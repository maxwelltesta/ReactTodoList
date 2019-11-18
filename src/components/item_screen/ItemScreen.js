import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ItemScreen extends Component {
    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value
        }));
    }

    render() {
        const auth = this.props.auth;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div className="input-field">
                    <label htmlFor="description">Description</label>
                    <input className="active" type="text" name="description" id="description" onChange={this.handleChange} value={1} />
                </div>
                <div className="input-field">
                    <label htmlFor="assigned_to">Assigned To</label>
                    <input className="active" type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} value={1} />
                </div>
                <div className="input-field">
                    <label htmlFor="due_date">Due Date</label>
                    <input className="active" type="text" class="datepicker" name="due_date" id="due_date" onChange={this.handleChange} value={1} />
                </div>
                <div className="input-field">
                    <label htmlFor="completed">Completed</label>
                    <label>
                        <input type="checkbox" class="filled-in" className="active" name="completed" id="completed" onChange={this.handleChange} checked={1} />
                    </label>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { todoLists } = state.firestore.data;

  return {
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ItemScreen);