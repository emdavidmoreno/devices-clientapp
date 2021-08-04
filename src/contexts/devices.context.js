import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

const DeviceContext = createContext();

export const DeviceProvider = ({children}) => {
  const [devices, setDevices] = useState([]);

  useEffect(()=>{
    fetchDevices();
  }, [])

  const fetchDevices = async () => {
    try {
      const {data } = await axios.get(BASE_URL);
      setDevices(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  const addDevice = async (device) => {
    try {
      const newDevice = await axios.post(BASE_URL, {
        ...device
      });
      fetchDevices();
      return newDevice;
      
    } catch (error) {
      console.log(error)
    }

  }

  const updateDevice = async (device) => {
    try {
      const updatedDevice = await axios.put(BASE_URL + device.id, {
        ...device
      });
      fetchDevices();
      
    } catch (error) {
      console.log(error)
    }
  }

  const deleteDevice = async (device) => {
    try {
      const deletedDevice = await axios.delete(BASE_URL + device.id, {
        ...device
      });
      fetchDevices();
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <DeviceContext.Provider value={{
      devices,
      setDevices,
      addDevice,
      updateDevice,
      deleteDevice
    }}
    >
      {children}
    </DeviceContext.Provider>
  )
}

export const useDevices = () => useContext(DeviceContext);