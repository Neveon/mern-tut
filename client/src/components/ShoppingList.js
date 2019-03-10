import React, { Component } from 'react';
import { 
    Container,
    ListGroup,
    ListGroupItem,
    Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Get state from redux into react component
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions'; // Stored as a prop
import PropTypes from 'prop-types';


class ShoppingList extends Component {

    // Lifecycle method - when component mounts
    componentDidMount() {
        this.props.getItems(); // Any action taken is sent to ALL reducers
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        // item = entire state, items = actual array
        // Destructuring
        const { items } = this.props.item;

        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                >
                                    &times;
                                </Button>

                                {name}
                                </ListGroupItem>
                            </CSSTransition>
                            )
                        )}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}
// typechecking - optional to use, helps catch bugs
ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

// state taken from componentDidMount(), then mapping state to item as prop
const mapStateToProps = (state) => ({
    item: state.item // 'item' state found in reducers/index.js -> Represents ENTIRE object that is returned
});

// connect -> react-redux
export default connect(mapStateToProps, 
    { getItems, deleteItem })(ShoppingList);