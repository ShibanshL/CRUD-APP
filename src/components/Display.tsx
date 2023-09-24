import React, { useEffect, useState } from "react";
import "./Main.css";
import {
  useStore,
  useCategory,
  useSearch,
  useNotification,
} from "../API_MNAGE";
import {
  DeleteData,
  EditData,
  FetchData,
  ChangeStatus,
} from "../fetchers/AllFetchers";

import Edit from "/Vector-1.svg";
import Delete from "/Vector.svg";
import Cross from "/Vector-2.svg";
import Correct from "/Vector-3.svg";

interface APIDATA {
  id: string;
  Task: string;
  Done: boolean;
}

function Display() {
  const category = useCategory((state: any) => state.category);
  const search = useSearch((state: any) => state.search);
  const change = useStore((state: any) => state.count);
  const setChange = useStore((state: any) => state.inc);
  const notification = useNotification((state: any) => state.notification);
  const setNotify = useNotification((state: any) => state.setNotification);
  const [loading, setLoading] = useState(false);
  const [doneClick, setDoneClick] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [emptyDatasets, setEmptyDatasets] = useState([]);

  const [edit, setEdit] = useState({
    ifClicked: false,
    currentVal: "",
  });
  const [editText, setEditText] = useState({ id: "", Task: "", Done: false });

  useEffect(() => {
    console.log(notification);
  }, [notification]);

  //This useeffect calls the fetch function every time user makes some changes
  useEffect(() => {
    FetchData({ setApiData, setLoading });
  }, [notification]);

  //This is the loading screen
  if (loading) {
    return (
      <>
        <div
          style={{
            height: "75%",
            width: "95%",
            color: "black",
            fontSize: "2em",
            borderRadius: "30px",
            background: "rgba(255,255,255,0.5)",
            transition: "1s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          Loading
        </div>
      </>
    );
  }

  //This function using changes the status of by changing a boolean value
  const checkDone = async (id: string, task: string, done: boolean) => {
    var data = { id: id, Task: task, Done: true };

    if (done) {
      data = { id: id, Task: task, Done: false };
      setNotify("DONE");
    }

    if (!done) {
      data = { id: id, Task: task, Done: true };
      setNotify("UNDO");
    }

    ChangeStatus(data);

    setDoneClick(false);
  };

  return (
    <div className="Display">
      <div className="Display_Sub">
        {apiData
          .filter((item: any) => {
            if (search) {
              return search.toLowerCase() == "" ? (
                item
              ) : item.Task.toLowerCase().includes(search).length != 0 ? (
                item.Task.toLowerCase().includes(search)
              ) : (
                <>
                  <div
                    style={{
                      height: "75%",
                      width: "95%",
                      color: "black",
                      fontSize: "2em",
                      borderRadius: "30px",
                      background: "rgba(255,255,255,0.5)",
                      transition: "1s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    No Data here
                  </div>
                </>
              );
            }

            return item;
          })
          .map((e: APIDATA) => {
            return (
              <div key={e.id} className="Cards" data-testid="check">
                <div className="cardText">
                  <div className="cardText_Sub">
                    {!edit.ifClicked ? (
                      <p
                        style={
                          e.Done
                            ? { textDecoration: "line-through" }
                            : { color: "black" }
                        }
                      >
                        {e.Task}
                      </p>
                    ) : edit.currentVal == e.Task ? (
                      <textarea
                        rows={4}
                        data-testid="editingText"
                        style={{
                          width: "100%",
                          border: "none",
                          background: "white",
                          color: "black",
                          outline: "none",
                        }}
                        value={editText.Task}
                        onChange={(e: any) => {
                          setEditText({ ...editText, Task: e.target.value });
                        }}
                      />
                    ) : (
                      <p
                        style={
                          e.Done
                            ? { textDecoration: "line-through" }
                            : { color: "black" }
                        }
                      >
                        {e.Task}
                      </p>
                    )}
                  </div>
                </div>
                <div className="cardButtons">
                  <div className="cardButton_Sub">
                    <div className="sub_Button">
                      {!edit.ifClicked ? (
                        <>
                          <button
                            data-testid="EditButton"
                            style={{
                              height: "40px",
                              width: "40px",
                              background: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                            disabled={e.Done ? true : false}
                            onClick={() => {
                              setEdit({ currentVal: e.Task, ifClicked: true });
                              setEditText({
                                id: e.id,
                                Task: e.Task,
                                Done: e.Done,
                              });
                            }}
                          >
                            <img src={Edit} style={{ width: "10px" }} />
                          </button>
                          <button
                            data-testid="DeleteButton"
                            style={{
                              height: "40px",
                              width: "40px",
                              background: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                            onClick={() => {
                              DeleteData(e.id);
                              setNotify("DELETE");
                              setChange();
                              setApiData([]);
                            }}
                          >
                            <img
                              style={{ width: "10px" }}
                              src={Delete}
                              alt=""
                            />
                          </button>
                        </>
                      ) : edit.currentVal == e.Task ? (
                        <>
                          <button
                            name="Y"
                            data-testid="editingChoice"
                            style={{
                              height: "40px",
                              width: "40px",
                              background: "#76c893",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                            onClick={() => {
                              setEdit({ currentVal: "", ifClicked: false });
                              EditData(e.id, editText);
                              setChange();
                              setNotify("EDIT");
                              setApiData([]);
                            }}
                          >
                            <img src={Correct} style={{ width: "10px" }} />
                          </button>
                          <button
                            name="N"
                            style={{
                              height: "40px",
                              width: "40px",
                              background: "#ff0054",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                            onClick={() => {
                              setEdit({ currentVal: "", ifClicked: false });
                            }}
                          >
                            <img src={Cross} style={{ width: "10px" }} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={{
                              height: "40px",
                              width: "40px",
                              background: "rgba(0,0,0,0.2)",
                              opacity: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                            data-testid="EditButton"
                            // onClick={() => {
                            //   setEdit({ currentVal: e.Task, ifClicked: true });
                            // }}
                          >
                            <img style={{ width: "10px" }} src={Edit} alt="" />
                          </button>
                          <button
                            style={{
                              height: "40px",
                              width: "40px",
                              background: "rgba(0,0,0,0.2)",
                              opacity: 0.5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 0,
                            }}
                          >
                            <img
                              style={{ width: "10px" }}
                              src={Delete}
                              alt=""
                            />
                          </button>
                        </>
                      )}
                    </div>
                    <div className="DoneButton">
                      <button
                        style={edit.ifClicked ? { opacity: "50%" } : {}}
                        disabled={edit.ifClicked ? true : false}
                        onClick={() => {
                          checkDone(e.id, e.Task, e.Done);
                        }}
                      >
                        {e.Done ? "UNDO" : "DONE"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </div>
  );
}

export default Display;
