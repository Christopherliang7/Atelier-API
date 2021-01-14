# Atelier API

### Tech Stack
*[Node](https://nodejs.org/en/)
*[Express](https://expressjs.com/)
*[MySQL](https://www.mysql.com/)
*[Redis](https://redis.io/)
*[Docker](https://www.docker.com/)
*[AWS](https://aws.amazon.com/)

<!-- GETTING STARTED -->
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Christopherliang7/Systems-Design-Capstone.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start Server
   ```sh
   npm start
   ```

## Objective
### Build an API capable of handling web-scale production traffic with scalability utilizing Javascript, Node, Express, MySQL, Redis, Docker, AWS. Stress tested with Artillery.io and Loader.io. 

## Initial Results
### Results based off two separate requests (results x2). Initial Results utilizing MySQL database, indexing, subqueries, and JSON aggregation. 
### 200 requests/sec for 60 seconds with 34 ms latency:
![](https://github.com/Christopherliang7/Atelier-API/blob/master/InitialResults.png)

## Connection Pooling Implementation Results
### Results based off two separate requests (results x2). Results utilizing the above, with connection pooling max of 10. 
### 1000 requests/sec for 60 seconds with 600 ms latency:
![](https://github.com/Christopherliang7/Atelier-API/blob/master/ConnectionPool.png)

## Redis Implementation Results
### Results based off one request. Results utilize Redis for in-memory caching. 
### 3200 requests/sec for 60 seconds with 5 ms latency:
![](https://github.com/Christopherliang7/Atelier-API/blob/master/FinalResults.png)