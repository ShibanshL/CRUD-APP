import {rest} from 'msw'

export const handlers = [
    rest.get('http://localhost:3031/posts',(req,res,ctx)=>{
        return res(
            ctx.status(200),
            ctx.json([
                {
                    "id": "544264",
                    "Task": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, reprehenderit asperiores aliquid itaque cumque qui distinctio voluptas praesentium dignissimos explicabo quidem officiis fugiat sit inventore autem aliquam accusamus minima, tenetur voluptatum maiores amet voluptate molestiae. Ab ducimus dolorem esse odio!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, reprehenderit asperiores aliquid itaque cumque qui distinctio voluptas praesentium dignissimos explicabo quidem officiis fugiat sit inventore aut hhem aliquam accusamus minima, tenetur voluptatum maiores amet voluptate molestiae. Ab ducimus dolorem esse odio!Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad, reprehenderit asperiores aliquid itaque cumque qui distinctio voluptas praesentium dignissimos explicabo quidem officiis fugiat sit inventore autem aliquam accusamus minima, tenetur voluptatum maiores amet voluptate molestiae. Ab ducimus dolorem esse odio!",
                    "Done": false
                },
                {
                    "id": "861779",
                    "Task": "i hate this 78 43 llol",
                    "Done": true
                },
                {
                    "id": "284527",
                    "Task": "i hate this1 79 koko",
                    "Done": false
                },
                {
                    "id": "619025",
                    "Task": "i hate this1 test is tets",
                    "Done": false
                },
                {
                    "id": "839097",
                    "Task": "jkjda",
                    "Done": false
                },
                {
                    "id": "971398",
                    "Task": "sasuke Uchiha is",
                    "Done": false
                },
                {
                    "id": "887613",
                    "Task": "Golden State warrior can actually be better than what they are now!!",
                    "Done": true
                },
                {
                    "id": "360463",
                    "Task": "This is a test Task i have made",
                    "Done": false
                },
                {
                    "id": "104549",
                    "Task": "jjjdgh",
                    "Done": true
                },
            ])
        )
    }),

    rest.post('http://localhost:3031/posts',(req,res,ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "id": "307992",
                "Task": "This is just a test",
                "Done": false
            })

        )
    }),

    rest.put('http://localhost:3031/posts/624424',(req,res,ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                 "id": "624424",
                "Task": "testing for checking to see if this works.",
                "Done": false
            })

        )
    }),

    rest.delete('http://localhost:3031/posts/624424',(req,res,ctx) => {
         return res(
            ctx.status(200),
            ctx.json({})
        )
    })
]