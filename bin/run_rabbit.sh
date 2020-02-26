#!/bin/bash

docker run -d --hostname my-rabbit --name libretaxi-rabbit -p 5672:5672 -p 8080:15672 rabbitmq:3-management