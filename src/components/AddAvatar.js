import { React, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { addAvatar } from "../actions/posts";

function AddAvatar(props) {

  const [image, setImage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', props.user.id);
    formData.append('file', image);
    props.addAvatar(formData);
    setImage('');
    props.onHide();
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title>
        Add Avatar
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            name="file"
            type="file"
            accept="image/*"
            defaultValue={image}
            onChange={(e) => setImage(e.target.files[0])} />
          <Button variant="secondary" type="submit">Upload</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { addAvatar })(AddAvatar);