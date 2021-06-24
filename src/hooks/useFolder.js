import { useEffect, useReducer } from "react";
import { database } from "../lib/firebase";
import { useAuth } from "../context/authContext";
import { ACTIONS, ROOT_FOLDER } from "../constants";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    default:
      return state;
  }
};

export function useFolder(folderId = null, folder = null) {
  const initialState = {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    currentUser: { uid: userId },
  } = useAuth();

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folder, folderId]);

  useEffect(() => {
    if (folderId === null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const listener = database.folders
      .where("parentId", "==", folderId)
      .where("userId", "==", userId)
      // .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const childFolders = snapshot.docs.map(database.formatDoc);
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders },
        });
      });

    return () => listener();
  }, [folderId, userId]);

  return state;
}
