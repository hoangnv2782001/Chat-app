import { useContext } from 'react';
import {SettingsContext} from '../contexts/SettingsContext';

// Tạo useSettings sử dụng useContext để truy vấn value từ context api

const useSettings = () => useContext(SettingsContext);

export default useSettings;
