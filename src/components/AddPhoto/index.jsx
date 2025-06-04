// components/AddPhoto.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AddPhoto = () => {
  const currentUser = useSelector((state) => state.user);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('Vui lòng chọn một ảnh!');
    try {
        const formdata={user_id:currentUser._id,file_name:file}
        console.log('formdata',formdata)
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/photo/create`, {user_id:currentUser._id,file_name:file});
      alert('Tải ảnh thành công!');
      setFile(null);
    } catch (err) {
      console.error('Lỗi khi tải ảnh:', err);
      alert('Lỗi khi tải ảnh');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thêm ảnh mới</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0].name)} />
      <br /><br />
      <button onClick={handleUpload}>Tải lên</button>
    </div>
  );
};

export default AddPhoto;
