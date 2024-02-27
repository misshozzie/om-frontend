import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;


/* === CREATE TASK === */
export async function newTask(formData, noteid) {
  const noteID = noteid;
  const fullURL = `${BASE_URL}/Notes/AddTask/${noteID}`;
  const token = localStorage.getItem("token");

  const sendData = {
    header: formData.header,
    description: formData.description,
    noteID: noteID, //---
  };

  const res = await fetch(fullURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(sendData),
  });

  const json = await res.json();

  if (!res.ok) {
    return { error: json.error };
  }
  return { error: null };
}

/* === UPDATE TASK === */
export async function updateTasks(formData, taskid) {
  const taskID = taskid;
  const fullURL = `${BASE_URL}/task/${taskID}`;
  const token = localStorage.getItem("token");

  const sendData = {
    header: formData.header,
    description: formData.description,
  };

  const res = await fetch(fullURL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify(sendData),
  });

  const json = await res.json();

  if (!res.ok) {
    return { error: json.error };
  }
  return { error: null };
}

/* === SHOW TASKS === */
export async function showTasks(noteid) {
  const noteID = noteid;
  const fullURL = `${BASE_URL}/task/${noteID}`;
  const token = localStorage.getItem("token");

  const res = await fetch(fullURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
  
    },
  });

  const json = await res.json();
  const jsonArray = Object.values(json);

  if (!res.ok) {
    return { error: json, data: null };
  }

  return { error: null, data: jsonArray };
}

/* === DELETE TASK === */
export async function deleteTask(noteid, taskid) {
  const fullURL = `${BASE_URL}/tasks/${noteid}`;
  const token = localStorage.getItem("token");

  const res = await fetch(fullURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },
    body: JSON.stringify({ taskid: taskid }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error);
  }

  return json;
}

