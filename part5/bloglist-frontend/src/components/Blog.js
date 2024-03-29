// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>
// )

// export default Blog

import { useState, useEffect } from "react"
import "../style/style.css"
import blogs from "../services/blogs"
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, user, setMessage, setError, updateBlog }) => {
  const [details, setDetails] = useState(false)


  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (user && blog.user.username === user.username) {
      setShowDelete(true)
    }
  })


  const toggleDetails = () => {
    setDetails(!details)
  }

  // const likeBlog = async (event) => {
  //   event.preventDefault()

  //   const updateBlog = {
  //     user: blog.user.id,
  //     likes: blog.likes + 1,
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url
  //   }

  //   try {
  //     await blogs.update(blog.id, updateBlog)
  //     const updatedBlogs = await blogs.getAll()
  //     updatedBlogs.sort((a, b) => b.likes - a.likes)
  //     setBlogs(updatedBlogs)
  //   } catch (e) {
  //     console.error(e)
  //     setMessage('Try again')
  //     setError(true)
  //     setTimeout(() => {
  //       setMessage(null)
  //       setError(false)
  //     }, 5000)
  //   }

  // }



  const deleteBlog = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      return
    }

    if (user && blog.user.username === user.username) {
      try {
        const title = blog.title
        await blogs.deleteBlog(blog.id)
        const updatedBlogs = await blogs.getAll()
        updatedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(updatedBlogs)
        setMessage(`Blog ${title} was deleted successfully`)
        setError(false)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      } catch (e) {
        console.error(e)
        setMessage('Try again')
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      }
    } else {
      setMessage('You can only delete your own blogs')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div className="blog">
      {/* <div className="blog-title">{blog.title}</div> */}
      <div className='blog-title-author'>{blog.title} - {blog.author}<br /></div>

      {
        details
          ?
          <div className="blog-details">
            {/* {blog.author}<br />
            {blog.url}<br /> */}
            {/* {blog.likes}<button onClick={() => {console.log("you liked this")}}>like</button><br/> */}

            {/* {blog.likes}<button className="like-button" onClick={likeBlog}>like</button><br /> */}
            <a id='blog-url' href={blog.url}>{blog.url}</a><br />
            <div id='likes'>{blog.likes}<button className='like-button' onClick={() => updateBlog(blog)}>like</button><br />
            </div>
            {blog.user.username}<br />
            {/* <button className="delete-button" onClick={deleteBlog}>delete</button>
            <br /> */}
            {
              showDelete
                ?
                <div>
                  <button className='delete-button' onClick={deleteBlog}>delete</button>
                  <br />
                </div>
                :
                null
            }
            <button className="toggle-details" onClick={toggleDetails}>hide</button>
          </div>
          :
          <button className="toggle-details" onClick={toggleDetails}>show</button>
      }
    </div>)
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}


export default Blog