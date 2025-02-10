import React, { useEffect, useState, useRef } from "react";
import * as parameterService from "../../../services/ParameterService";
import "./parameter.css";
import Swal from "sweetalert2";

const Parameter = () => {
  const initDetail = {
    paraScope: "",
    paraName: "",
    paraType: "",
    paraShortValue: "",
    paraLobValue: "",
    paraDesc: "",
  };
  const formRef = useRef(null);
  const [apiData, setApiData] = useState([]);
  const [titleModal, setTitleModal] = useState("");
  const [detail, setDetail] = useState(initDetail);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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

  const handleSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const keyword = formData.get("keyword") || null;
    const sort = formData.get("sort") || null;
    const query = {
      pageNo: 1,
      pageSize: 2,
      sortColumn: "",
      sortAscending: true,
      status: 0,
      selectAll: true,
      keyword: keyword,
    };
    if (sort) {
      const [key, value] = sort.split("-");
      query.sortColumn = key || "Id";
      query.sortAscending = value === "DESC"; // Nếu là "DESC" thì true, ngược lại là false
    }
    console.log(query);
    const [res, err] = await parameterService.search(query);
    if (res) {
      setApiData(res.data.items);
    } else {
      console.log(err);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    //setCurrentPage(1);
    fetchApiData();
  };

  const handleShowDetail = async (id) => {
    setTitleModal("Detail");
    setIsAdd(false);
    setIsEdit(false);
    const [res, err] = await parameterService.findById(id);
    if (res) {
      console.log(res.data);
      setDetail(res.data);
    } else {
      console.log(err);
    }
  };

  const handleShowAdd = () => {
    setTitleModal("Add");
    setIsAdd(true);
    setIsEdit(false);
    setDetail(initDetail);
  };

  const handleShowEdit = async (id) => {
    setTitleModal("Edit");
    setIsAdd(false);
    setIsEdit(true);
    const [res, err] = await parameterService.findById(id);
    if (res) {
      console.log(res.data);
      setDetail(res.data);
    } else {
      console.log(err);
    }
  };

  const handleSaveAdd = async () => {
    const [result, error] = await parameterService.save(detail);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsAdd(false);
      setIsEdit(true);
      const btn = document.getElementById("btn-close-modal-cus");
      btn.click()
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Add Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  const handleSaveEdit = async (id) => {
    const [result, error] = await parameterService.update(id, detail);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsAdd(true);
      setIsEdit(false);
      const btn = document.getElementById("btn-close-modal-cus");
      btn.click()
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const [res, err] = await parameterService.remove(id);
      if (res) {
        setIsDelete(!isDelete);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Delete failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    fetchApiData();
  }, [isAdd, isEdit, isDelete]);

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
                <a
                  href="javascript:void(0)"
                  class="btn btn-success"
                  role="button"
                  data-toggle="modal"
                  data-target="#con-close-modal"
                  onClick={() => handleShowAdd()}
                >
                  <i class="remixicon-add-fill"></i> Add
                </a>
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
                      ref={formRef}
                      onSubmit={(e) => handleSearch(e)}
                    >
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="col-3 p-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by scope, name or type"
                            name="keyword"
                          />
                        </div>

                        <div class="col-3 p-0">
                          <div class="d-flex">
                            <select class="form-control rounded-0 " name="sort">
                              <option value="">----- Order by -----</option>
                              <option value="Id-ASC">
                                Sorting By Id (a - z)
                              </option>
                              <option value="Id-DESC">
                                Sorting By Id (z - a)
                              </option>
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
                          <button
                            type="submit"
                            class="btn rounded-0 btn-primary"
                          >
                            Search
                          </button>
                          <button
                            type="button"
                            onClick={handleReset}
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
                                      className="text-info"
                                      href="javascript:void(0)"
                                      role="button"
                                      data-toggle="modal"
                                      data-target="#con-close-modal"
                                      onClick={() =>
                                        handleShowDetail(item.parameterId)
                                      }
                                    >
                                      <i class="remixicon-eye-line"></i>
                                    </a>
                                    <a
                                      className="text-warning"
                                      href="javascript:void(0)"
                                      role="button"
                                      data-toggle="modal"
                                      data-target="#con-close-modal"
                                      onClick={() =>
                                        handleShowEdit(item.parameterId)
                                      }
                                    >
                                      <i class="remixicon-pencil-fill"></i>
                                    </a>
                                    <a
                                      className="text-danger"
                                      href="javascript:void(0)"
                                      role="button"
                                      onClick={() =>
                                        handleDelete(item.parameterId)
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
                <h4 class="modal-title">{titleModal}</h4>
                <button
                  type="button"
                  class="close"
                  id="btn-close-modal-cus"
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
                        ParaScope
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-1"
                        value={detail.paraScope}
                        disabled={!isAdd && !isEdit}
                        onChange={(e) =>
                          setDetail({ ...detail, paraScope: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="field-2" class="control-label">
                        ParaName
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-2"
                        value={detail.paraName}
                        disabled={!isAdd && !isEdit}
                        onChange={(e) =>
                          setDetail({ ...detail, paraName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="field-3" class="control-label">
                        ParaType
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-3"
                        value={detail.paraType}
                        disabled={!isAdd && !isEdit}
                        onChange={(e) =>
                          setDetail({ ...detail, paraType: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="field-4" class="control-label">
                        ParaShortValue
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-4"
                        value={detail.paraShortValue}
                        disabled={!isAdd && !isEdit}
                        onChange={(e) =>
                          setDetail({
                            ...detail,
                            paraShortValue: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="field-5" class="control-label">
                        ParaLobValue
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="field-5"
                        value={detail.paraLobValue}
                        disabled={!isAdd && !isEdit}
                        onChange={(e) =>
                          setDetail({ ...detail, paraLobValue: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group no-margin">
                      <label for="field-7" class="control-label">
                        ParaDesc
                      </label>
                      <textarea
                        class="form-control"
                        id="field-7"
                        value={detail.paraDesc}
                        disabled={!isAdd && !isEdit}
                        onChange={(e) =>
                          setDetail({ ...detail, paraDesc: e.target.value })
                        }
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
                {isAdd && !isEdit && (
                  <button
                    type="button"
                    class="btn btn-info waves-effect waves-light"
                    onClick={() => handleSaveAdd()}
                  >
                    Save
                  </button>
                )}
                {!isAdd && isEdit && (
                  <button
                    type="button"
                    class="btn btn-info waves-effect waves-light"
                    onClick={() => handleSaveEdit(detail.parameterId)}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameter;
