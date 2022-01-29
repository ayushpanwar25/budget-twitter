import { React, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { create } from "../actions/posts";

function CreatePost(props) {

  const [text, setText] = useState('');
  const [image, setImage] = useState(undefined);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('author', props.user.username);
    formData.append('authorID', props.user.id);
    formData.append('text', text);
    if (image) formData.append('file', image);
    props.create(formData);
    setText('');
    setImage(undefined);
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
      <Modal.Title id="example-modal-sizes-title-sm">
        Create Post
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea" rows={7}
            type="text"
            placeholder="What's on your mind?"
            defaultValue={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off" />
          <Form.Control
            name="file"
            type="file"
            accept="image/*"
            defaultValue={image}
            onChange={(e) => setImage(e.target.files[0])} />
          <Button variant="secondary" type="submit">&quot;Tweet&quot;</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { create })(CreatePost);