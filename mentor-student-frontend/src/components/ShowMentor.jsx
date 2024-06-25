import React, { useState, useEffect } from 'react';
import { Select, Row, Col, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ShowMentor = () => {
  const [students, setStudents] = useState([]);
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentRes = await axios.get('https://mentor-student-management-ptyd.onrender.com/api/student/all');
        setStudents(studentRes.data);
      } catch (error) {
        notification.error({ message: 'Failed to fetch students' });
      }
    };
    fetchStudents();
  }, []);

  const fetchMentor = async (studentId) => {
    try {
      const mentorRes = await axios.get(`https://mentor-student-management-ptyd.onrender.com/api/student/${studentId}/mentor`);
      setMentor(mentorRes.data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch mentor' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div style={{ width: '90%', maxWidth: '80%' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24}>
            <Select
              placeholder="Select Student"
              onChange={fetchMentor}
              style={{ width: '100%' }}
            >
              {students.map((student) => (
                <Option key={student._id} value={student._id}>
                  {student.name}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        {mentor && (
          <Row style={{ marginTop: '2em' }} gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <div>
                <strong>Mentor Name:</strong> {mentor.name}<br />
                <strong>Mentor Email:</strong> {mentor.email}
              </div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default ShowMentor;
