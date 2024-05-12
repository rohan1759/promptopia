"use client"

import React, { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const handleSearchChange = (e) => {
    const value = e.target ? e.target.value : e.detail.tag.toLowerCase();
    setSearchText(value.toLowerCase());

    const filtered = allPosts.filter(post => {
      return post.tag.toLowerCase().includes(value.replace(" ", "")) || post.creator.username.toLowerCase().includes(value.replace(" ", ""));
    });

    setFilteredPosts(filtered);
  }

  const handleTagClick = (tagvalue) => {
    const event = new CustomEvent('tagClicked', { detail: { tag: tagvalue } });
    handleSearchChange(event);
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
    const fetchData = async () => {
      try {
        const response = await fetch("api/prompt");
        const data = await response.json();
        setAllPosts(data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

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

      {loading ? (
        <p className='feed'>Loading...</p> // Render loading indicator while fetching data
      ) : (
        <PromptCardList
          data={searchText ? filteredPosts : allPosts}
          handleTagClick={handleTagClick}
        />
      )}

    </section>
  )
}

export default Feed;
