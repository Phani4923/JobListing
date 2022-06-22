import React from 'react'
import '../styles/joblistitem.css'

export default function JobListItem(props) {

  const {item} = props;

  return (
    <div 
      className='joblistitem'
      style={item.featured?{'borderLeft': '7px solid rgb(100, 161, 158)'}:{}}
    >
        <div className='details'>
          <img 
            className='logo'
            src ={item.logo} 
            alt={item.company}
          />
          <div className='company-details'>
            <div className='companyName-and-tags'>
              <span className='companyName'>
                {item.company}
              </span>
              {item.new && <span className='newsTag'>NEW!</span>}
              {item.featured && <span className='featureTag'>FEATURED</span>}
            </div>
            <div className='position'>
              <span>{item.position}</span>
            </div>
            <div className='additionalDetails'>
              <span>{item.postedAt}</span>
              <span className='dot'></span>
              <span>{item.contract}</span>
              <span className='dot'></span>
              <span>{item.location}</span>
            </div>
          </div>
        </div>
        <div className='languages'>
          <span 
            className='language'
            onClick={() => { props.filter({key:'role', value:item.role})}}
          >{ item.role }</span>
          <span 
            className='language'
            onClick={() => { props.filter({key:'level', value:item.level})}}
          >{ item.level }</span>
          {item.languages.map((language,index) => 
            <span 
              key={index}
              className="language" 
              onClick={() => { props.filter({key:'language',value:language})}}
            >{language}</span>
          )}
        </div> 
    </div>
  )
}
