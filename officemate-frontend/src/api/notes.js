import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL;

/*=== GET ALL NOTES === */
export function getAllNotes() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);

  async function getData(username) {
    const fullURL = `${BASE_URL}/notes/all/${username}`;
    const token = localStorage.getItem("token");
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      console.log("api error:", json);
      setError(json);
    }
    if (res.ok) {
      setData(json);
      setIsLoading(false);
    }
  }

  return { getData, data, isLoading, error };
}

/*=== NEW NOTE === */
export function newNote() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  async function postData(username, body) {
    setIsLoading(true);
    const fullURL = `${BASE_URL}/notes/create/${username}`;
    const token = localStorage.getItem("token");

    const res = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json);
    }
    if (res.ok) {
      console.log("Data is created");
      setResponse(json);
      setIsLoading(false);
    }
  }

  return { postData, response, isLoading, error };
}

/*=== DELETE NOTE === */
export function deleteNote() {
  const [deleteError, setDeleteError] = useState(null);
  const [isdeleteLoading, setDeleteIsLoading] = useState(null);
  const [dataDeleted, setDataDeleted] = useState(null);

  async function deleteData(username, noteid) {
    setDeleteIsLoading(true);
    const fullURL = `${BASE_URL}/notes/${username}?noteid=${noteid}`;
    const token = localStorage.getItem("token");

    const res = await fetch(fullURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      console.log("trip delete error:", json);
      setDeleteError(json.error);
    }
    if (res.ok) {
      setDataDeleted(json);
      setDeleteIsLoading(false);
    }
  }

  return { deleteData, dataDeleted, isdeleteLoading, deleteError };
}

/*=== DELETE NOTE === */
export function getOneNote() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({});

  async function getOneData(username, noteid) {
    const fullURL = `${BASE_URL}/notes/one/${username}?noteid=${noteid}`;

    const token = localStorage.getItem("token");
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json);
    }
    if (res.ok) {
      setData(json);
      setIsLoading(false);
    }
  }

  return { getOneData, data, isLoading, error };
}

/*=== UPDATE ONE NOTE === */
export function updateOneNote() {
  //
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState({});

  async function updateOneData(username, noteid, body) {
    const fullURL = `${BASE_URL}/notes/${username}?noteid=${noteid}`;

    const token = localStorage.getItem("token");
    setIsLoading(true);

    const res = await fetch(fullURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      setIsLoading(false);
    }
  }

  return { updateOneData, data, isLoading, error };
}

/*=== ADD NEW EVENT === */
export function newEvent(eventData) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [response, setResponse] = useState(null);

  async function postData(username, body) {
    setIsLoading(true);
    const fullURL = `${BASE_URL}/events/${username}`;
    const token = localStorage.getItem("token");

    const res = await fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json);
    }
    if (res.ok) {
      setResponse(json);
      setIsLoading(false);
    }
  }

  return { postData, response, isLoading, error };
}