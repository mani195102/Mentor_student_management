import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Input, Button, notification, Row, Col } from 'antd';
import axios from 'axios';

const StudentForm = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('https://mentor-student-management-ptyd.onrender.com/api/student/create', values);
      notification.success({ message: 'Student created successfully' });
      resetForm();
    } catch (error) {
      notification.error({ message: 'Failed to create student' });
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
              <Button type="primary" htmlType="submit">Create Student</Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  
  );
};

export default StudentForm;
