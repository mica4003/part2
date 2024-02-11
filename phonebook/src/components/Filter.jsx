import React from "react"
const Filter = ({filterName})=>{
    return (
      <div>
        Filter Shown with <input onChange={filterName} name="filter" />
      </div>
    )
}

export default Filter