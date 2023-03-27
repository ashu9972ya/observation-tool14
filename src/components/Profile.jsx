import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { getProfile } from "../actions/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("profile", currentUser)
  // const [flagCheck, setFlagcheck] = useState(true);
  useEffect(() => {
    if (currentUser?.result?.userAuthToken) {
      dispatch(getProfile(currentUser.result.userAuthToken));
    }
  }, [currentUser?.result?.userAuthToken]);
  

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-50">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={currentUser?.profilePicUrl}
                    alt="Avatar"
                    className="my-5"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <MDBTypography tag="h5"></MDBTypography>
                  <MDBCardText></MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="7" className="mb-3">
                        <MDBTypography tag="h6">
                          {currentUser?.email}
                        </MDBTypography>
                        <MDBCardText className="text-muted"></MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Videos</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"> </MDBTypography>
                        <MDBCardText className="text-muted"> </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6"> </MDBTypography>
                        <MDBCardText className="text-muted"> </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="https://www.facebook.com/">
                        <FaFacebookF size={23} />
                      </a>
                      <a href="https://twitter.com/">
                        <FaTwitter className="ms-3" size={24} />
                      </a>
                      <a href="https://www.instagram.com/">
                        <FaInstagram
                          className="ms-3"
                          size={25}
                          color="#f77040"
                        />
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default Profile;
