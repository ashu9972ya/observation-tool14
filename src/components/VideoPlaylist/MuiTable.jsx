import React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import { Rating } from "@mui/material";
import Button from "react-bootstrap/Button";
import UpdateVideo from "./UpdateVideo";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";

const DataTable = ({ products }) => {
  // console.log("pr", products)

  const columns = [
    {
      field: "videoUrl",
      headerName: "VIDEO URL",
      width: 180,
      flex: 1,
      height: 100,
      sortable: false,
      renderCell: (param) => (
        <Link
        to="/videoplayer"
        state={{id:param.id}}
        >
          {param.value}
        </Link>
      ),
    },
   
    {
      field: "createdAt",
      headerName: "Time",
      sortable: false,
      flex: 1,
      width: 200,
      // minWidth: 100,
    },
  
    // { field: "uploadedBy", headerName: "Uploaded By", width: 100 },
    {
      field: "update",
      headerName: "Update",
      sortable: false,
      width: 90,
      renderCell: (param) => <UpdateVideo />,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 100,
      renderCell: (param) => (
        <Button
          variant="danger"
          size="sm"
          onClick={() => deleteVideo(param.id)}
        >
          Delete
        </Button>
      ),
    },
    // {
    //   field: "rating",
    //   headerName: "Rating",
    //   width: 130,
    //   valueFormatter: ({ value }) => value.rate,
    //   renderCell: (params) => (
    //     <Rating
    //       size="medium"
    //       readOnly
    //       defaultValue={params.value.rate}
    //       precision={0.5}
    //     />
    //   ),
    //   sortComparator: (a, b) => {
    //     if (a.rate > b.rate) return 1;
    //     if (a.rate < b.rate) return -1;
    //     if (a.rate === b.rate) return 0;
    //   },
    // },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
