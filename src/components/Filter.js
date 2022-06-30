import React from 'react'
import '../styles/filter.css'

export default function Filter(props) {
    const { filters } = props

  return (
    <div className='filters'>
        <div className='filter'>
            {filters.map((data,index) => {
                return(
                <div 
                    key={index}
                    className='filter-item'
                >
                    <span 
                        className='filter-item-name'
                        >{data.value}</span>
                    <div
                        className='filter-item-remove'
                        onClick={() => props.removeFilter(data)}
                    >
                        <img
                            src='/images/icon-remove.svg'
                        />
                    </div>
                </div>
                )
            })}
        </div>
        <span 
            className='clear'
            onClick={props.clearFilters}
        >Clear</span>
    </div>
  )
}
