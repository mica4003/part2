import React from "react"
const Course = ({course,total}) =>{
    return <>
             <Header name={course.name}/>
             <Content parts={course.parts}/>
             <h5>total of {total} exercises</h5>
           </>
  }
  
  const Header = ({name}) =>{
    return <h1>{name}</h1>
  }
  
  const Content = ({parts}) =>{
    return parts.map((part,id) => {
        return <Part key ={id} name= {part.name} exercises={part.exercises} />})
  }
  
  const Part = ({name,exercises}) =>{
    return <p>{name} {exercises}</p>
  }

  export default Course