import AdminLayout from "../../components/Admin/AdminLayout";
import { useState, useEffect } from "react";
import style from "../../styles/admin.module.css";

export default function Admin() {
  const [servicesData, setServicesData] = useState([]);
  const [ServiceName, setServiceName] = useState("");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/getServicesData");
      const data = await res.json();
      setServicesData(data); // Lưu dữ liệu vào state
    }
    fetchData(); // Gọi hàm fetchData
  }, []);
  const insert = (e) => {
    e.preventDefault();
    const form = document.getElementById("insert-Serviceform");
    form.classList.toggle("hidden");
    form.classList.toggle("flex");
  };
  const update = (e) =>{
    e.preventDefault();
    const form=document.getElementById("update-Serviceform");
    setServiceName(e.target.getAttribute("data-name"));
    form.classList.toggle("hidden");    
    form.classList.toggle("flex");
  }
  function insertService(e) {
    e.preventDefault();
    const postData = async () => {
      const data = {
        name: ServiceName,
      };
      const response = await fetch("/api/insertService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.status === "success") {
        alert("Insert service successfully");
      } else {
        alert("Insert service failed");
      }
    };
    postData();
  }
  function updateServiceInfo(e) {
    e.preventDefault();

    const postData = async () => {
      const data = {
        name: ServiceName,
      };

      const response = await fetch("/api/updateServiceInfo", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData();
    alert("Cập nhật dịch vụ thành công!");
  }
  const deleteService = (e) =>{
    e.preventDefault();
    if (!confirm("Bạn có muốn xóa dịch vụ này")) return;
    const id = e.target.getAttribute("data-key");
    const postData = async () => {
      const res = fetch("/api/deleteService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    };
    postData();
    };
  return (
    <AdminLayout>
      <h1 className={`${style.header}`}>Quản lý dịch vụ</h1>
      <table className="bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicesData.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>
                <div className="flex gap-1">
                  <button 
                    onClick={update}
                    data-name={service.name}
                    className="rounded bg-blue-500 p-2 hover:bg-blue-700"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={deleteService}
                    data-key={service.id}
                    className="rounded bg-red-500 p-2 hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={insert}
        className="rounded bg-green-500 p-2 hover:bg-green-700"
        >
        Thêm
        </button>
      <form
        id="insert-Serviceform"
        className="hidden flex flex-col gap-2"
        onSubmit={insertService}
      >
        <label htmlFor="ServiceName">Thêm dịch vụ </label>
        <input
          type="text"
          id="ServiceName"
          value={ServiceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 p-2 hover:bg-blue-700"
          type="submit"
        > 
          Thêm
        </button>
      </form>
      <form 
        id="update-Serviceform"
        className="hidden flex flex-col gap-2"
        onSubmit={updateServiceInfo}
      >
        <label htmlFor="ServiceName">Chỉnh sửa dịch vụ </label>
        <input
          type="text"
          id="ServiceName"
          value={ServiceName}
          onChange={(e) => setServiceName(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 p-2 hover:bg-blue-700"
          type="submit"
        >
          Cập nhật
        </button>
      </form>
      </AdminLayout>
  );
}