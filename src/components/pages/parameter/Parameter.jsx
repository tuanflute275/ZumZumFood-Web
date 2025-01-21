import React, { useEffect, useState } from "react";
import * as parameterService from "../../../services/ParameterService";

const Parameter = () => {
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchApiData = async () => {
    const [res, err] = await parameterService.findAll();
    if (res) {
      console.log(res.data);
      setApiData(res.data.items);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, [deleteState]);

  return (
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
              <h4 class="header-title">Parameter</h4>
                <table
                  id="datatable"
                  class="table w-100 nowrap"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Para Scope</th>
                      <th>Para Name</th>
                      <th>Para Type</th>
                      <th>ParaShortValue</th>
                      <th>createBy</th>
                      <th>createDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiData &&
                      apiData.map((item, idx) => {
                        return (
                          <tr key={item.parameterId}>
                            <td>{idx + 1}</td>
                            <td>{item.paraScope}</td>
                            <td>{item.paraName}</td>
                            <td>{item.paraType}</td>
                            <td>{item.paraShortValue}</td>
                            <td>{item.createBy}</td>
                            <td>{item.createDate}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameter;
