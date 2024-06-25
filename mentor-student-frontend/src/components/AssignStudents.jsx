import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select, Button, notification, Row, Col } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AssignStudents = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorRes = await axios.get('https://mentor-student-management-ptyd.onrender.com/api/mentor/all');
        const studentRes = await axios.get('https://mentor-student-management-ptyd.onrender.com/api/student/all');
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
      await axios.post('https://mentor-student-management-ptyd.onrender.com/api/student/assign', values);
      notification.success({ message: 'Students assigned to mentor successfully' });
      resetForm();
    } catch (error) {
      notification.error({ message: 'Failed to assign students' });
    }
  };

  const initialValues = {
    mentorId: '',
    studentIds: [],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '90%', maxWidth: '80%' }}>
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => (
            <Form>
              <Row gutter={[16, 16]}>
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
                  <Field name="studentIds">
                    {({ field }) => (
                      <Select
                        {...field}
                        mode="multiple"
                        placeholder="Select Students"
                        onChange={(value) => setFieldValue('studentIds', value)}
                        value={values.studentIds}
                        style={{ width: '100%' }}
                      >
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
                  <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    Assign Students
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

export default AssignStudents;
