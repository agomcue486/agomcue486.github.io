#! /bin/bash

apt-get -y update;
apt-get -y upgrade;
apt-get -y install build-essential module-assistant;
m-a -i prepare;
mount /media/cdrom;
./VBoxLinuxAdditions.run;

