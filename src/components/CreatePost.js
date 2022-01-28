import { React, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { create } from "../actions/posts";

function CreatePost(props) {

  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const { id, username } = props.user;
    const newPost = { username, id, text };
    if (image) newPost.image = image;
    props.create(newPost);
    setText('');
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
            onChange={(e) => setImage(e.target.value)} />
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