import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({
            // [e.target.name] same as hard coding name since name="name" below
            [e.target.name]: e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault(); // prevent refresh

        const newItem = {
            name: this.state.name
        }

        // Add item via addItem action
        this.props.addItem(newItem); // action added as prop using connect

        // Close modal on submit
        this.toggle();
    };

    render() {
        return(
            <div>
                <Button
                    color='dark'
                    style={{marginBottom: "2rem"}}
                    onClick={this.toggle}
                >
                Add Item
                </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop:'2rem'}}
                                    block
                                >Add Item</Button>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item
});

// The second argument passed into 'connect()', 'mapDispatchToProps' is used for dispatching actions to the store
// component does not directly interact with the store, 'connect()' does it for you
export default connect(mapStateToProps, { addItem })(ItemModal);