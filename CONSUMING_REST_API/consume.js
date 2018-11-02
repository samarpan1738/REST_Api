                        let todos=[]
                        let users=[]
                        let posts=[]
                        let comments=[]
                        let albums=[]
                        let photos=[]
 

                        function getUsers(done){
                            if(localStorage['users'])
                                users=JSON.parse(localStorage['users'])

                            if(users && users.length>0)
                                return done(users) 

                            $.getJSON('http://jsonplaceholder.typicode.com/users',(data)=>{
                                localStorage['users']=JSON.stringify(data)
                                    done(data)
                            })
                        }

                        function getTodos(done){
                            if(localStorage['todos'])
                                todos=JSON.parse(localStorage['todos'])

                            if(todos && todos.length>0)
                                return done(todos)
                            
                            $.getJSON('http://jsonplaceholder.typicode.com/todos',(data)=>{
                                localStorage['todos']=JSON.stringify(data)
                                    done(data)
                            })
                        }
                        
                        function getPosts(done){
                            if(localStorage['posts'])
                                posts=JSON.parse(localStorage['posts'])

                            if(posts && posts.length>0)
                                return done(posts)
                                
                            $.getJSON('https://jsonplaceholder.typicode.com/posts',(data)=>{
                                localStorage['posts']=JSON.stringify(data)
                                    done(data)
                            })
                        }

                        function getComments(done,id){
                            if(localStorage['comments'])
                                comments=JSON.parse(localStorage['comments'])

                            if(comments && comments.length>0)
                                return done(comments,id)

                            $.getJSON(`https://jsonplaceholder.typicode.com/comments`,(data)=>{
                                localStorage['comments']=JSON.stringify(data)
                                done(data,id)
                            })

                        }

                        function getAlbums(done)
                        {
                            if(localStorage['albums'])
                                albums=JSON.parse(localStorage['albums'])
                            if(albums && albums.length>0)
                                return done(albums)
                            
                            $.getJSON('https://jsonplaceholder.typicode.com/albums',(data)=>
                                {
                                    localStorage['albums']=JSON.stringify(data)
                                    done(data)
                                })
                        }

                        function getPhotos(done,id)
                        {
                            if(localStorage['photos'])
                                photos=JSON.parse(localStorage['photos'])
                            if(photos && photos.length>0)
                                return done(photos,id)
                            
                            $.getJSON(`https://jsonplaceholder.typicode.com/photos`,(data)=>
                                {
                                    localStorage['photos']=JSON.stringify(data)
                                    done(data,id)
                                })

                        }

                        

                        function refreshUsers(users){
                            $('#row-users').html("");
                            users.forEach((user) =>{
                            $('#row-users').append(
                                `
                                <div class="col-xm-12 col-sm-6 col-md-4">
                                        <div class="card p-1 m-1">
                                            <div class="card-body">
                                                <h5 class="card-title">${user.name}</h5>
                                                <h6 class="card-subtitle">${user.email}</h6>
                                                <p class="card-text">
                                                    ${user.address.street}<br>
                                                    ${user.address.suite}<br>
                                                    ${user.address.city}<br>
                                                    ${user.address.zipcode}<br>
                                                </p>
                                                <a onclick="showTodosofUser(${user.id})" href=# class="card-link btn btn-primary">Todos</a>
                                            </div>
                                        </div>
                                </div>
                            `)
                        })//}
                        }

                        function showTodosofUser(userid)
                        {
                            toggleActive('todos')
                            refreshTodos(JSON.parse(localStorage['todos']),userid)
                        }

                        function refreshTodos(todos,filterUserid){$('#col-todos').html("");
                            
                            if(filterUserid)
                            {
                            todos=todos.filter((todo)=>(todo.userId === filterUserid))
                            //$( "#col-todos" ).empty();
                            
                            }

                            
                            todos.forEach((todo) =>{
                            $('#col-todos').append(
                                `
                                        <div class="row list-group-item m-2">
                                            
                                            <span class="col-3"><input class="btn btn-primary" type="checkbox" ${todo.completed?'checked':''}></span>
                                            <span class="col ${todo.completed?'completed-task':''}">${todo.title}</span>
                                        </div>
                                `
                            )
                        })
                        if(filterUserid)
                        {
                            todos=JSON.parse(localStorage['todos'])
                        }
                        }

                        function showCommentsofPost(comments,postid)
                        {
                                comments=comments.filter((comment)=>(comment.postId === postid))
                                comments.forEach((comment)=>{
                                    $(`#container-${postid}-comments`).append(
                                        `
                                        
                                        <div class="row">
                                        <div class="col"></div>
                                        <div class="col-md-10 col-xm-12">
                                        <div class="card p-1 m-1">
                                            <div class="card-body">
                                                <h5 class="card-title"><b>${comment.name}</b></h5><br>
                                                <h6 class="card-subtitle">${comment.email}</h6><br>
                                                <p class="card-text">
                                                    ${comment.body}<br>
                                                </p>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="col"></div>
                                        </div>

                                        `
                                    )
                                })
                        }

                        function refreshPosts(posts)
                        {
                            
                            if($('#col-posts').text().trim().length === 0)
                            {
                                posts.forEach((post) =>{
                                    $('#col-posts').append(
                                        `<div class="row list-group-item m-2">
                                        <h3>${post.title}</h3>
                                        <div>${post.body}</div><br>
                                        <a  class="card-link btn btn-primary" onclick="toggle(${post.id},'comments')">Comments</a>
                                        
                                        <div class="container p-2 hide" id="container-${post.id}-comments"></div>
                                        `
                                    )
                                    getComments(showCommentsofPost,post.id)
                                })
                            }
                        }
                        function toggle(id,field)
                        {
                            $(`#container-${id}-${field}`).toggle();
                        }

                        function refreshAlbums(albums)
                        {
                            if($('#col-albums').text().trim().length === 0)
                            albums.forEach((album)=>
                                {
                                    $('#col-albums').append(
                                        `
                                        <div class="row list-group-item m-2">
                                        <h3>${album.title}</h3>
                                        <a  class="card-link btn btn-primary" onclick="toggle(${album.id},'photos')">Photos</a>
                                        
                                        <div class="container p-2 hide" id="container-${album.id}-photos">
                                        <div id="photos-${album.id}" class="row"></div>
                                        </div>
                                        `
                                    )    
                                    getPhotos(refreshPhotos,album.id) 
                                })
                        }

                        function refreshPhotos(photos,id)
                        {
                            photos=photos.filter((photo)=>(photo.albumId === id))
                    
                                photos.forEach((photo)=>{
                                    $(`#photos-${id}`).append(
                                        `
                                        <div class="col-md-4 col-lg-3 col-xm-12 p-2">
                                        <a href=${photo.url} target="_blank"><img src=${photo.thumbnailUrl}></img></a>
                                        </div>

                                        `
                                    )
                                })
                        }


                        function toggleActive(newActiveTab)
                        {
                            $('.nav > li > a').removeClass('active')
                            $(`#tab-${newActiveTab} > a`).addClass('active')
                            $('.contents').hide()
                            $(`#container-${newActiveTab}`).show()
                        }

                        $(()=>
                        {
                            toggleActive('users')
                            getUsers(refreshUsers)

                            $('#tab-users').click(()=>{
                                toggleActive('users')
                                getUsers(refreshUsers)
                            })

                            $('#tab-albums').click(()=>{
                                toggleActive('albums')
                                getAlbums(refreshAlbums)
                                
                            })

                            $('#tab-posts').click(()=>{
                                toggleActive('posts')
                                getPosts(refreshPosts)    
                            })

                            $('#tab-todos').click(()=>{
                                toggleActive('todos')
                                getTodos(refreshTodos)
                            })
                        })
