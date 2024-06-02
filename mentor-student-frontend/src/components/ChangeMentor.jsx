import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, Button, notification, Row, Col } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ChangeMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorRes = await axios.get('http://localhost:5000/api/mentor/all');
        const studentRes = await axios.get('http://localhost:5000/api/student/all');
        setMentors(mentorRes.data);
        setStudents(studentRes.data);
      } catch (error) {
        notification.error({ message: 'Failed to fetch data' });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:5000/api/student/change-mentor', values);
      notification.success({ message: 'Mentor changed successfully' });
      resetForm();
    } catch (error) {
      notification.error({ message: 'Failed to change mentor' });
    }
  };

  const initialValues = {
    studentId: '',
    mentorId: '',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '90%', maxWidth: '40%' }}>
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24}>
                  <Field name="studentId">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Student"
                        onChange={(value) => setFieldValue('studentId', value)}
                        value={values.studentId}
                        style={{ width: '100%' }}
                      >
                        <Option value="" disabled>
                          Select Student
                        </Option>
                        {students.map((student) => (
                          <Option key={student._id} value={student._id}>
                            {student.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Field name="mentorId">
                    {({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select Mentor"
                        onChange={(value) => setFieldValue('mentorId', value)}
                        value={values.mentorId}
                        style={{ width: '100%' }}
                      >
                        <Option value="" disabled>
                          Select Mentor
                        </Option>
                        {mentors.map((mentor) => (
                          <Option key={mentor._id} value={mentor._id}>
                            {mentor.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Field>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Change Mentor
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangeMentor;
