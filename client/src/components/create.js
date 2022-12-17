import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");

    const navigate = useNavigate();
    var errors = [];

    const validateForm = () => {
        if (name === null || name === "") {
            alert("Name can't be blank");
            document.getElementById("nameErr").innerHTML = "Name can't be blank";
            return false;
        } else {
            document.getElementById("nameErr").innerHTML = "";
        }
        if (brand === null || brand === "") {
            alert("Brand can't be blank");
            document.getElementById("brandErr").innerHTML = "Brand can't be blank";
            return false;
        } else {
            document.getElementById("brandErr").innerHTML = "";
        }

        if (quantity === null || quantity === "") {
            errors.push("quantity can't be blank");
        } else if (quantity < 2) {
            alert("Enter a number greater than 2");
            return false;
        } else {
            return true;
        }

        //   if (p.search(/[a-z]/i) < 0) {
        //     errors.push("Your password must contain at least one letter.");
        //   }
        //   if (p.search(/[0-9]/) < 0) {
        //     errors.push("Your password must contain at least one digit.");
        //   }
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        } else if (name === null || name === "" || brand === null || brand === "" || quantity === null || quantity === "" || quantity < 2) {
            return false;
        } else {
            return true;
        }
    }

    const Submit = (e) => {
        e.preventDefault();
        console.log(name, brand, quantity);

        const res = validateForm();

        if (res) {
            const data = {
                name: name,
                brand: brand,
                quantity: quantity
            }
            axios.post(`http://localhost:8080/api/post`, data)
                .then(
                    (resp) => {
                        console.log("resp", resp);
                        navigate("/");

                    })
                .catch((error) => {
                    console.error("err", error)
                });
        }
    }

    const backHome = () => {
        navigate("/");
    }

    return (
        <div className="container text-center">
            <h3 className="mb-4">Create Page</h3>
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
                    <div className="col-sm-2">
                        <span id="nameErr" class="red"></span>
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
                    <div className="col-sm-2">
                        <span id="brandErr" class="red"></span>
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
                    <div className="col-sm-2">
                        <span id="quantityErr" class="red"></span>
                    </div>

                </div>
                <button type="submit" className="btn btn-primary m-3">Submit Data</button>
                <button type="button" className="btn btn-primary m-3" onClick={backHome}>Back</button>

            </form>
        </div>

    )
}