# A01 Web scraper


## How to run
1. npm install
2. npm start [url argument]<br>
 
        npm start https://courselab.lnu.se/scraper-site-1
Expected output

    Scraping links...OK
    Scraping available days...OK
    Scraping showtimes...OK
    Scraping possible reservations...OK
    
    Recommendations
    ===============
    * On Friday the movie "Keep Your Seats, Please" starts at 16:00 and there is a free table between 18:00-20:00.
    * On Friday the movie "A Day at the Races" starts at 16:00 and there is a free table between 18:00-20:00.

# Submission

#### QA1.
     On this web scraper, a three-tier architecture has been introduced. Applications are organized into three logical
      and physical computing tires using the three-tier architecture. The Presentation tier, also known as "the UI," 
      is the implementation tier, which stores and manages the data associated with the application.
     The user interface and communication tier of the application are also part of the presentation tier.
     The application tier, also known as the logic tier or middle tier, is where the application's logic is stored.
     The data tier, also known as the database tier, data access tier, or back-end, stores and manages the data
      processed by the program. 
     
   The advantages of a three-tier architecture
     
     More fast development: Since different teams can work on each tier at the same time, an organization can get the 
     app to market quicker.
     Scalability has been improved: As desired, any tier can be scaled independently of the others.
     Improved security and reliability: A failure in one tier is less likely to affect the functionality or 
     performance of the others.
     
   Finally, it ensures that the code base is easy to maintain. it gives the opportunity to modify the code and 
   adds reliability and flexibility to the code.
   Modifying one the tier, the process wont effect the other tiers. Therefore, I preferred to use this Architecture. 

#### QA2. 
As a new programmer, you'll need to learn a lot of Node principles, such as:

Non-blocking or Asynchronous I/O: This is one of the important feature which has a good impact on performance 
when using NodeJS.

Prototype in NodeJS is nothing but inheritance with the only difference of doing it via objects. This is good for 
programmer other than Node field object oriented concept. Also, Modules, Callbacks, Promises

I would recommend to a new Node programmer that get familiar with the above topics. Keep it simple, get stacked ask
someone. get familiar npm packages, avoid extra dependencies from your project. keep it organized. Follow an 
architecture this will help you and others who reads your code. Use prettier or linters for error detection.

#### QA3. 
I think, I am quite happy with the application. I think; I managed to cover the requirements. I think, I liked the 
Three-tier architecture approach since it provides ease of maintenance of the code base.
Perhaps, in the future for the improvements I would consider to use Helpers, to my the implementation 
updated and simple.

#### QA4. 
My takeaway from this course is that I learned more about scraping, have become more comfortable with npm, strengthened my knowledge of non-blocking or asynchronous programming, and studied more about Promises.