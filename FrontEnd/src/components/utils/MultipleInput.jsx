import {
    Chip,
      FormControl,
      Input,
      makeStyles,
  } from "@material-ui/core";
  import React, { useEffect, useState } from "react";

  
  
  export default function MultipleInput({valueSetter, values}) {
      const classes = useStyles();
      const [currValue, setCurrValue] = useState("");
      const handleKeyUp = (e) => {
          if (e.code === "Enter") {
            valueSetter((oldState) => ({...oldState, titulos:[...oldState.titulos, e.target.value]}));
              setCurrValue("");
          }
      };

  
      const handleChange = (e) => {
          setCurrValue(e.target.value);
    };
    
    const handleDelete = ( item, index) =>{
      let arr = [...values]
      arr.splice(index,1)
      valueSetter((oldState) => ({...oldState, titulos:arr}))
    }
  
      return (
          <div className="App">
              <FormControl classes={{ root: classes.formControlRoot }}>
                  <div className={"container"}>
                      {values.map((item,index) => (
                          <Chip  size="small" onDelete={()=>handleDelete(item,index)} label={item}/>
                      ))}
                  </div>
                  <Input
                      value={currValue}
                      onChange={handleChange}
                      onKeyDown={handleKeyUp}
                  />
              </FormControl>
          </div>
      );
  }
  
  const useStyles = makeStyles((theme) => ({
      formControlRoot: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "auto",
          flexWrap: "wrap",
          flexDirection: "row",
          border:'2px solid lightgray',
          padding:4,
          borderRadius:'4px',
          "&> div.container": {
              gap: "6px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap"
          },
          "& > div.container > span": {
              backgroundColor: "gray",
              padding: "1px 3px",
              borderRadius: "4px"
          }
      }
  }));
  