import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Spin } from 'antd';
import { getUsers } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const AdminChatList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleChat = (userId) => {
    navigate(`/admin/chat/${userId}`);
  };

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta title={user.name} />
              <Button onClick={() => handleChat(user._id)}>Chat</Button>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AdminChatList;
