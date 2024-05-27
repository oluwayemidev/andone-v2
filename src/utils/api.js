// src/utils/api.js
import axios from 'axios';
import { notification } from 'antd';

export const submitQuotation = async (values) => {
  try {
    const response = await axios.post('https://andonesolar.com/api/quotations', values);
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
