import React, { useEffect, useState } from "react";
import * as parameterService from "../../../services/ParameterService";
import "./parameter.css";

const Parameter = () => {
  const [apiData, setApiData] = useState([]);
  const [detail, setDetail] = useState({});
  const [deleteState, setDeleteState] = useState(false);
  const [keyword, setKeyword] = useState("");

  const fetchApiData = async () => {
    const query = {
      pageNo: 1,
      pageSize: 2,
      sortColumn: "",
      sortAscending: true,
      status: 0,
      selectAll: true,
      keyword: "",
    };
    const [res, err] = await parameterService.search(query);
    if (res) {
      setApiData(res.data.items);
    } else {
      console.log(err);
    }
  };

  const handleGetDetail = async (id) => {
    const [res, err] = await parameterService.findById(id);
    if (res) {
      console.log(res.data);
      setDetail(res.data);
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
        {/* <!-- start page title --> */}
        <div class="row">
          <div class="col-12">
            <div class="page-title-box">
              {/* <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);">Minton</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="javascript: void(0);">Tables</a>
                  </li>
                  <li class="breadcrumb-item active">Responsive Table</li>
                </ol>
              </div> */}
              <div class="page-title-right">
                <a href="javascript:void(0)" class="btn btn-primary" role="button">add</a>
              </div>
              <h4 class="page-title">Parameter Manager</h4>
            </div>
          </div>
        </div>
        {/* <!-- end page title -->  */}

        <div class="row">
          <div class="col-12">
            <div class="card-box">
              <div class="responsive-table-plugin">
              <div className="btn-toolbar">
                <div className="">
                <form
                  method="GET"
                  //ref={formRef}
                  //onSubmit={(e) => handleSearch(e)}
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="col-3 p-0">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name category..."
                        name="name"
                      />
                    </div>

                    <div class="col-3 p-0">
                      <div class="d-flex">
                        <select class="form-control rounded-0 " name="sort">
                          <option value="">----- Order by -----</option>
                          <option value="Id-ASC">Sorting By Id (a - z)</option>
                          <option value="Id-DESC">Sorting By Id (z - a)</option>
                          <option value="Name-ASC">
                            Sorting By Name (a - z)
                          </option>
                          <option value="Name-DESC">
                            Sorting By Name (z - a)
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-3 text-right p-0 m-0">
                      <button type="submit" class="btn rounded-0 btn-primary">
                        Search
                      </button>
                      <button
                        type="button"
                        //onClick={handleReset}
                        class="btn rounded-0 btn-danger text-white"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
                </div>
              </div>
              

                <div class="table-rep-plugin">
                  <div class="table-responsive">
                    <table id="tech-companies-1" class="table table-striped">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>ParaScope</th>
                          <th>ParaName</th>
                          <th>ParaType</th>
                          <th>ParaShortValue</th>
                          <th className="text-center">CreateBy</th>
                          <th>CreateDate</th>
                          <th className="text-center">Action</th>
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
                                <td className="text-center">{item.createBy}</td>
                                <td>{item.createDate}</td>
                                <td className="text-center">
                                  <div className="group-actions">
                                    <a
                                      href="javascript:void(0)"
                                      role="button"
                                      data-toggle="modal"
                                      data-target="#con-close-modal"
                                      onClick={() =>
                                        handleGetDetail(item.parameterId)
                                      }
                                    >
                                      <i class="remixicon-eye-line"></i>
                                    </a>
                                    <a
                                      href="javascript:void(0)"
                                      role="button"
                                      data-toggle="modal"
                                      data-target="#con-close-modal"
                                      onClick={() =>
                                        handleGetDetail(item.parameterId)
                                      }
                                    >
                                      <i class="remixicon-pencil-fill"></i>
                                    </a>
                                    <a
                                      href="javascript:void(0)"
                                      role="button"
                                      data-toggle="modal"
                                      data-target="#con-close-modal"
                                      onClick={() =>
                                        handleGetDetail(item.parameterId)
                                      }
                                    >
                                      <i class="fas fa-trash-alt"></i>
                                    </a>
                                  </div>
                                </td>
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

        <div
          id="con-close-modal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
          style={{ display: "none" }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Modal Content is Responsive</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div class="modal-body p-4">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="field-1" class="control-label">
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-1"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="field-2" class="control-label">
                        Surname
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-2"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="field-3" class="control-label">
                        Address
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-3"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="field-4" class="control-label">
                        City
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-4"
                        placeholder="Boston"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="field-5" class="control-label">
                        Country
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-5"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="field-6" class="control-label">
                        Zip
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-6"
                        placeholder="123456"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group no-margin">
                      <label for="field-7" class="control-label">
                        Personal Info
                      </label>
                      <textarea
                        class="form-control"
                        id="field-7"
                        placeholder="Write something about yourself"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary waves-effect"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-info waves-effect waves-light"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameter;
