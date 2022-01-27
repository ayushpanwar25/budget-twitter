import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editpost } from "../actions/posts";

class EditPost extends React.Component {

  static propTypes = {
    editpost: PropTypes.func,
    post: PropTypes.object
  };

  state = {
    text: this.props.post.text
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.props.editpost(this.props.post.id, this.state.text);
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSubmit} className="input-form">
            <textarea
              placeholder="Edit post"
              id="post-text"
              rows='5'
              value={this.state.text}
              onChange={(e) => this.setState({ text: e.target.value })}
            />
            {/*<input
          type="file"
          name="image"
          value="" />*/}
            <button
              type="submit"
              onClick={this.props.onHide}>Edit</button>
          </form>
        </Modal.Body>
      </Modal>

    )
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { editpost })(EditPost);