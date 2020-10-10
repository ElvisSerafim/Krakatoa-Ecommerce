FROM redis:latest

WORKDIR /data 

VOLUME ["/data"]

EXPOSE 6379

CMD ["redis-server", "/etc/redis/redis.conf"]