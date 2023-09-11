# seesaw


# How it's made:

Tech used: HTML (Embedded JavaScript), Tailwind, JavaScript, Express.js, Node.js, Passport.js Mongoose, MongoDB, Cloudinary

Seesaw is a social media platform that you can use to share your journeys with the rest of the world through photos and stories. Your explore page will have posts from everybody around the world. You can see what they already saw, just like they can see what you already saw. You can like somebody's post and use their photo or story for inspiration for your next trip. Others can also like your posts and use your photos or stories for inspiration for their next trip.

The frontend of this application was developed using HTML, Tailwind, and JavaScript. Embedded JavaScript was used to define HTML structures and pass data to render a fully functional site. The backend was made with Express.js and Node.js. MongoDB was used as the database system to store and manage the photo album data. Mongoose was also used to help bridge the communication gap between the Node.js application and the MongoDB database. Passport.js was used for the authentication process in which users would be able to create their own accounts. Cloudinary was used to store all photos that were uploaded into a database. All of this was organized in a Model, View, Controller architecture.


# Lessons Learned:

This is my second project using the majority of these technologies with a couple new ones. I decided to give Tailwind a try to see if it could help with the efficiency of styling a website. I really appreciated the flexibility and usability that Tailwind provides. It was really simple to add the built-in classes while also keeping my code relatively dry. The one thing that took some time to get used to was the readability of the HTML code as it looked rather cluttered with so many classes on multiple lines, making the code look way bigger than it seemed. However, when compared to traditional CSS, I find Tailwind to be a bit easier to work with in general. In terms of the backend, I found that the logic was relatively similar to my previous project but I felt that it was much needed practice to help solidify what I've been learning. Unlike in my previous project, I included a 'Like' button this time, which helped me learn more about updating a particular condition that was already set. Since I wanted this to involve uploading user photos instead of accessing photos from an API call like in the previous project, I decided to incorporate Cloudinary along with MongoDB to see how they work together. Because Cloudinary is mostly focused on photo storage, it was easier to compartmentalize the purposes between the two databases which helped in terms of organization. 

