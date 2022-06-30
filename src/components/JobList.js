import React, { useEffect, useState } from 'react';
import '../styles/joblist.css';
import JobListItem from './JobListItem';
import data from '../utils/data.json';
import Filter from './Filter';

export default function JobList() {
  const [joblistdata,setJoblistdata] = useState(data);
  const [filters,setFilters] = useState([])
  const [windowWidth,setWindowWidth] = useState()
  const imageUrl = windowWidth >600?'./images/bg-header-desktop.svg':'./images/bg-header-mobile.svg'

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {            
      window.removeEventListener('resize', handleWindowResize);      
    }  
  },[]);

  function clearFilters(){
    setFilters([]);
    setJoblistdata(data);
  }

  function addFilter(filter){
    setFilters(() => {
      let temp = filters;
      let found = false
      temp.forEach((data) => {
        if(data.value === filter.value){
          found = true
        }
      })
      if(!found){
        temp.push(filter)
      }
      return [...temp]
    })
  }
  
  function filterItems(){
    setJoblistdata(data.filter((item) => {
      let filterCount = 0;      
      filters.forEach((filter) => {
        switch(filter.key){
          case 'role':
            if(item.role === filter.value)
              filterCount = filterCount + 1;
            break;
          case 'level':
            if(item.level === filter.value)
              filterCount = filterCount + 1;
            break;
          case 'language':
            for(let i=0;i<item.languages.length;i++){
              if(item.languages[i] === filter.value){
                filterCount = filterCount + 1;
              }
              else{
                continue;
              }
            }
            break;
        }
      })
      return filterCount === filters.length?true:false;
    }))
  }

  async function filterByTags(filter) {
    await addFilter(filter)
    filterItems()
  }

  async function removeFilter(filter){ 
    filters.splice(filters.findIndex((data) => data.value === filter.value),1)
    await setFilters([...filters]);
    filterItems()
  }

  return (
    <>
      <img 
        alt='bgimage'
        style={{width:'100%',height:'140px'}}
        src={imageUrl}
      />
      <div 
        className='joblist'
      >
        {filters.length>0 ? 
          <Filter
            filters={filters}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
          />
          :
          <span style={{marginTop:'4.5rem'}}></span>
        }
        {joblistdata.map((item) => 
          <JobListItem
            key={item.id}
            item={item}
            filter={filterByTags}
          />
        )}
      </div>
    </>
  )
}