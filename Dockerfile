# syntax=docker/dockerfile:1

FROM dizit/ubuntu_play:1.1
WORKDIR /app
COPY . .
RUN chown 777 ./entrypoint.sh
RUN /root/.yarn/bin/yarn install
RUN cd client && /root/.yarn/bin/yarn install
USER root
WORKDIR /home/testuser
COPY ./demo_app code
WORKDIR /home/testuser/code
RUN /root/.yarn/bin/yarn install
EXPOSE 1337
CMD ./entrypoint.sh
