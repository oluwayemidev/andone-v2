// src/utils/api.js
import axios from 'axios';
import { notification } from 'antd';
import { db, collection, addDoc } from '../pages/firebase'; 

export const submitQuotation = async (values) => {
  try {
    const response = await addDoc(collection(db, 'quotations'), {
      ...values,
      createdAt: new Date().toISOString()
    });
    notification.success({
      message: 'Success',
      description: 'Quotation request submitted successfully!',
    });
    return response.data;
  } catch (error) {
    notification.error({
      message: 'Error',
      description: 'Failed to submit quotation request. Please try again.',
    });
    throw error;
  }
};