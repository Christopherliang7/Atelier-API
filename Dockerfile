FROM node:13.10.1

RUN mkdir /atelier
ADD . /atelier
WORKDIR /atelier

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "start" ]

# docker reference notes
# docker run --name=mysql1 -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=secret mysql/mysql-server

# echo the pw
# echo $MYSQL_ROOT_PASSWORD
# docker build github.com/creack/docker-firefox

# docker exec -it 60bf171f615b mysql --local-infile -uroot -p
# docker cp questions-clean.csv 60bf171f615b:/cleaned-data/questions-cleaned.csv

# copy csv file into docker container
# docker cp questions-clean.csv 60bf171f615b:/cleaned-data/questions-cleaned.csv
# docker cp <filename> <container name>:/cleaned-data/questions-cleaned.csv

# docker run -it (image name) sh

