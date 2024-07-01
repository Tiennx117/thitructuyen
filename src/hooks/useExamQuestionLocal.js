import axios from "axios";
import { useEffect, useState } from "react";

export const useExamQuestionLocal = () => {
  const createItemDataLocal=(useID,NodeId)=>{
    localStorage.setItem(useID+ '_' + NodeId , JSON.stringify([]))
  }
  const getallItemDataLocal=(useID,NodeId)=>{
    let data =  JSON.parse(localStorage.getItem(useID+ '_' + NodeId))
    return data
  }
  const getIdItemDataLocal=(useID,NodeId,questionId)=>{
    let data =  JSON.parse(localStorage.getItem(useID+ '_' + NodeId))
    for(let i=0; i<data?.length;i++){
        if(data[i].quetion_id==questionId){
            return data[i]
        }
    }
  }
  const updateItemDataLocal=(useID,NodeId,data)=>{
    localStorage.setItem(useID+ '_' + NodeId,JSON.stringify(data))
  }
  const deleteItemDataLocal=(useID,NodeId)=>{
    localStorage.removeItem(useID+ '_' + NodeId)
  }
  return { 
    createItemDataLocal,
    getallItemDataLocal,
    updateItemDataLocal,
    deleteItemDataLocal,
    getIdItemDataLocal
  };
};