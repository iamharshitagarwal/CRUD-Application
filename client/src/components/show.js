// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./show.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ConfirmDialog from "./confirmDialog";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateDialog from "./createDialog";

// import './App.css';

export default function Show() {
  const [persons, setPersons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [updateList, setUpdateList] = useState(false);


  const fetchData = () => {
    axios.get(`http://localhost:8080/api/getAll`).then((res) => {
      console.log("res", res.data.data);
      setPersons(res.data.data);
    });
  };



  const onSearch = (e) => {
    e.preventDefault();
    console.log("you search for", e.target.value);
    setSearchInput(e.target.value);
    fetchDataa(e.target.value);
  }

  useEffect(() => {
    fetchData(null);
  }, [updateList]);

  const fetchDataa = (searchInput, e) => {
    if (!searchInput) {
      
      axios
      .get(`http://localhost:8080/api/getAll`)
      .then((res) => {
        e.preventDefault();
        console.log("data is", res.data);
          setPersons(res.data);
        })
        .catch((err) => {
          console.log("err is", err);
        });
    } else {
      axios
        .get(`http://localhost:8080/api/search/${searchInput}`)
        .then((res) => {

          console.log("data is", res.data);
          setPersons(res.data);
        })
        .catch((err) => {
          console.log("err is", err);
        });
    }
  };




  // DELETE -------------------------

  const onDelete = (id) => {
    // e.preventDefault();
    console.log("delete fun", id);
    axios
      .delete(`http://localhost:8080/api/delete/${id}`)
      .then((res) => {
        console.log("data is", res.data.data);
        fetchData(null);

        toast.success("Record deleted", { autoClose: 4000 });

      })
      .catch((err) => {
        console.log("error is", err);
      })

  }


  return (
    <div className="container">
    <form>
        <div className="row m-3">
          <div className="col-sm-3">
            <input
              className="form-control"
              type="text"
              placeholder="filter the data"
              value={searchInput}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="col-sm-1">
            
          <CreateDialog listUpdate={() => setUpdateList()} />

          </div>
          <div className="col-sm-6"></div>
          <div className="col-sm-2">
      <button type="button" className="btn btn-primary addBtn">
        <Link to="/create">Add Record</Link>
      </button>
      </div>
      </div>
      </form>


      <table className="table table-striped table-bordered bg-primary bg-opacity-10">
        <thead>
          <tr>
            <th>
              S.No
            </th>
            <th>
              Name
            </th>
            <th>
              Brand
            </th>
            <th>
              Quantity
            </th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {persons.map((i, index) => (

            <tr key={i._id}>
              <td>
                {index + 1}
              </td>
              <td>
                <b>{i.name}</b>
              </td>
              <td>
                <b>{i.brand}</b>
              </td>
              <td>
                <b>{i.quantity}</b>
              </td>
              <td className="text-center">
                <button type="button" className="btn btn-success">
                  <Link to={`/update/${i._id}`}>EDIT</Link>
                </button>

                <ToastContainer />


              </td>
              <td className="text-center">
                {/* <button type="button" className="btn btn-danger" onClick={(e) => onDelete(e, i._id)}>DELETE</button> */}

                <ConfirmDialog
                  btnText="Delete"
                  btnHeader="Delete Action"
                  btnBody="Do you want to delete the record?"
                  deleteIt={() => {
                    onDelete(i._id);
                  }}
                />
                <ToastContainer />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

