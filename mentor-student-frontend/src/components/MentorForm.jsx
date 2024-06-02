import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, notification, Row, Col } from 'antd';
import axios from 'axios';

const MentorForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:5000/api/mentor/create', values);
      notification.success({ message: 'Mentor created successfully' });
      resetForm();
    } catch (error) {
      notification.error({ message: 'Failed to create mentor' });
    }
  };

  return (
   
    <Formik initialValues={{ name: '', email: '' }} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Field name="name" as={Input} placeholder="Name" required />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Field name="email" as={Input} placeholder="Email" required />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Button type="primary" htmlType="submit">Create Mentor</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
   
  );
};

export default MentorForm;
