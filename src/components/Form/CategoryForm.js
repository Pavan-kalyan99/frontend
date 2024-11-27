import React from 'react'

const CategoryForm = ({submitHand,value,setValue}) => {
    
  return (
    <>
<form onSubmit={submitHand}>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='enter new category' value={value} onChange={(e)=>setValue(e.target.value)} />
  </div>


  <button type="submit" className="btn btn-primary">Submit</button>
</form>


      
    </>
  )
}

export default CategoryForm