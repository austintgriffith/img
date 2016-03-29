FROM ritualwp
MAINTAINER Austin Griffith <me@austingriffith.com>

ADD package.json /root/package.json
RUN cd /root;npm install

EXPOSE 41800

#wire in a startup script
ADD go.sh /var/www/go.sh

CMD /var/www/go.sh
