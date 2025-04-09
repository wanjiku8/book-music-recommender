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
  margin-top: 20px;
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
  author: Yup.string().required('Author is required'),
  genre: Yup.string().required('Genre is required'),
  description: Yup.string().required('Description is required'),
});

function BookForm({ onSubmit, onCancel }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('genre', values.genre);
    formData.append('description', values.description);
    if (values.image) {
      formData.append('image', values.image);
    }

    try {
      await axios.post('http://localhost:5000/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSubmit();
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New Book</FormTitle>
      <Formik
        initialValues={{
          title: '',
          author: '',
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
              <label>Author</label>
              <Field type="text" name="author" />
              <ErrorMessage name="author" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Genre</label>
              <Field as="select" name="genre">
                <option value="">Select a genre</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
              </Field>
              <ErrorMessage name="genre" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Description</label>
              <Field as="textarea" name="description" rows="4" />
              <ErrorMessage name="description" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <label>Cover Image</label>
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
                {isSubmitting ? 'Saving...' : 'Save Book'}
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

export default BookForm;