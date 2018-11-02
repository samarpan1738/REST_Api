                        let todos=[]
                        let users=[]
                        let posts=[]
                        let comments=[]
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

                        function getComments(){

                            $.getJSON(`https://jsonplaceholder.typicode.com/comments`,(data)=>{
                                localStorage['comments']=JSON.stringify(data)
                            })

                        }

                        function refreshUsers(users){$('#row-users').html("");
                            //if( ($('#row-users').text() ).trim().length == 0 )
                            //{
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

                            //if( ( $('#col-todos').text() ).trim().length === 0 ||  $('#col-todos').children().length===20)
                            //{
                            //$( "#col-todos" ).empty();
                            todos.forEach((todo) =>{
                            $('#col-todos').append(
                                `
                                        <div class="row list-group-item m-2">
                                            
                                            <span class="col-3"><input class="btn btn-primary" type="checkbox" ${todo.completed?'checked':''}></span>
                                            <span class="col ${todo.completed?'completed-task':''}">${todo.title}</span>
                                        </div>
                                `
                            )
                        })//} 
                        if(filterUserid)
                        {
                            todos=JSON.parse(localStorage['todos'])
                        }
                        }

                        function showCommentsofPost(postid)
                        {
                            comments=JSON.parse(localStorage['comments'])
                                comments=comments.filter((comment)=>(comment.postId === postid))
                                console.log(comments)
                                comments.forEach((comment)=>{
                                    $(`#container-${postid}`).append(
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

                        function refreshPosts(posts){
                            getComments()
                            if($('#col-posts').text().trim().length === 0)
                            {
                            posts.forEach((post) =>{
                            $('#col-posts').append(
                                `<div class="row list-group-item m-2">
                                <h3>${post.title}</h3>
                                <div>${post.body}</div><br>
                                <a  class="card-link btn btn-primary" onclick="toggle(${post.id})">Comments</a>
                                
                                <div class="container p-2 hide" id="container-${post.id}"></div>
                                `
                            )
                            showCommentsofPost(post.id)
                                
                            })
                            }
                            }
                        function toggle(id)
                        {
                            $(`#container-${id}`).toggle();
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
                                
                            })

                            $('#tab-posts').click(()=>{
                                toggleActive('posts')
                                getComments()
                                getPosts(refreshPosts)    
                            })

                            $('#tab-todos').click(()=>{
                                toggleActive('todos')
                                getTodos(refreshTodos)
                            })
                        })
