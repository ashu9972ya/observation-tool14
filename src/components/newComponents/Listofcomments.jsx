import React, { useEffect, useState } from "react";
import { BsReply } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Popconfirm, Spin } from "antd";
import {
  getAllComments,
  addReply,
  deleteCommentAction,
  updateCommentAction,
  updateReplyAction,
  deleteSelectedReplyAction,
} from "../../actions/commentaction";
import "./comment.css";



const Listofcomments = () => {
  const dispatch = useDispatch();
  const getCategory = useSelector((state) => state.categoryReducer);
  const comment = useSelector((state) => state.commentreducer);
  console.log("getllllllll...", comment);

  const getVideos = useSelector((state) => state.videoReducer);
  const [comments, setComments] = useState(comment);
  const [loading, setLoading] = useState(true);
  const [addreply, setAddReply] = useState([]);
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(
    comments?.data?.result?.data.map(() => ({ isOpen: false }))
  );
  const [commentValue, setCommentValue] = useState("");
  const [observationTypeValue, setObservationTypeValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [replyValue, setReplyValue] = useState("");
  const [showReplyPopup, setShowReplyPopup] = useState(false);

  const handleOpenReplyPopup = (id) => {
    setSelectedReplyId(id);
    setShowReplyPopup(true);
  };
  const handleCloseReplyPopup = () => {
    setShowReplyPopup(false);
    setSelectedReplyId(null);
    setReplyValue("");
    setObservationTypeValue("");
  };
  const handleEditReply = (replyId, observationByFacultyId, userId) => {
    // implementation for editing a reply
    dispatch(
      updateReplyAction(
        replyId,
        observationByFacultyId,
        observationByFacultyId,
        replyValue,
        userId,
        userId,
        true
      )
    )
      .then((result) => {
        console.log("reply updated the", result);
      })
      .catch((error) => {
        console.log(" not updated reply", error);
      });
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSubmitComment = (
    observationByFacultyId,
    observationTypeId,
    userDetailsId,
    videoTime
  ) => {
    handleClosePopup();
    dispatch(
      updateCommentAction(
        observationByFacultyId,
        observationTypeId,
        getVideos.videos.data._id,
        observationTypeValue,
        commentValue,
        videoTime,
        userDetailsId,
        userDetailsId,
        true
      )
    )
      .then((data) => {
        console.log("comment updated", data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("not updated comment", error);
      });
  };

  const handleSubmit = (observationByFacultyId, userId) => {
    event.preventDefault();
    const newComment = reply.trim();
    if (newComment !== "") {
      setAddReply([...addreply, newComment]);
      setReply("");
    }
    dispatch(
      addReply(
        observationByFacultyId,
        observationByFacultyId,
        reply,
        userId,
        userId,
        true
      )
    )
      .then((result) => {
        console.log("reply addd to comment", result);
        setLoading(false);
        setAddReply(result);
      })
      .catch((error) => {
        console.log("failed to add comment", error);
      });
  };

  const handleAddReply = (event) => {
    setReply(event.target.value);
  };

  const DeleteReply = (observationReplyId) => {
    dispatch(deleteSelectedReplyAction(observationReplyId))
      .then((result) => {
        console.log("reply deleted", result);
      })
      .catch((error) => {
        console.log("reply deleted failed ", error);
      });
  };

  const handleShow = (index) => {
    setOpen((prevOpenStates) => {
      const newOpenStates = prevOpenStates ? [...prevOpenStates] : [];
      newOpenStates[index] = { isOpen: true };
      return newOpenStates;
    });
  };
  const cancel = (index) => {
    setReply("");
    setOpen((prevOpenStates) => {
      const newOpenStates = prevOpenStates ? [...prevOpenStates] : [];
      newOpenStates[index] = { isOpen: false };
      return newOpenStates;
    });
  };

  const deleteComment = (commentId) => {
    console.log("GETTING ID ", commentId);
    dispatch(deleteCommentAction(commentId));
  };

  useEffect(() => {
    dispatch(getAllComments(0, 500, getVideos.videos.data._id)).then(
      (comment) => {
        console.log("#1getAllComment", comment);
        setLoading(false);
        // setComments(comment);
      }
    );
  }, [dispatch, getVideos.videos.data._id]);

  //for scrolling with timestamp
  // const currentTime = comment?.data?.result?.data.map((v, innerWidth)=>{
  //   return v.videoTime;
  // });
  // console.log("vvvvv",currentTime)

  // const scrollToCommentSection = () => {
  //   const commentSection = document.getElementById('comment-section');
  //   const commentSectionTop = commentSection.getBoundingClientRect().top + window.pageYOffset;
  //   const commentSectionHeight = commentSection.offsetHeight;
  //   const commentSectionBottom = commentSectionTop + commentSectionHeight;
  //   const commentHeight = 50; // height of each comment
  //   const commentIndex = Math.floor(currentTime / 10); // assume 10 seconds per comment
  //   const commentTop = commentSectionTop + commentIndex * commentHeight;
  //   const commentBottom = commentTop + commentHeight;
  //   if (commentBottom > commentSectionBottom) {
  //     window.scrollTo({ top: commentBottom - commentSectionHeight, behavior: 'smooth' });
  //   } else if (commentTop < commentSectionTop) {
  //     window.scrollTo({ top: commentTop, behavior: 'smooth' });
  //   }
  // };

  // // Scroll to the comment section when the current time changes
  // useEffect(() => {
  //   scrollToCommentSection();
  // }, [currentTime]);

  if (loading) {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <section className="conversation_container">
        <div className="comment_header">
          <div className="comment-header-container">
            <div className="comment-counts">
              <span>Comments</span>
              {comment?.comments?.data?.result?.observationCount.map(
                (count, index) => {
                  return (
                    <div
                      className="comment-count question"
                      style={{ background: count.bgColorCode }}
                      key={index}
                    >
                      <div
                        className="comment-count-flag question"
                        style={{ background: count.colorCode }}
                      >
                        <span>{count.count}</span>
                        <span
                          style={{
                            borderStyle: "solid",
                            borderWidth: "16px 0 15px 15px",
                            content: "",
                            position: "absolute",
                            left: "30px",
                            borderColor: `transparent transparent transparent ${count.colorCode}`,
                          }}
                        ></span>
                      </div>
                      <span className="type-tag">{count?.observationType}</span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
      <div style={{ backgroundColor: "#e9e9e9" }}>
        <section className="comment-section">
          <div className="conversation-container">
            <div className="scollbar">
              <ul className="comment-list">
                {comment.comments?.data?.result?.data.map(
                  (commentlist, index) => {
                    const isOpen =
                      open && open[index] ? open[index].isOpen : false;
                    return (
                      <li
                        className="comment"
                        id="i7CKqo4vW8FnqAPtR"
                        key={index}
                      >
                        <div className="comment-details" key={index}>
                          {commentlist?.observationType?.map(
                            (videoTime, index) => {
                              return (
                                <div
                                  className="comment-time-flag question"
                                  style={{
                                    backgroundColor: videoTime.colorCode,
                                  }}
                                >
                                  <span
                                    style={{
                                      borderColor: `transparent transparent transparent${videoTime.colorCode}`,
                                      borderStyle: "solid",
                                      borderWidth: "16px 0 15px 15px",
                                      content: "",
                                      position: "absolute",
                                      left: "80px",
                                    }}
                                  ></span>
                                  <span>{commentlist.videoTime}</span>
                                </div>
                              );
                            }
                          )}
                          <img
                            className="user-image"
                            src="https://d28nbyzr2fspwx.cloudfront.net/demo/avatars/b74zxuaipn6a8aor.jpg"
                            alt="User avatar"
                          />
                          <div className="comment-details-text">
                            {commentlist?.userDetails?.map(
                              (userDetails, index) => {
                                // {alert(userDetails?.name)}
                                return (
                                  <>
                                    <p className="comment-author" key={index}>
                                      {userDetails?.fullName}
                                    </p>
                                    <p className="comment-author-title">
                                      {userDetails?.role}
                                    </p>
                                  </>
                                );
                              }
                            )}
                            {commentlist?.observationType?.map(
                              (types, index) => {
                                return (
                                  <p
                                    className="comment-type question"
                                    style={{ color: types.colorCode }}
                                    key={index}
                                  >
                                    {types.title}
                                  </p>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div className="comment-body">
                          <p className="comment-message">
                            {/* {dataValue.map((er,t)=><p>{er.comment}</p>)} */}
                            {commentlist.comment}
                            <span className="comment-date">
                              -{" "}
                              {new Date(commentlist.createdAt).toLocaleString()}
                            </span>
                            <span className="edit-delete-comment">
                              <a
                                className="edit-comment"
                                onClick={() => {
                                  setSelectedCommentId(commentlist._id);
                                  handleOpenPopup();
                                }}
                              >
                                <MdModeEdit
                                  onClick={handleOpenPopup}
                                  size={20}
                                />
                              </a>
                              <Popconfirm
                                title="Delete the comment"
                                description="Are you sure to delete this comment?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() =>
                                  deleteComment(commentlist?._id)
                                }
                              >
                                <a className="delete-comment">
                                  <AiOutlineDelete size={20} />
                                </a>
                              </Popconfirm>
                            </span>
                            {showPopup &&
                              selectedCommentId === commentlist._id && (
                                <div className="popup">
                                  <textarea
                                    value={commentValue}
                                    onChange={(e) =>
                                      setCommentValue(e.target.value)
                                    }
                                  />
                                  <select
                                    value={observationTypeValue}
                                    onChange={(e) =>
                                      setObservationTypeValue(e.target.value)
                                    }
                                  >
                                    <option value="">set big goals</option>
                                    {/* {commentlist.map((type) => ( */}
                                    <option>
                                      {commentlist.relatedTo}
                                      {/* {type.title} */}
                                      {/* {console.log("typesssssssssssssssssssssssssss....",type)} */}
                                    </option>
                                    {/* ))} */}
                                  </select>
                                  <button
                                    onClick={() =>
                                      handleSubmitComment(
                                        commentlist._id,
                                        commentlist?.observationType
                                          .map((a, i) => a._id)
                                          .join(","),
                                        commentlist?.userDetails
                                          .map((c) => c._id)
                                          .join(","),
                                        commentlist?.videoTime
                                      )
                                    }
                                  >
                                    Save
                                  </button>
                                  <button onClick={handleClosePopup}>
                                    Cancel
                                  </button>
                                </div>
                              )}
                          </p>
                          <ul className="inline-list comment-actions">
                            <li>
                              <a
                                className="reply"
                                onClick={() => handleShow(index)}
                              >
                                <BsReply className="me-2" size={22} />
                                Reply
                              </a>
                            </li>
                            <li>
                              <span className="comment-topic">
                                Related to: {commentlist.relatedTo}
                              </span>
                            </li>
                          </ul>
                          <ul className="comment-list">
                            {commentlist?.observationReply?.map((R, index) => {
                              if (R?.comment) {
                                return (
                                  <li className="comment-reply" key={index}>
                                    <img
                                      className="user-image"
                                      src="https://d28nbyzr2fspwx.cloudfront.net/demo/avatars/Zc3vuMSCKkvL64DfA.jpg"
                                      alt="User avatar"
                                    />
                                    <div className="comment-reply-body">
                                      {R?.userDetails?.map((user, index) => {
                                        return (
                                          <p
                                            className="comment-reply-author"
                                            key={index}
                                          >
                                            <span className="comment-reply-author-title">
                                              {user?.role}
                                            </span>
                                            <span className="comment-reply-author-name">
                                              {user?.firstName +
                                                " " +
                                                user?.lastName}
                                            </span>
                                          </p>
                                        );
                                      })}
                                      <p className="comment-message clearfix">
                                        {R?.comment}
                                        <span className="comment-date">
                                          -{" "}
                                          {new Date(
                                            R?.createdAt
                                          ).toLocaleString()}
                                        </span>
                                        <span className="editdelete">
                                          <a className="edit">
                                            <MdModeEdit
                                              size={20}
                                              onClick={() =>
                                                handleOpenReplyPopup(R._id)
                                              }
                                            />
                                          </a>
                                          <Popconfirm
                                            title="Delete the comment"
                                            description="Are you sure to delete this comment?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => DeleteReply(R._id)}
                                          >
                                            <a className="delete">
                                              <AiOutlineDelete size={20} />
                                            </a>
                                          </Popconfirm>
                                        </span>
                                      </p>
                                      {showReplyPopup &&
                                        selectedReplyId === R._id && (
                                          <div className="popup">
                                            <textarea
                                              value={replyValue}
                                              onChange={(e) =>
                                                setReplyValue(e.target.value)
                                              }
                                            />
                                            <button
                                              onClick={() =>
                                                handleEditReply(
                                                  R._id,
                                                  commentlist._id,
                                                  commentlist?.userDetails
                                                    .map((c) => c._id)
                                                    .join(",")
                                                )
                                              }
                                            >
                                              Save
                                            </button>
                                            <button
                                              onClick={handleCloseReplyPopup}
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        )}
                                      <ul className="inline-list comment-actions"></ul>
                                    </div>
                                  </li>
                                );
                              }
                            })}

                            {isOpen && (
                              <li className="comment-reply">
                                <form
                                  onSubmit={() =>
                                    handleSubmit(
                                      commentlist._id,
                                      commentlist.userDetails
                                        .map((c) => c._id)
                                        .join(",")
                                    )
                                  }
                                  className="comment-reply-form clearfix"
                                  autoComplete="on"
                                >
                                  <textarea
                                    name="message"
                                    rows="2"
                                    autoFocus=""
                                    value={reply}
                                    onChange={handleAddReply}
                                  ></textarea>
                                  <div className="form-controls">
                                    <a
                                      className="cancel"
                                      onClick={() => cancel(index)}
                                    >
                                      Cancel
                                    </a>
                                    <button
                                      className="button"
                                      type="submit"
                                      disabled=""
                                    >
                                      Add Comment
                                    </button>
                                  </div>
                                </form>
                              </li>
                            )}
                          </ul>
                        </div>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Listofcomments;
