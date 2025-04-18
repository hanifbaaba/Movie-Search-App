import { useEffect, useState } from "react";
export default function SearchPage() {
  const [search, setSearch] = useState();


 async function getMovieData(){
useEffect(()=>{
await fetch("")
},[])
  }
  return (
    <div>
      <input type="search" placeholder="Search For Movies" />
      <button>Search</button>
    </div>
  );
}
