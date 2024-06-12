// src/components/VideoGalleryWidgetEditor.js
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, List, message, Upload } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  db,
  storage,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "../pages/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import VideoGalleryWidget from "./VideoGalleryWidget";

const VideoGalleryWidgetEditor = () => {
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const fetchedVideos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(fetchedVideos);
    };

    fetchVideos();
  }, []);

  const handleAdd = async (values) => {
    setLoading(true);
    try {
      const videoFile = fileList[0];
      const storageRef = ref(storage, `videos/${videoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, videoFile);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error: ", error);
          message.error("Error uploading video");
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const docRef = await addDoc(collection(db, "videos"), {
            ...values,
            url: downloadURL,
          });
          setVideos([
            ...videos,
            { id: docRef.id, ...values, url: downloadURL },
          ]);
          form.resetFields();
          setFileList([]);
          message.success("Video added successfully");
          setVisible(false);
        }
      );
    } catch (error) {
      console.error("Error adding video: ", error);
      message.error("Error adding video");
    }
    setLoading(false);
  };

  const handleEdit = async (values) => {
    setLoading(true);
    try {
      let downloadURL = editingVideo.url;
      if (fileList.length > 0) {
        const videoFile = fileList[0];
        const storageRef = ref(storage, `videos/${videoFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.error("Upload error: ", error);
              reject(error);
            },
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const docRef = doc(db, "videos", editingVideo.id);
      await updateDoc(docRef, { ...values, url: downloadURL });
      const updatedVideos = videos.map((video) =>
        video.id === editingVideo.id
          ? { id: editingVideo.id, ...values, url: downloadURL }
          : video
      );
      setVideos(updatedVideos);
      setEditingVideo(null);
      form.resetFields();
      setFileList([]);
      message.success("Video updated successfully");
      setVisible(false);
    } catch (error) {
      console.error("Error updating video: ", error);
      message.error("Error updating video");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const videoDoc = videos.find((video) => video.id === id);
      if (videoDoc) {
        const storageRef = ref(
          storage,
          `videos/${videoDoc.url.split("/").pop().split("?")[0]}`
        );
        await deleteDoc(doc(db, "videos", id));
        await storageRef.delete();
        const updatedVideos = videos.filter((video) => video.id !== id);
        setVideos(updatedVideos);
        message.success("Video deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting video: ", error);
      message.error("Error deleting video");
    }
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);
    form.setFieldsValue(video);
    setVisible(true);
  };

  const handleCancel = () => {
    setEditingVideo(null);
    form.resetFields();
    setFileList([]);
    setVisible(false);
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ marginBottom: "16px" }}
      >
        Add Video
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={videos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <EditOutlined onClick={() => handleEditClick(item)} />,
              <DeleteOutlined onClick={() => handleDelete(item.id)} />,
            ]}
          >
            <List.Item.Meta title={item.title} description={item.url} />
          </List.Item>
        )}
      />
      <Modal
        title={editingVideo ? "Edit Video" : "Add Video"}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingVideo ? handleEdit : handleAdd}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>
          <Form.Item
            name="url"
            label="Video File"
            rules={[{ required: true, message: "Please upload a video!" }]}
          >
            <Upload
              accept="video/*"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleUploadChange}
            >
              <Button icon={<UploadOutlined />}>Select Video</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingVideo ? "Update Video" : "Add Video"}
            </Button>
            {editingVideo && (
              <Button style={{ marginLeft: "10px" }} onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      <VideoGalleryWidget />
    </>
  );
};

export default VideoGalleryWidgetEditor;
