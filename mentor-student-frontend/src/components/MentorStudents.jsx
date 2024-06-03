import React, { useState, useEffect } from 'react';
import { Select, List, Row, Col, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const MentorStudents = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const mentorRes = await axios.get('https://mentor-student-management-ptyd.onrender.com/api/mentor/all');
        setMentors(mentorRes.data);
      } catch (error) {
        notification.error({ message: 'Failed to fetch mentors' });
      }
    };
    fetchMentors();
  }, []);

  const fetchStudents = async (mentorId) => {
    try {
      const studentRes = await axios.get(`https://mentor-student-management-ptyd.onrender.com/api/mentor/${mentorId}/students`);
      setStudents(studentRes.data);
    } catch (error) {
      notification.error({ message: 'Failed to fetch students' });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
    <div style={{ width: '90%', maxWidth: '70%' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <Select
            placeholder="Select Mentor"
            onChange={fetchStudents}
            style={{ width: '100%' }}
          >
            {mentors.map(mentor => (
              <Option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row style={{marginTop: '2em'}}gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <List
            bordered
            dataSource={students}
            renderItem={student => (
              <List.Item key={student._id}>
                <div>
                  <strong>Name:</strong> {student.name}<br />
                  <strong>Email:</strong> {student.email}<br />
                  <strong>ID:</strong> {student._id}
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default MentorStudents;
