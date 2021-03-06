import React, { useState, useMemo } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyModal from "./components/UI/MyModal/MyModal";
import "./styles/App.css";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'aaa', body: 'xxx'},
        {id: 2, title: 'ppp', body: 'ttt'},
        {id: 3, title: 'ccc', body: 'yyy'},
    ])

    const [filter, setFilter] = useState({
        sort: '',
        query: '',
    })

    const [modal, setModal] = useState(false);

    const sortedPosts = useMemo( () => {
        console.log('функция "sortedPosts" отработала')
        if(filter.sort) {
            return [...posts].sort( (a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])
    
    const createPost = newPost => {
        setPosts([
            ...posts,
            newPost,
        ])
        setModal(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton 
                style={{marginTop: 30}}
                onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal 
                visible={modal}
                setVisible={setModal}
                >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}} />
            <PostFilter 
                filter={filter}
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов"/>
        </div>
    );
}

export default App;
