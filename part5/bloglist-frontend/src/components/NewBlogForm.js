const NewBlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, handleNewBlog }) => {
    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={handleNewBlog}>
                <div>
                    <input placeholder="Title" type="text" value={title} name="title" onChange={({ target }) => { setTitle(target.value) }} />
                </div>
                <div>
                    <input placeholder="Author" type="text" value={author} name="author" onChange={({ target }) => { setAuthor(target.value) }} />
                </div>
                <div>
                    <input placeholder="URL" type="text" value={url} name="url" onChange={({ target }) => { setUrl(target.value) }} />
                </div>
                <button type="submit">Create New Blog</button>
            </form>
        </div>
    )
}

export default NewBlogForm