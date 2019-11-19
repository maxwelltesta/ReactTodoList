import React from 'react';
import { Link } from 'react-router-dom';
import 'react-tiny-fab/dist/styles.css';
import { getFirestore } from 'redux-firestore';


class ItemCard extends React.Component {
    handleMoveUp = (e) => {
        e.preventDefault();
        const newItems = this.props.todoList.items
        const idA = this.props.todoList.id;
        const itemID = this.props.item.id;

        let temp = newItems[itemID];
        newItems[itemID] = newItems[itemID - 1];
        newItems[itemID - 1] = temp;
        

        for (var i = 0; i < newItems.length; i++) {
            newItems[i].id = i;
            newItems[i].key = i;
        }

        getFirestore().collection('todoLists').doc(idA).update({
            items: newItems
        });
    }

    handleMoveDown = (e) => {
        e.preventDefault();
        const newItems = this.props.todoList.items
        const idA = this.props.todoList.id;
        const itemID = this.props.item.id;

        let temp = newItems[itemID];
        newItems[itemID] = newItems[itemID + 1];
        newItems[itemID + 1] = temp;

        for (var i = 0; i < newItems.length; i++) {
            newItems[i].id = i;
            newItems[i].key = i;
        }

        getFirestore().collection('todoLists').doc(idA).update({
            items: newItems
        });
    }

    handleDeleteItem = (e) => {
        e.preventDefault();
        const newItems = this.props.todoList.items
        const idA = this.props.todoList.id;
        const itemID = this.props.item.id;

        newItems.splice(itemID, 1);

        for (var i = 0; i < newItems.length; i++) {
            newItems[i].id = i;
            newItems[i].key = i;
        }

        getFirestore().collection('todoLists').doc(idA).update({
            items: newItems
        });
    }

    render() {
        const { item } = this.props;
        return (
            <Link to={"/todoList/" + this.props.todoList.id + "/item/" + item.id}>
                <div className="card z-depth-0 todo-list-link grey lighten-3 row">
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title"><strong>{item.description}</strong></span>
                        <span>Assigned To: <strong>{item.assigned_to}</strong></span>
                    </div>
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title">{item.due_date}</span>
                    </div>
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title">{item.completed ? <p style={{color:'green'}}>Completed</p> : <p style={{color:'red'}}>Pending</p>}</span>
                    </div>
                    <div className="card-content grey-text text-darken-3 col s3">               
                        <a class="btn-floating btn-large waves-effect waves-light green" disabled={item.id == 0 ? "disabled" : ""} onClick={this.handleMoveUp}><i class="material-icons">arrow_upwards</i></a>
                        <a class="btn-floating btn-large waves-effect waves-light blue" disabled={item.id == this.props.todoList.items.length - 1 ? "disabled" : ""} onClick={this.handleMoveDown}><i class="material-icons">arrow_downwards</i></a>
                        <a class="btn-floating btn-large waves-effect waves-light red" onClick={this.handleDeleteItem}><i class="material-icons">clear</i></a>
                    </div>
                </div>
            </Link>
        );
    }
}
export default ItemCard;