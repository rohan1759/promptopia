"use client";

import PromptCard from '@components/PromptCard'
import { useState, useEffect } from 'react';

const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])

  const handleSearchChange = (e) => {
    const value = e.target ? e.target.value : e.detail.tag.toLowerCase();
    setSearchText(value.toLowerCase());

    // Filter posts based on search text
    const filtered = allPosts.filter(post => {
      // Check if post tags or username match the search text
      return post.tag.toLowerCase().includes(value.replace(" ", "")) || post.creator.username.toLowerCase().includes(value.replace(" ", ""));
    });

    setFilteredPosts(filtered);
  }

  const handleTagClick = (tagvalue) => {
    const event = new CustomEvent('tagClicked', { detail: { tag: tagvalue } })
    handleSearchChange(event)
  }
  
  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className='mt-16 prompt_layout'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))}
      </div>
    )
  }

  useEffect(() => {
    (async () => {
      const response = await fetch("api/prompt")
      const data = await response.json()
      setAllPosts(data)
    })()
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          id='inputField'
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
          required
        />
      </form>

      <PromptCardList
        data={searchText ? filteredPosts : allPosts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed