import React from "react";
import { useNotification } from "../API_MNAGE";

interface DataFun {
  setApiData: (e: any) => void;
  setLoading: (e: boolean) => void;
}

//This function fetches the Data
const FetchData = async ({ setApiData, setLoading }: DataFun) => {
  setLoading(true);
  var url = "http://localhost:3031/posts";
  var res = await fetch(url);
  var data = await res.json();
  const filter = data.filter((val: any) => val.Task != "");
  setApiData(filter);
  setLoading(false);
};

const ChangeStatus = async (data: {
  id: string;
  Task: string;
  Done: boolean;
}) => {
  await fetch(`http://localhost:3031/posts/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
};

//This Posts the data into server
const AddData = async (e: any) => {
  await fetch("http://localhost:3031/posts/", {
    method: "POST",
    body: JSON.stringify(e),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
};

//this Puts the edited data in the server
const EditData = async (id: string, data: any) => {
  await fetch(`http://localhost:3031/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
};

//this Deletes the selected data in the server
const DeleteData = async (e: string) => {
  await fetch(`http://localhost:3031/posts/${e}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
  });
};

export { AddData, DeleteData, EditData, FetchData, ChangeStatus };
