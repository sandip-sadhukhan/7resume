FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN chown -R nginx:nginx /home/app/web/static_files /home/app/web/upload
RUN chmod -R 755 /home/app/web/static_files /home/app/web/upload
