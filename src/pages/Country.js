import React, { useEffect, useState, useRef } from "react";
import { Form } from "react-bootstrap";
import CustomTable from "../components/CustomTable";
import Loader from "../components/Loader";

export default function Completed() {
    const staticURL = "https://api.postalpincode.in/pincode";

    const [countryData, setCountryData] = useState([]);
    const [zipcode, setZipCode] = useState(110001);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const zipRef = useRef();

    const handleSearch = () => {
        if (zipRef.current.value.match(/^[0-9]{1,6}$/)) {
            setError(false);
            setLoading(true);
            setZipCode(zipRef.current.value);
        } else {
            setError(true);
        }
    }

    const getData = async () => {
        setLoading(true);
        const res = await fetch(`${staticURL}/${zipcode}`);
        const data = await res.json();
        setError(data[0].Status === "Success" ? false : true);
        if (res.status !== 200) {
            setError(true);
        } else {
            setCountryData(data[0].PostOffice);
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [zipcode]);

    return (
        <div className="outlet">
            <div className="d-flex align-items-center m-3">
                <div className="d-flex align-items-center">
                    <label className="m-1">Zipcode</label>
                    <Form.Control type="number" ref={zipRef}></Form.Control>
                    <button
                        className="btn btn-primary m-1"
                        onClick={() => handleSearch()}>
                        Search</button>
                </div>
            </div>
            <Loader loading={loading} />
            {!error && !loading && countryData ?
                <>
                    <CustomTable classnames={["table", "shadow", "align-items-center", "w-60"]}
                        data={countryData}
                        apiCall={true}
                        headers={["Post Office", "Branch Type", "District", "State"]}
                        columns={["Name", "BranchType", "District", "State"]}>
                    </CustomTable>
                </> :
                error ?
                    <h3 className="text-center m-5">Couldn't find data. Enter valid zipcode.</h3> : null}
        </div>
    )
}