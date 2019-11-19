import React from 'react';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        return (
            <Link to={"/todoList/" + this.props.todoList.id + "/item/" + item.id}>
                <div className="card z-depth-0 todo-list-link pink-lighten-3 row">
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title">{item.description}</span>
                        <span>Assigned To: {item.assigned_to}</span>
                    </div>
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title">{item.due_date}</span>
                    </div>
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title">{item.completed}</span>
                    </div>
                    <div className="card-content grey-text text-darken-3 col s3">
                        <span className="card-title">Buttons</span>
                    </div>
                </div>
            </Link>
        );
    }
}
export default ItemCard;