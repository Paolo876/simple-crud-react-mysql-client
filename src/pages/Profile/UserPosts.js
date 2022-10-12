import React, { useState, useEffect } from 'react'
import "./UserPosts.scss";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PostsList from './PostsList';

const sortOptions = [
  { value: 'recent', name: "Most Recent"},
  { value: 'popular', name: "Most Popular"},
];

const filterOptions = [
  { value: 'all', name: "All"},
  { value: 'public', name: "Public"},
  { value: 'private', name: "Private"},
];

export default function UserPosts({ posts }) {
  const [ sort, setSort ] = useState(sortOptions[0])
  const [ filter, setFilter ] = useState(filterOptions[0])
  const [ showSortSelector, setShowSortSelector ] = useState(false);
  const [ showFilterSelector, setShowFilterSelector ] = useState(false);
  const [ updatedPosts, setUpdatedPosts ] = useState(posts);

  const hideSelectors = () => {
    setShowFilterSelector(false)
    setShowSortSelector(false)
  }

  const changeSelector = (selector, option) => {
    if(selector === "sort") setSort(option);
    if(selector === "filter") setFilter(option);
    hideSelectors();
  }
  useEffect(() => {
    console.log(sort.value, filter.value)
  }, [sort, filter]);

  return (
    <div className='user-posts'>

      {(showSortSelector || showFilterSelector) && <div className="backdrop" onClick={hideSelectors}></div>}
      <div className="posts-actions">
        <div className="item sort">
          <span onClick={() => setShowSortSelector(true)}>Sort: <p className='value'>{sort.name}</p> <KeyboardArrowDownIcon className={`${showSortSelector ? 'active' : ''}`}/></span>
          {showSortSelector && <ul>
            {sortOptions.map(item => <li key={item.value} className="list-item" onClick={() => changeSelector("sort", item)} >{item.name}</li>)}
          </ul>} 
        </div>
        <div className="item filter">
          <span onClick={() => setShowFilterSelector(true)}>Filter: <p className='value'>{filter.name}</p> <KeyboardArrowDownIcon className={`${showFilterSelector ? 'active' : ''}`}/></span>
          {showFilterSelector && <ul>
            {filterOptions.map(item => <li key={item.value} className="list-item"  onClick={() => changeSelector("filter", item)}>{item.name}</li>)}
          </ul>} 
        </div>
      </div>
      <PostsList posts={updatedPosts}/>
    </div>
  )
}
