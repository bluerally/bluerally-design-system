FROM r-mirror.dunamu.io/mirror.dockerhub/library/nginx:latest

COPY storybook-static /usr/share/nginx/html
COPY favicon.ico /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]