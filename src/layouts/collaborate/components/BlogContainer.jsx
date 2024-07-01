import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import "./style/conversationContainer.scss";
import { blogService } from "services/blogService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RiMore2Fill } from "react-icons/ri";
import ItemBlog from "./ItemBlog";
import Post from "../../overview/components/Post";
import { confirmDialogGlobal } from "shared/components/confirmDialogGlobal";
import { Dialog } from "primereact/dialog";
import { useForm, Controller } from "react-hook-form";
import { getCurrentUserDefault } from "shared/utils/getCurrentUserDefault";
import { Image } from "components/Image";
import { AiFillLike } from "react-icons/ai";
import { FaComment, FaShareSquare } from "react-icons/fa";
import { LoadingPanel } from "components/loader-ui/LoadingPanel";
import DropdownFilter from "layouts/learner/my-learning/DropdownFilter";
const BlogContainer = () => {
  const { t } = useTranslation();
  const [bloglist, setbloglist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checksort, setchecksort] = useState(false);
  const [IdUserBlog, setIdUserBlog] = useState(null);
  const [conversationdetail, setconversationdetail] = useState(null);
  const [boxItem, setboxItem] = useState("");
  const [visibleFullScreen1, setVisibleFullScreen1] = useState(false);
  const [postshare, setpostshare] = useState({});
  const [btnBaoCao, setbtnBaoCao] = useState(false);
  const [btnBaoCao1, setbtnBaoCao1] = useState(false);
  const [btnBaoCao2, setbtnBaoCao2] = useState(false);
  const [btnBaoCao3, setbtnBaoCao3] = useState(false);
  const [an, setAn] = useState(true);
  const [selectedItem, setselectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [idTitle, setidTitle] = useState("");
  const [number, setnumber] = useState(1);
  const [number2, setnumber2] = useState(1);
  const [search, setsearch] = useState({
    CorporateID: 1,
    WebAppFlag: "W",
    assignedFilterBy: "",
    pageNumber: 1,
    pageSize: 10,
    conversationId: 0,
    recordsCount: 10,
    searchText: "",
    searchType: "",
    sortColumn: "",
    sortOrder: "desc",
    searchBy: null,
    filterBy: "0",
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({});
  const [advanceSearch, setAdvanceSearch] = useState({
    WebAppFlag: "W",
    filterBy: "0",
    assignedFilterBy: "",
    pageNumber: 1,
    pageSize: 10,
    searchBy: null,
    sortOrder: "desc",
    CorporateID: 1,
    searchType: "",
    recordsCount: 10,
    conversationId: 0,
    sortColumn: "FR",
    searchText: "",
  });
  const [keySearch, setKeysearch] = useState("");
  const filterCourse = async (value) => {
    setLoading(true);
    let result = await blogService.getbloglist(value);
    setbloglist(result.data);
    setLoading(false);
  };
  useEffect(() => {
    // call api here
    loadApi(advanceSearch);
  }, []);
  useEffect(() => {
    filterCourse(advanceSearch);
  }, [advanceSearch]);

  const loadApi = async (val) => {
    let lstconversation = await blogService.getbloglist(val);
    setbloglist(lstconversation.data);
    getdetailconversation(lstconversation.data[0]);
  };
  function onKeySearchChange(text) {
    setKeysearch(text);
  }
  function keyDown(e) {
    if (e.key == "Enter") {
      setAdvanceSearch({
        ...search,
        ...advanceSearch,
        SearchText: e.target.value,
      });
    }
  }
  // chia sẻ bài đăng
  function onClickSearchPost(id) {
    setVisibleFullScreen1(true);
    // setpostshare(id)
  }

  const getdetailconversation = async (item, idx) => {
    let obj = {
      CorporateId: "1",
      IsConversation: false,
      BlogId: item.BlogId,
      pageNumber: 0,
      pageSize: 0,
      SearchText: "",
      SearchType: "",
      sortColumn: "FR",
      SortOrder: "desc",
    };
    setnumber(1);
    setIdUserBlog(item.UserID);
    let result = await blogService.getblogdetails(obj);
    setconversationdetail(result.data);
    setboxItem("boxItem" + idx);
  };
  //cmt
  const onCommentItem = async (a, b) => {
    let obj = {
      Commentcount: 0,
      BlogId: b.BlogId,
      CorporateId: 1,
      Flag: "I",
      Type: "Topic",
      pageNumber: 0,
      PageSize: 0,
      SearchText: "",
      SerchType: "",
      recordsCount: 0,
      Mode: "C",
    };
    const targetObject = Object.assign(a, obj);
    await blogService.insertupdatedeletecomments(targetObject);

    let obj1 = {
      CorporateId: "1",
      IsConversation: false,
      BlogId: b.BlogId,
      pageNumber: 0,
      pageSize: 0,
      SearchText: "",
      SearchType: "",
      sortColumn: "FR",
      SortOrder: "desc",
    };
    let result = await blogService.getblogdetails(obj1);
    setconversationdetail(result.data);
    let lstconversation = await blogService.getbloglist(advanceSearch);
    setbloglist(lstconversation.data);
  };
  //sửa cmt

  const onClickEditCMT = async (it) => {
    let idTextEdit = "textEdit" + it.CommentId;
    let valText = document.getElementById(idTextEdit).value;
    let idDIV = "edit" + it.CommentId;
    let idText = "text" + it.CommentId;
    var obj = {
      Commentcount: 0,
      BlogId: it.BlogId,
      CommentText: valText,
      CorporateId: 1,
      CommentId: it.CommentId,
      Mode: "U",
    };

    if (valText != null) {
      await blogService.insertupdatedeletecomments(obj);
      document.getElementById(idDIV).style.display = "none";
      document.getElementById(idText).style.display = "flex";
      let obj1 = {
        CorporateId: "1",
        IsConversation: false,
        BlogId: it.BlogId,
        RecordCount: 10,
        pageNumber: 1,
        SearchText: "",
        SearchType: "",
        SortOrder: "desc",
        sortColumn: "FR",
      };
      let result = await blogService.getblogdetails(obj1);
      setconversationdetail(result.data);
      alert("Cập nhật thành công");
    }
  };
  //xem them
  const xemThemComment = async (item) => {
    let obj1 = {
      CorporateId: "1",
      IsConversation: false,
      BlogId: item.BlogId,
      pageNumber: 0,
      pageSize: 0,
      SearchText: "",
      SearchType: "",
      sortColumn: "FR",
      SortOrder: "desc",
    };
    let result1 = await blogService.getblogdetails(obj1);
    setLoading(true);
    let obj = {
      BlogId: item.BlogId,
      CommentId: result1.data.CommentList[0].CommentId,
      CorporateId: 1,
      IsCommentAllowed: true,
      pageNumber: number,
      PageSize: 5,
      SearchText: "",
      SerchType: "",
      SortColumn: "FR",
      SortOrder: "desc",
    };
    setnumber(number + 1);
    let result = await blogService.getprevcommentslisting(obj);

    setconversationdetail((data) => {
      let objItem = data;
      let comments = data.CommentList;
      if (result.data.CommentList != null) {
        comments = [...comments, ...result.data.CommentList];
        objItem.CommentList = comments;
        return data;
      } else {
        alert("Không còn bình luận nào để hiển thị");
        objItem.CommentList.comment = comments;
        return data;
      }
    });
    setLoading(false);
  };
  // xóa cmt topic
  const editCMT = async (id, a) => {
    await blogService.insertupdatedeletecomments(id);
    let obj = {
      CorporateId: "1",
      IsConversation: false,
      BlogId: a,
      pageNumber: 0,
      pageSize: 0,
      SearchText: "",
      SearchType: "",
      sortColumn: "FR",
      SortOrder: "desc",
    };
    let result = await blogService.getblogdetails(obj);
    setconversationdetail(result.data);
  };
  const onEditComment = (item) => {
    setnumber(1);
    let idDIV = "edit" + item.CommentId;
    document.getElementById(idDIV).style.display = "flex";
  };
  const onDeleteComment = (item) => {
    setnumber(1);
    var obj = {
      BlogId: item.BlogId,
      CommentId: item.CommentId,
      CorporateId: 1,
      Mode: "D",
      CommentText: "",
      Commentcount: 0,
      PageNumber: 0,
      PageSize: 0,
    };
    confirmDialogGlobal({
      message: "Bạn có chắc chắn muốn xóa Nhận xét này không ",
      accept: () => editCMT(obj, item.BlogId),
    });
  };

  // báo cáo lạm dụng topic
  const baoCaoLamDung = (a) => {
    if (a.IsReportedRebuse == false) {
      // item chưa được report
      setbtnBaoCao(true);
      setidTitle(a.TileId);
      setselectedItem(a);
    } else {
      // đã report call here
      setbtnBaoCao1(true);
    }
  };
  //bao cao lam dung cmt
  const onBaoCaoComment = (a) => {
    setnumber(1);
    if (a.IsReportedRebuse == false) {
      // item chưa được report
      setbtnBaoCao2(true);
      setidTitle(a.TileId);
      setselectedItem(a);
    } else {
      // đã report call here
      setbtnBaoCao3(true);
    }
  };

  const sentReasonRepost1 = async (a, c) => {
    var obj = {
      ItemId: a.BlogId,
      ItemType: "B",
      PostedContentUserId: a.CommentById,
      reportAbuseComment: c,
      ThreadId: a.CommentId,
    };
    await blogService.addrebusereportcomment(obj);
    setbtnBaoCao2(false);
    let obj1 = {
      CorporateId: "1",
      IsConversation: false,
      BlogId: a.BlogId,
      pageNumber: 0,
      pageSize: 0,
      SearchText: "",
      SearchType: "",
      sortColumn: "FR",
      SortOrder: "desc",
    };
    let result = await blogService.getblogdetails(obj1);
    setconversationdetail(result.data);
  };
  //like
  const onClickLike = async (i) => {
    var obj = {
      BlogId: i.BlogId,
      TileId: i.TileId,
      Mode: "L",
    };
    await blogService.insertupdatedeletecomments(obj);
    loadApi(search);
  };
  const onSubmitBaoCaoCMT = async (data) => {
    setFormData(data);
    reset();
  };

  const getFormErrorMessage = (fieldName) => {
    return (
      errors[fieldName] && (
        <small className="p-error" style={{ float: "left" }}>
          {errors[fieldName].message}
        </small>
      )
    );
  };
  const filterItems = [
    {
      value: "desc",
      text: "Gần đây",
    },
    {
      value: "asc",
      text: "A đến Z",
    },
  ];
  const onChangeFilter = (item) => {
    setAdvanceSearch({ ...advanceSearch, sortOrder: item.value });
  };

  function renderdataconversationlist() {
    return (
      <div className="col-6 ">
        <Card title={t("key-title", "Blog")}>
          <div style={{ display: "flex", marginBottom: "14px" }}>
            <div className="p-inputgroup" style={{ width: "1000px" }}>
              <InputText
                onKeyDown={(e) => keyDown(e)}
                onChange={(e) => onKeySearchChange(e.target.value.trim())}
                placeholder="Nhập từ khoá tìm kiếm"
              />
              <Button
                onClick={() => {
                  setAdvanceSearch({ ...advanceSearch, SearchText: keySearch });
                }}
                icon="pi pi-search"
              />
            </div>
            <div style={{ width: "100px", marginRight: "15px" }}>
              {/* <DropdownFilter items={filterItems} onChange={onChangeFilter} /> */}
              <Button
                style={{ background: "#fff", border: 0, color: "black" }}
                onClick={() => {
                  setchecksort(!checksort);
                  setAdvanceSearch({
                    ...advanceSearch,
                    sortOrder: !checksort ? "desc" : "asc",
                  });
                }}
                icon="pi pi-sort-alt"
              />
              <Button
                style={{
                  background: "#fff",
                  border: 0,
                  color: "black",
                  width: 12,
                }}
                onClick={() => {
                  setchecksort(!checksort);
                  setAdvanceSearch({
                    ...advanceSearch,
                    sortOrder: !checksort ? "desc" : "asc",
                  });
                }}
                icon={!checksort ? "pi pi-angle-down" : "pi pi-angle-up"}
              />
            </div>
          </div>
          <div>
            <div className="card text-center list-card">
              <div
                className="card-header"
                style={{
                  fontWeight: 600,
                  borderBottom: "1px solid #dee2e6 ",
                  backgroundColor: "#00597f",
                  color: "#fff",
                }}
              >
                <span>TIÊU ĐỀ</span>
              </div>
              <LoadingPanel >
                <div  className="scrool-blog">
                  {/* <div className="card-body"> */}
                  <div>
                    {bloglist &&
                      bloglist.map((item, idx) => {
                        return (
                          <div
                            id={"coversation" + idx}
                            className={
                              boxItem == "boxItem" + idx
                                ? "bodyItem1"
                                : "bodyItem"
                            }
                            key={idx}
                            style={{
                              height: "70px",
                              borderBottom: "1px solid #dee2e6 ",
                              borderLeft: "1px solid #dee2e6 ",
                              borderRight: "1px solid #dee2e6 ",
                            }}
                          >
                            <div className=" w-100">
                              <div
                                className="titleConversation"
                                style={{
                                  float: "left",
                                  textAlign: "left",
                                  width: "75%",
                                  paddingLeft: "20px",
                                  cursor: "pointer",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                                onClick={() => getdetailconversation(item, idx)}
                              >
                                <b>{item.BlogTitle}</b>
                              </div>
                              <div
                                style={{
                                  width: "20%",
                                  float: "right",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  textAlign: "left",
                                }}
                              >
                                <b>{item.UserName}</b>
                              </div>
                            </div>
                            <div
                              style={{
                                float: "left",
                                marginTop: "10px",
                                marginLeft: "10px",
                              }}
                            >
                              <AiFillLike
                                className="icon-postitem "
                                onClick={() => onClickLike(item)}
                                style={{
                                  color:
                                    item.IsLiked == true
                                      ? "#5959df"
                                      : "rgb(167, 164, 164)",
                                }}
                              ></AiFillLike>
                              <span style={{ marginRight: "10px" }}>
                                {item.Likes}
                              </span>
                              <FaComment className="icon-postitem"></FaComment>
                              <span style={{ marginRight: "10px" }}>
                                {item.Comments}
                              </span>
                              <a
                                style={{
                                  textDecoration: "none",
                                  background: "transparent",
                                  color: "#9ba5b7",
                                  marginLeft: "20px",
                                  marginRight: "15px",
                                }}
                                title="Chia sẻ"
                                onClick={() => onClickSearchPost(item)}
                              >
                                <i>
                                  <FaShareSquare />
                                </i>
                              </a>
                            </div>
                            <ul className="views-topics">
                              <li style={{ marginLeft: "60%" }}>
                                {item.TimeSpan}
                              </li>
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </LoadingPanel>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  function renderdataconversationtopic() {
    return (
      <div className="col-6">
        <Card>
          {conversationdetail && (
            <>
              <div  className="scrool-blog2">
                <div >
                  <ItemBlog
                    avatar={conversationdetail.BloggerImage}
                    name={conversationdetail.UserName}
                    status={conversationdetail.JobRole}
                    timeAgo={conversationdetail.TimeSpan}
                    BlogDesc={conversationdetail.BlogDesc}
                    BlogTitle={conversationdetail.BlogTitle}
                    BlogId={conversationdetail.BlogId}
                    IsCommentAllowed={conversationdetail.IsCommentAllowed}
                    onComment={(x) => {
                      onCommentItem(x, conversationdetail);
                    }}
                    onBaoCao={() => baoCaoLamDung(conversationdetail)}
                    onDelete={() => deleteTopic(conversationdetail)}
                    id={conversationdetail.userId}
                  ></ItemBlog>
                </div>
                <div
                  style={{
                    backgroundColor: "#cbbdbd33",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "20px",
                  }}
                >
                    <div>
                    {conversationdetail.CommentList &&
                    conversationdetail.CommentList.map((it, idx) => {
                      let idCMTEdit = "edit" + it.CommentId;
                      let idTextEdit = "textEdit" + it.CommentId;
                      let idText = "text" + it.CommentId;
                      let idbtn = "btn" + it.CommentId;
                      const userDefault = getCurrentUserDefault();
                      const userID = userDefault.UserId;

                      return (
                        <div key={idx}>
                          <div
                            className="container_cmt"
                            style={{
                              boxShadow:
                                "0px 1.2px 1.2px 0px rgb(52 51 51 / 63%)",
                              marginBottom: "40px",
                            }}
                          >
                            <div style={{ border: "1px solid #dddddd" }}>
                              <div
                                style={{
                                  margin: "5px 0px 0px 0px",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div className="media-left">
                                  <a>
                                    <Image
                                      src={it.UserImagePath}
                                      alt="avatar"
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        margin: "10px",
                                        border: "1px solid #3333",
                                      }}
                                    />
                                  </a>
                                </div>
                                <div
                                  style={{
                                    border: "1px solid #dddddd",
                                    height: "70px",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <div className="w-100">
                                      <div
                                        style={{
                                          fontWeight: "600",
                                          width: "50%",
                                          float: "left",
                                          whiteSpace: "nowrap",
                                          textAlign: "left",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {it.CommentBy}
                                      </div>
                                      <div
                                        style={{
                                          color: "#8b8b8b",
                                          fontSize: "14px",
                                          marginRight: "10px",
                                          fontStyle: "italic",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {it.JobRole}
                                      </div>
                                    </div>
                                    <div
                                      className="text-right"
                                      style={{
                                        display: "flex",
                                        width: "45%",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <span>{it.TimeSpan}</span>
                                      <div>
                                        {it.IsReportedRebuse == true ? (
                                          <i
                                            className="fa fa-flag"
                                            style={{
                                              color: "#f17479",
                                              marginLeft: "10px",
                                              marginTop: "12px",
                                            }}
                                          ></i>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                      <div
                                        className=" dropdown"
                                        style={{ display: "flex" }}
                                      >
                                        <a
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          <RiMore2Fill
                                            style={{
                                              cursor: "pointer",
                                              color: "#656565",
                                              fontSize: "20px",
                                              marginTop: "4px",
                                            }}
                                          ></RiMore2Fill>
                                        </a>
                                        <ul
                                          className="dropdown-menu"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          {userID == it.CommentById ? (
                                            <>
                                              <li>
                                                <a
                                                  onClick={() =>
                                                    onDeleteComment(it)
                                                  }
                                                  className="dropdown-item"
                                                  href="#"
                                                >
                                                  Xóa
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  onClick={() =>
                                                    onEditComment(it)
                                                  }
                                                  className="dropdown-item"
                                                  //href="#"
                                                >
                                                  Chỉnh sửa
                                                </a>
                                              </li>
                                            </>
                                          ) : (
                                            <li>
                                              <a
                                                onClick={() =>
                                                  onBaoCaoComment(it)
                                                }
                                                className="dropdown-item"
                                                href="#"
                                              >
                                                Báo cáo lạm dụng
                                              </a>
                                            </li>
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={{
                                      borderTop: "1px solid #dddddd",
                                      paddingTop: 5,
                                    }}
                                  >
                                    <span id={idText}>{it.CommentText}</span>
                                    <div
                                      style={{
                                        display: "none",
                                        width: "100%",
                                        marginTop: "15px",
                                      }}
                                      id={idCMTEdit}
                                    >
                                      <input
                                        id={idTextEdit}
                                        style={{ width: "100%" }}
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder="Nhập nội dung "
                                      />
                                      <button
                                        id={idbtn}
                                        onClick={() => onClickEditCMT(it)}
                                        className="btn"
                                        style={{
                                          marginLeft: "10px",
                                          width: "60px",
                                          height: "32px",
                                          marginRight: "10px",
                                          backgroundColor: "#efefef",
                                          border: "1px solid",
                                        }}
                                      >
                                        Gửi
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                 

                  <Dialog
                    header="Bạn có thực sự muốn báo cáo lạm dụng không? Nêu lý do *"
                    visible={btnBaoCao2}
                    onHide={() => setbtnBaoCao2(false)}
                  >
                    <form
                      className="row g-3"
                      onSubmit={handleSubmit(onSubmitBaoCaoCMT)}
                    >
                      <div className="mb-3 field">
                        <span className="p-float-label">
                          <Controller
                            name="reportAbuseComment"
                            control={control}
                            rules={{ required: "Lý do không được để trống" }}
                            render={({ field, fieldState }) => (
                              <InputText
                                id={field.name}
                                {...field}
                                autoFocus
                                value={field.value ?? ""}
                                style={{ width: "100%" }}
                              />
                            )}
                          />
                        </span>
                        {getFormErrorMessage("reportAbuseComment", errors)}
                      </div>
                      <div className="col-12 d-flex justify-content-end">
                        <Button
                          className="btn btn-primary mr-3"
                          label="Đồng ý"
                          autoFocus
                          type="submit"
                          onClick={() =>
                            sentReasonRepost1(
                              selectedItem,
                              getValues("reportAbuseComment")
                            )
                          }
                        />
                        <Button
                          label="Hủy bỏ"
                          onClick={() => setbtnBaoCao2(false)}
                          className="p-button-text"
                        />
                      </div>
                    </form>
                  </Dialog>
                  <Dialog
                    header="Bình luận đã bị báo cáo trước đó"
                    visible={btnBaoCao3}
                    onHide={() => setbtnBaoCao3(false)}
                  ></Dialog>

                  {conversationdetail.CommentList.length <
                    conversationdetail.Comments &&
                  conversationdetail.Comments > 1 ? (
                    <a
                      style={{ cursor: "pointer", marginTop: "12px" }}
                      onClick={() => xemThemComment(conversationdetail)}
                    >
                      Hiển thị thêm nhận xét
                    </a>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="row">
        {renderdataconversationlist()}
        {renderdataconversationtopic()}
      </div>
      <Post
        shareCallBack={() => shareCall()}
        postId={postshare}
        onclickshow={() => setVisibleFullScreen1(false)}
        visiblefull={visibleFullScreen1}
      ></Post>
    </>
  );
};
export default BlogContainer;
