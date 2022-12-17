import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Update() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");


    const navigate = useNavigate();
    const{ id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:8080/api/getOne/${id}`)
        .then((res) => {
        console.log("resp", res.data.data);
        const { name, brand, quantity } = res.data.data;
        setName(name);
        setBrand(brand);
        setQuantity(quantity);
        })
        .catch((err) => {
        console.log("err", err);
        });
        }, [id]);


    const Submit = (e) => {
        e.preventDefault();
        console.log(name, brand, quantity);
        const data = {
            name: name,
            brand: brand,
            quantity: quantity
        }
        axios.put(`http://localhost:8080/api/update/${id}`, data)
            .then(
                (resp) => {
                    console.log("resp", resp);
                    navigate("/");

                    toast.success("Record updated", { autoClose: 4000 });

                })
            .catch((error) => {
                console.error("err", error)
            });

    }
    const back = () => {
        navigate("/");
    }
    return (
        <div className="container text-center">
            <h3 className="mb-4">Update Page- {id}</h3>
            <form onSubmit={(e) => Submit(e)}>

                <div className="row mb-3">
                    <label className="col-sm-1" htmlFor="name">Name: </label>

                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={name}

                            onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>


                <div className="row mb-3">
                    <label className="col-sm-1" htmlFor="brand">Brand: </label>

                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-1" htmlFor="quantity">Quantity: </label>

                    <div className="col-sm-6">
                        <input
                            className="form-control"
                            type="text"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary m-3">Submit Data
                
                </button>
                <button type="button" className="btn btn-primary m-3" onClick={back}>Back</button>


            </form>
        </div>

    )
}

