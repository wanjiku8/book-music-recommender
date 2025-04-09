import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background: #f44336;
  
  &:hover {
    background: #d32f2f;
  }
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  artist: Yup.string().required('Artist is required'),
  bpm: Yup.number().required('BPM is required').min(60).max(300),
  genre: Yup.string().required('Genre is required'),
  description: Yup.string().required('Description is required'),
});

function SongForm({ onSubmit, onCancel }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('artist', values.artist);
    formData.append('bpm', values.bpm);
    formData.append('genre', values.genre);
    formData.append('description', values.description);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      await axios.post('http://localhost:5000/songs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSubmit();
    } catch (error) {
      console.error('Error adding song:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New Song</FormTitle>
      <Formik
        initialValues={{
          title: '',
          artist: '',
          bpm: 120,
          genre: '',
          description: '',
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <FormGroup>
              <label>Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Artist</label>
              <Field type="text" name="artist" />
              <ErrorMessage name="artist" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>BPM</label>
              <Field type="number" name="bpm" min="60" max="300" />
              <ErrorMessage name="bpm" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Genre</label>
              <Field as="select" name="genre">
                <option value="">Select a genre</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Electronic">Electronic</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
              </Field>
              <ErrorMessage name="genre" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <Field as="textarea" name="description" rows="4" />
              <ErrorMessage name="description" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Album Art</label>
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </FormGroup>

            

            <ButtonGroup>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Song'}
              </button>
              <CancelButton type="button" onClick={onCancel}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
}

export default SongForm;