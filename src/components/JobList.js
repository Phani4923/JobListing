import React, { useState } from 'react';
import '../styles/joblist.css';
import JobListItem from './JobListItem';
import data from '../utils/data.json';

export default function JobList() {
  const [joblistdata,setJoblistdata] = useState(data);

  function filterByTags(filter) {
    setJoblistdata(data.filter((item) => {
      switch(filter.key){
        case 'role':
          if(item.role === filter.value)
            return true;
          break;
        case 'level':
          if(item.level === filter.value)
            return true;
          break;
        case 'language':
          for(let i=0;i<item.languages.length;i++){
            if(item.languages[i] === filter.value){
              return true;
            }
            else{
              continue;
            }
          }
          break;
      }
    }))
  }

  return (
    <div 
      className='joblist'
    >
      <img 
        alt='bgimage'
        style={{width:'100%'}}
        src={'./images/bg-header-desktop.svg'}
      />
      {joblistdata.map((item) => 
        <JobListItem
          key={item.id}
          item={item}
          filter={filterByTags}
        />
      )}
    </div>
  )
}