import axios from "axios";
import { useEffect, useState } from "react";
import setupIndexedDB , { useIndexedDBStore } from "use-indexeddb";

export const useExamDescriptive = () => {
  const idbConfig = {
    databaseName: "exam-db",
    version: 1,
    stores: [
        {
            name: "descriptive",
            id: { keyPath: "id", options: { unique: true } },
            indices: [
                { name: "question_id", keyPath: "question_id", options: { unique: false } },
                { name: "useID_nodeId", keyPath: "useID_nodeId", options: { unique: false } },
                { name: "answer", keyPath: "answer", options: { unique: false } },
                { name: "time", keyPath: "time" },
            ],
        },
    ],
  };
  const [item, setItem] = useState(null);
  const nameTable = 'descriptive'
  const initDb = (version=1)=>{
    idbConfig.version = version
    setupIndexedDB(idbConfig)
    .then(() => console.log("success"))
    .catch(e => console.error("error / unsupported", e));
  }
  const { add } = useIndexedDBStore(nameTable);
  const { getByID } = useIndexedDBStore(nameTable);
  const { deleteByID } = useIndexedDBStore(nameTable);
  const { update } = useIndexedDBStore(nameTable);
  const { getAll } = useIndexedDBStore(nameTable);

  const addItem = async (data) => {
    let id = await add(data);
    let record = await getByID(id);
    setItem(record);
    return record;
  };
  const getItemById = async (id)=>{
    let record = await getByID(id);
    setItem(record);
    return record;
  }
  const updateItem = async (data) => {
    let id = await update(data);
    let record = await getByID(id);
    setItem(record);
  };
  const deleteItemById = async (id) => {
    await deleteByID(id);;
    setItem(null);
  };
  const addOrUpdate=async (data)=>{
    let id = await getByID(data?.id)
    if(id){
      await updateItem(data)
    }
    else{
      await addItem(data)
    }
  }
  const getAllItem = async () => {
    let record = await getAll();;
    setItem(record);
    return record;
  };
  return { 
    item,
    initDb,
    addItem,
    getItemById,
    updateItem,
    deleteItemById,
    addOrUpdate,
    getAllItem
  };
};