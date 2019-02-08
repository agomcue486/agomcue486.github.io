#! /bin/bash

apt-get -y update;
apt-get -y upgrade;
apt-get -y install build-essential module-assistant;
m-a -i prepare;
mount /media/cdrom;
cp -v /media/cdrom/VBoxLinuxAdditions.run /tmp;
chmod 755 /tmp/VBoxLinuxAdditions.run;
/tmp/VBoxLinuxAdditions.run;
rm /tmp/VBoxLinuxAdditions.run;
